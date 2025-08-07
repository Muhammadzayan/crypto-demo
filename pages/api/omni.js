export default async function handler(req, res) {
  const rpcUser = process.env.RPC_USER;  // set these in .env.local
  const rpcPassword = process.env.RPC_PASSWORD;
  const rpcHost = process.env.RPC_HOST || '127.0.0.1';
  const rpcPort = process.env.RPC_PORT || '8332';

  const { method, params } = req.body;

  const response = await fetch(`http://${rpcUser}:${rpcPassword}@${rpcHost}:${rpcPort}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '1.0',
      id: 'rpc-call',
      method: method,
      params: params || []
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
