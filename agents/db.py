import os
from typing import Any
from pymongo import MongoClient

_MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
_MONGO_DB = os.getenv("MONGO_DB", "office_procurement")

_client: MongoClient | None = None


def get_client() -> MongoClient:
    global _client
    if _client is None:
        _client = MongoClient(_MONGO_URI)
    return _client


def get_db():
    return get_client()[_MONGO_DB]


def get_collection(name: str):
    return get_db()[name]


def ensure_indexes():
    col = get_collection("purchase_orders")
    # ensure simple indexes
    col.create_index([("po_number", 1)], unique=True)
