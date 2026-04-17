from typing import Dict, List
from .db import get_collection
from datetime import datetime


def upsert_bom_item(item: Dict) -> None:
    col = get_collection("bom")
    item = dict(item)
    item.setdefault("created_at", datetime.utcnow())
    # use part_number or name as unique key when available
    query = {k: item[k] for k in ("part_number",) if k in item}
    if not query:
        # fallback to name
        query = {"name": item.get("name")}
    col.update_one(query, {"$set": item}, upsert=True)


def store_bom(items: List[Dict]) -> None:
    for it in items:
        upsert_bom_item(it)


def list_bom() -> List[Dict]:
    col = get_collection("bom")
    return list(col.find().sort("name", 1))
