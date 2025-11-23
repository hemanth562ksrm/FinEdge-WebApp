require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Simple health route
app.get('/health', (req, res) => res.json({ status: 'ok', host: 'simple-host' }));

// Serve a minimal HTML page at root so browser shows content
app.get('/', (req, res) => {
  res.send(`<!doctype html><html><head><meta charset="utf-8"><title>Simple Host</title></head><body><h1>Simple Host</h1><p>This is a minimal host running on port ${PORT}.</p><p>Check <a href="/health">/health</a></p></body></html>`);
});

app.listen(PORT, () => {
  console.log(`✅ Simple host listening on http://localhost:${PORT}`);
});
