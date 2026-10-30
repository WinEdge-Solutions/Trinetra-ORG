/**
 * Local Development Server for Trinetra Gargi Foundation
 * Serves static HTML/assets and local API endpoints on http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf'
};

const server = http.createServer(async (req, res) => {
  // CORS Headers for local development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  let pathname = url.pathname;

  // Handle Serverless API routes
  if (pathname.startsWith('/api/')) {
    const apiPath = pathname.replace('/api/', '');
    const candidateFile = path.join(ROOT, 'api', `${apiPath}.js`);

    if (fs.existsSync(candidateFile)) {
      try {
        delete require.cache[require.resolve(candidateFile)];
        const handler = require(candidateFile);

        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
          try {
            req.body = body ? JSON.parse(body) : {};
          } catch (e) {
            req.body = body;
          }
          req.query = Object.fromEntries(url.searchParams.entries());

          // Compatibility wrapper for Vercel/Express response style
          res.status = function(code) {
            this.statusCode = code;
            return this;
          };
          res.json = function(data) {
            this.setHeader('Content-Type', 'application/json');
            this.end(JSON.stringify(data));
            return this;
          };

          try {
            await handler(req, res);
          } catch (handlerErr) {
            console.error('Handler error:', handlerErr);
            if (!res.headersSent) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: handlerErr.message }));
            }
          }
        });
        return;
      } catch (err) {
        console.error('API Error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Internal API routing error' }));
        return;
      }
    }
  }

  // Handle Static Files
  if (pathname === '/') pathname = '/index.html';
  if (!path.extname(pathname)) pathname += '.html';

  const filePath = path.join(ROOT, pathname);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`TGF Local Server running at: http://localhost:${PORT}`);
  console.log(`Admin Portal:                http://localhost:${PORT}/admin.html`);
  console.log(`======================================================\n`);
});

