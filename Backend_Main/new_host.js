require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

// Health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok', host: 'new-host' }));

// Serve API example route
app.get('/api/info', (req, res) => {
  res.json({ app: 'FinEdge new-host', envPort: process.env.PORT || null });
});

// Attempt to serve static frontend from ../dist or ../public
const distPath = path.resolve(__dirname, '..', 'dist');
const publicPath = path.resolve(__dirname, '..', 'public');

if (fs.existsSync(distPath) && fs.existsSync(path.join(distPath, 'index.html'))) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET') {
      res.sendFile(path.join(distPath, 'index.html'));
    } else next();
  });
} else if (fs.existsSync(publicPath) && fs.existsSync(path.join(publicPath, 'index.html'))) {
  app.use(express.static(publicPath));
  app.use((req, res, next) => {
    if (req.method === 'GET') {
      res.sendFile(path.join(publicPath, 'index.html'));
    } else next();
  });
} else {
  // fallback minimal page
  app.get('/', (req, res) => {
    res.send(`<!doctype html><html><head><meta charset="utf-8"><title>FinEdge New Host</title></head><body><h1>FinEdge New Host</h1><p>Serving from fallback page. Build frontend to <code>dist</code> or add <code>public/index.html</code> to serve real app.</p><ul><li><a href="/health">/health</a></li><li><a href="/api/info">/api/info</a></li></ul></body></html>`);
  });
}

app.listen(PORT, () => console.log(`✅ new-host listening on http://localhost:${PORT}`));
