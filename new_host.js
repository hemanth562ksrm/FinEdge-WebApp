import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;

const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');

const mime = new Map([
  ['.html', 'text/html'],
  ['.js', 'application/javascript'],
  ['.css', 'text/css'],
  ['.json', 'application/json'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
  ['.woff2', 'font/woff2']
]);

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function serveStatic(req, res) {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, `http://localhost`).pathname);
    if (urlPath === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', host: 'project-root-new-host' }));
      return;
    }

    const baseDir = (await fileExists(path.join(distDir, 'index.html'))) ? distDir : publicDir;
    if (!(await fileExists(path.join(baseDir, 'index.html')))) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<!doctype html><html><head><meta charset="utf-8"><title>FinEdge New Host</title></head><body><h1>FinEdge New Host (root)</h1><p>Build the frontend to <code>dist</code> or add <code>public/index.html</code> to serve the app.</p><ul><li><a href="/health">/health</a></li></ul></body></html>');
      return;
    }

    let filePath = path.join(baseDir, urlPath);
    if (urlPath === '/' || !(await fileExists(filePath))) {
      filePath = path.join(baseDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mime.get(ext) || 'application/octet-stream';
    const data = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  }
}

const server = http.createServer((req, res) => {
  serveStatic(req, res);
});

server.listen(PORT, () => console.log(`✅ project-root-new-host listening on http://localhost:${PORT}`));
