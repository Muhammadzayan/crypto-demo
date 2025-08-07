from flask import Flask, request, jsonify
import requests
import json
from functools import wraps

app = Flask(__name__)

# === CONFIGURATION ===
RPC_USER = "alphaindonusa"
RPC_PASS = "B46us@1980"
RPC_URL = "http://127.0.0.1:8332/"
AINT_ID = 2147483661  # ganti dengan ID token AINT Anda jika berbeda
ADMIN_ADDR = "1YourAdminWalletAddress"  # ganti dengan address admin Anda
API_KEY = "gantiapikeyanda"  # amankan dengan API key

# === HELPER ===
def rpc_call(method, params=[]):
    payload = json.dumps({
        "jsonrpc": "1.0",
        "id": "curltest",
        "method": method,
        "params": params
    })
    res = requests.post(RPC_URL, auth=(RPC_USER, RPC_PASS),
                        headers={"content-type": "text/plain"}, data=payload)
    return res.json()

def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if request.headers.get("X-API-KEY") != API_KEY:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated

# === ROUTES ===
@app.route("/send", methods=["POST"])
@auth_required
def send():
    data = request.get_json()
    tx = rpc_call("omni_send", [ADMIN_ADDR, data["to_address"], AINT_ID, str(data["amount"])])
    return jsonify(tx)

@app.route("/balance/<address>")
def balance(address):
    balance = rpc_call("omni_getbalance", [address, AINT_ID])
    return jsonify(balance)

@app.route("/transactions/<address>")
def transactions(address):
    txs = rpc_call("omni_listtransactions", [address, 10, 0])
    return jsonify(txs)

@app.route("/info")
def info():
    info = rpc_call("omni_getinfo")
    return jsonify(info)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
