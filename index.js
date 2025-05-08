const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

const RPC_USER = 'admin';
const RPC_PASS = 'admin123';
const BITCOIN_RPC_URL = 'http://127.0.0.1:18443';

app.post('/', async (req, res) => {
  try {
    const response = await fetch(BITCOIN_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${RPC_USER}:${RPC_PASS}`).toString('base64'),
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error al conectar con bitcoind:', err.message);
    res.status(500).json({ error: 'Error en la conexión RPC' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor BTC-RPC escuchando en puerto ${PORT}`);
});
