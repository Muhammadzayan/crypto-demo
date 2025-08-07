// lib/omnicore.js
import fetch from 'node-fetch';

const RPC_USER = 'alphaindonusa';
const RPC_PASSWORD = 'B46us@1980';
const RPC_PORT = 8332;
const RPC_HOST = '127.0.0.1';

export async function omniRpc(method, params = []) {
  const body = {
    jsonrpc: '1.0',
    id: 'omni',
    method,
    params,
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(`${RPC_USER}:${RPC_PASSWORD}`).toString('base64'),
  };

  const res = await fetch(`http://${RPC_HOST}:${RPC_PORT}/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const text = await res.text(); // 👈 first parse text to debug
  try {
    const json = JSON.parse(text);
    if (json.error) throw new Error(json.error.message);
    return json.result;
  } catch (err) {
    console.error('RPC Parse Error:', err.message);
    console.error('RPC Raw Response:', text); // 👈 print raw to debug
    throw new Error('Failed to parse RPC response: ' + err.message);
  }
}
