from datetime import datetime, timedelta
from typing import Dict, List
from .email_reader import parse_purchase_email
from .bom import store_bom
from erp.client import ERPClient
from .db import get_collection, ensure_indexes


def init():
    ensure_indexes()


def process_email_and_create_po(email_text: str, supplier: str = "default_supplier") -> Dict:
    """Parse email, store BOM, query ERP for lead times, create a PO record in Mongo, and return summary."""
    items = parse_purchase_email(email_text)
    # enrich and store
    now = datetime.utcnow()
    # persist BOM
    store_bom(items)

    erp = ERPClient()
    po_items = []
    max_lead = 0
    for it in items:
        pn = it.get("part_number") or it.get("name")
        lead = erp.get_lead_time_days(pn)
        eta = now + timedelta(days=lead)
        max_lead = max(max_lead, lead)
        po_items.append({"part_number": pn, "name": it.get("name"), "qty": it.get("qty"), "lead_time_days": lead, "eta": eta})

    po = {
        "po_number": f"PO-{int(datetime.utcnow().timestamp())}",
        "supplier": supplier,
        "items": po_items,
        "created_at": now,
        "estimated_delivery": now + timedelta(days=max_lead),
        "status": "created",
    }

    col = get_collection("purchase_orders")
    col.insert_one(po)

    # return a lightweight summary
    return {
        "po_number": po["po_number"],
        "num_items": len(po_items),
        "estimated_days": max_lead,
        "estimated_delivery": po["estimated_delivery"].isoformat(),
    }
