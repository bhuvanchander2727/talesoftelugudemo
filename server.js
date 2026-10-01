/**
 * Tales of Telugu — Local Development Server
 * Zero-dependency Node.js HTTP server supporting static assets,
 * proper MIME types, and HTTP 206 Range requests for seamless video playback.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
  // Parse clean URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Explicit handling for /admin and root
  if (pathname === '/admin' || pathname === '/admin/') {
    pathname = '/admin/index.html';
  } else if (pathname === '' || pathname === '/') {
    pathname = '/index.html';
  } else if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }

  // Prevent directory traversal
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(BASE_DIR, safePath);

  // If path is a directory, check for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 Not Found — Tales of Telugu</title></head>
        <body style="font-family: system-ui, sans-serif; text-align: center; padding: 60px;">
          <h1 style="color: #bb4125;">404 Not Found</h1>
          <p>The requested file <code>${pathname}</code> was not found.</p>
          <p><a href="/" style="color: #194326;">← Back to Tales of Telugu</a></p>
        </body>
        </html>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const totalSize = stats.size;

    // Handle HTTP Range header (essential for mp4 video streaming & scrubbing)
    const rangeHeader = req.headers.range;

    if (rangeHeader && ext === '.mp4') {
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

      if (start >= totalSize || end >= totalSize || start > end) {
        res.writeHead(416, { 'Content-Range': `bytes */${totalSize}` });
        res.end();
        return;
      }

      const chunkSize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });

      fileStream.pipe(res);
      return;
    }

    // Standard 200 response
    res.writeHead(200, {
      'Content-Length': totalSize,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = Number(PORT) + 1;
    console.log(`[Tales of Telugu] Port ${PORT} is in use, trying port ${fallbackPort}...`);
    server.listen(fallbackPort);
  } else {
    console.error('[Tales of Telugu] Server error:', err);
  }
});

server.listen(PORT, () => {
  const actualPort = server.address().port;
  console.log('========================================================');
  console.log('  🏛️  TALES OF TELUGU — LOCAL SERVER RUNNING');
  console.log('========================================================');
  console.log(`  🌐 Public Website : http://localhost:${actualPort}`);
  console.log(`  ⚙️  Admin Portal   : http://localhost:${actualPort}/admin`);
  console.log('========================================================');
  console.log('  Press Ctrl+C to stop the server anytime.');
});
