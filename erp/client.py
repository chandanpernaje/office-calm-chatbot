import os
import requests
from typing import Optional

ERP_API_URL = os.getenv("ERP_API_URL", "")
ERP_API_KEY = os.getenv("ERP_API_KEY", "")


class ERPClient:
    def __init__(self, base_url: Optional[str] = None, api_key: Optional[str] = None):
        self.base_url = base_url or ERP_API_URL
        self.api_key = api_key or ERP_API_KEY

    def get_lead_time_days(self, part_number: str) -> int:
        """Return lead time in days for the given part.
        If ERP_API_URL is not configured, return a mock value.
        """
        if not self.base_url:
            # Mock: simple heuristic based on part_number
            try:
                return 7 if str(part_number).lower().startswith("p") else 14
            except Exception:
                return 14

        headers = {"Authorization": f"Bearer {self.api_key}"} if self.api_key else {}
        try:
            resp = requests.get(f"{self.base_url}/parts/{part_number}/leadtime", headers=headers, timeout=8)
            resp.raise_for_status()
            data = resp.json()
            return int(data.get("lead_time_days", 7))
        except Exception:
            # On any error, fallback to conservative estimate
            return 14
