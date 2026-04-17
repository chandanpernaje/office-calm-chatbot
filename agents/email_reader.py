import re
from typing import List, Dict


def parse_purchase_email(text: str) -> List[Dict]:
    """Very small heuristic parser for purchase emails.
    Looks for lines like: "P100, transistor, qty 100, part_number: P100-ABC"
    Returns list of items with keys: name, qty, part_number
    """
    items = []
    lines = text.splitlines()
    for ln in lines:
        ln = ln.strip()
        if not ln:
            continue
        # match qty
        m = re.search(r"(?P<part>P[0-9A-Za-z\-_]*)[,:]?\s*(?P<name>[A-Za-z0-9 \-_/]+)?(?:qty[:= ]*(?P<qty>\d+))?", ln, re.I)
        if m:
            part = m.groupdict().get("part")
            name = m.groupdict().get("name") or ""
            qty = int(m.groupdict().get("qty") or 1)
            items.append({"part_number": part, "name": name.strip(), "qty": qty})
        else:
            # fallback: look for "qty" and a word token
            m2 = re.search(r"(?P<name>\w[\w\s\-_/]+)\s+qty[:= ]*(?P<qty>\d+)", ln, re.I)
            if m2:
                items.append({"part_number": None, "name": m2.group("name").strip(), "qty": int(m2.group("qty"))})

    return items
