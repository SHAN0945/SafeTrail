"""
ai_cluster_service.py (Hybrid: MongoDB + Local Test Mode)

Usage:
- With MongoDB: set MONGO_URI to your DB, run normally.
- Without MongoDB: leave MONGO_URI empty or None; synthetic incidents will be generated.

Features:
- Location-only DBSCAN
- Full HDBSCAN clustering with SBERT text embeddings + metadata
- Cluster summaries, risk labels
- Outputs: clusters_output.json, labeled_incidents.csv, clusters_boundary_map.html
"""

import json, sys, logging, os
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN
from sentence_transformers import SentenceTransformer
import hdbscan
import folium
from math import radians, cos, sin, sqrt, atan2
from scipy.spatial import ConvexHull
import matplotlib.cm as cm
import matplotlib.colors as mcolors
from haversine import haversine
from pymongo import MongoClient

# ---------------- CONFIG ---------------- #
MONGO_URI = os.environ.get("MONGO_URI", None)  # None => local testing
DB_NAME = os.environ.get("DB_NAME", "tourist_safety")
INC_COLL = os.environ.get("INC_COLL", "incidents")
CLUST_COLL = os.environ.get("CLUST_COLL", "clusters")
EMB_MODEL = os.environ.get("EMB_MODEL", "all-MiniLM-L6-v2")

EPS_METERS = 200
MIN_SAMPLES_LOC = 3
HDBSCAN_MIN_CLUSTER_SIZE = 3
SEV_MAP = {"low": 0, "medium": 1, "high": 2}
EARTH_RADIUS_M = 6371000.0

logging.basicConfig(stream=sys.stdout, level=logging.INFO, format="%(asctime)s %(levelname)s: %(message)s")

# ---------------- HELPERS ---------------- #
def generate_synthetic_incidents(n=300):
    np.random.seed(42)
    cities = {
        "Bangalore": (12.9716, 77.5946),
        "Mumbai": (19.0760, 72.8777),
        "Delhi": (28.7041, 77.1025),
        "Hyderabad": (17.3850, 78.4867),
        "Chennai": (13.0827, 80.2707),
        "Kolkata": (22.5726, 88.3639)
    }
    severities = ["low", "medium", "high"]
    data = []
    for city, (lat, lng) in cities.items():
        city_n = np.random.randint(40, 80) if city in ["Bangalore", "Mumbai", "Delhi"] else np.random.randint(20, 40)
        for _ in range(city_n):
            data.append({
                "city": city,
                "lat": lat + np.random.normal(0, 0.05),
                "lng": lng + np.random.normal(0, 0.05),
                "timestamp": str(pd.Timestamp("2025-09-01") + pd.Timedelta(hours=np.random.randint(0, 500))),
                "message": np.random.choice([
                    "theft reported", "pickpocket case", "robbery attempt",
                    "suspicious activity", "vehicle stolen"
                ]),
                "severity": np.random.choice(severities),
                "category": np.random.choice(["theft","robbery","fraud","assault"]),
                "reported_by": np.random.choice(["citizen","police","ngo"])
            })
    df = pd.DataFrame(data)
    df['incident_id'] = [f"inc_{i}" for i in range(len(df))]
    return df

def fetch_incidents(client=None):
    if client is None:
        df = generate_synthetic_incidents()
    else:
        db = client[DB_NAME]
        coll = db[INC_COLL]
        docs = list(coll.find({}))
        if not docs:
            logging.warning("No incidents found in DB. Using synthetic data.")
            df = generate_synthetic_incidents()
        else:
            df = pd.DataFrame(docs)
            if '_id' in df.columns and 'incident_id' not in df.columns:
                df['incident_id'] = df['_id'].astype(str)
            elif 'incident_id' not in df.columns:
                df['incident_id'] = [f"inc_{i}" for i in range(len(df))]
    return df

def embed_texts(texts, model_name=EMB_MODEL):
    model = SentenceTransformer(model_name)
    return np.array(model.encode(texts, show_progress_bar=True))

def run_dbscan_location(df, eps_meters=EPS_METERS, min_samples=MIN_SAMPLES_LOC):
    coords = np.vstack([df['lat'].astype(float).values, df['lng'].astype(float).values]).T
    coords_rad = np.radians(coords)
    eps = eps_meters / EARTH_RADIUS_M
    db = DBSCAN(eps=eps, min_samples=min_samples, metric="haversine")
    return db.fit_predict(coords_rad)

def run_hdbscan_full(df, text_emb, min_cluster_size=HDBSCAN_MIN_CLUSTER_SIZE):
    df["category_code"] = df["category"].astype("category").cat.codes
    df["reporter_code"] = df["reported_by"].astype("category").cat.codes
    numeric = df[["lat","lng","severity_code","category_code","reporter_code"]].to_numpy(dtype=float)
    numeric_scaled = StandardScaler().fit_transform(numeric)
    X = np.hstack([numeric_scaled, text_emb])
    clusterer = hdbscan.HDBSCAN(min_cluster_size=min_cluster_size, metric="euclidean")
    return clusterer.fit_predict(X)

def summarize_clusters(df, cluster_col="cluster_id"):
    clusters = []
    for cid, g in df.groupby(cluster_col):
        cluster_obj = {
            "cluster_id": int(cid),
            "size": int(len(g)),
            "centroid": {"lat": float(g["lat"].mean()), "lng": float(g["lng"].mean())},
            "risk_score": float(g["severity_code"].mean()),
            "dominant_category": g["category"].mode().iloc[0] if not g["category"].mode().empty else None,
            "incident_ids": g["incident_id"].astype(str).tolist()
        }
        rs = cluster_obj["risk_score"]
        cluster_obj["risk_label"] = "low" if rs < 0.66 else ("medium" if rs < 1.66 else "high")
        clusters.append(cluster_obj)
    return clusters

def compute_radius_meters(g, min_radius=50, max_radius=5000):
    centroid = [g['lat'].mean(), g['lng'].mean()]
    distances = g.apply(lambda row: haversine((row['lat'], row['lng']), centroid), axis=1)
    radius = distances.max() * 1000
    return min(max(radius, min_radius), max_radius)

def plot_clusters_map(df):
    if df.empty:
        logging.warning("No data to plot.")
        return

    clustered_df = df[df['cluster_id'] != -1]
    if not clustered_df.empty:
        top_cluster = clustered_df.groupby('cluster_id').size().idxmax()
        centroid = clustered_df[clustered_df['cluster_id'] == top_cluster][['lat','lng']].mean().tolist()
        m = folium.Map(location=centroid, zoom_start=12)
    else:
        m = folium.Map(location=[20.5937, 78.9629], zoom_start=5)

    cluster_ids = sorted(df['cluster_id'].unique())
    n_clusters = len([cid for cid in cluster_ids if cid != -1])
    colors = cm.get_cmap('tab20', max(n_clusters,1))
    color_map = {cid: mcolors.to_hex(colors(i)) for i, cid in enumerate([c for c in cluster_ids if c != -1])}

    for cid, g in df.groupby('cluster_id'):
        if cid == -1:
            continue
        centroid = [g['lat'].mean(), g['lng'].mean()]
        radius = compute_radius_meters(g, min_radius=50, max_radius=5000)
        folium.Circle(
            location=centroid,
            radius=radius,
            color=color_map[cid],
            fill=True,
            fill_color=color_map[cid],
            fill_opacity=0.4,
            popup=f'Cluster {cid}, size={len(g)}'
        ).add_to(m)
        for _, row in g.iterrows():
            folium.CircleMarker(
                location=[row['lat'], row['lng']],
                radius=3,
                color=color_map[cid],
                fill=True,
                fill_opacity=0.7
            ).add_to(m)

    noise = df[df['cluster_id'] == -1]
    for _, row in noise.iterrows():
        folium.CircleMarker(
            location=[row['lat'], row['lng']],
            radius=2,
            color='gray',
            fill=True,
            fill_opacity=0.5,
            popup=f'Noise incident: {row.get("message","")}'
        ).add_to(m)

    m.save('clusters_boundary_map.html')
    logging.info("Enhanced map saved to clusters_boundary_map.html")

def main():
    client = None
    if MONGO_URI:
        try:
            client = MongoClient(MONGO_URI)
            logging.info(f"Connected to MongoDB at {MONGO_URI}")
        except Exception as e:
            logging.warning(f"Cannot connect to MongoDB. Using synthetic data. {e}")

    logging.info("Fetching incidents...")
    df = fetch_incidents(client)
    df["severity_code"] = df["severity"].apply(lambda s: SEV_MAP.get(str(s).lower(), 1))

    logging.info("Running location-only DBSCAN...")
    df["cluster_loc"] = run_dbscan_location(df)

    logging.info("Embedding text messages...")
    text_emb = embed_texts(df["message"].fillna("").tolist())

    logging.info("Running full HDBSCAN clustering...")
    df["cluster_id"] = run_hdbscan_full(df, text_emb)

    logging.info("Summarizing clusters...")
    clusters = summarize_clusters(df)

    with open("clusters_output.json","w",encoding="utf-8") as f:
        json.dump(clusters,f,indent=2)
    df.to_csv("labeled_incidents.csv",index=False)
    logging.info("Saved clusters_output.json and labeled_incidents.csv")

    plot_clusters_map(df)

    if client:
        try:
            db = client[DB_NAME]
            col = db[CLUST_COLL]
            for c in clusters:
                col.update_one({"cluster_id": c["cluster_id"]}, {"$set": c}, upsert=True)
            col_inc = db[INC_COLL]
            for _, row in df.iterrows():
                col_inc.update_one({"incident_id": row["incident_id"]}, {"$set": {"cluster_id": int(row["cluster_id"])}})
            logging.info("MongoDB updated with clusters and incidents.")
        except Exception as e:
            logging.warning(f"Skipping MongoDB updates: {e}")

    top = sorted(clusters, key=lambda c: c["size"], reverse=True)[:10]
    logging.info("Top clusters (by size):")
    for c in top:
        logging.info(f"cluster_id={c['cluster_id']}, size={c['size']}, risk={c['risk_label']}, cat={c['dominant_category']}")

if __name__ == "__main__":
    main()
