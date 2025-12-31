/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ytimg.com', 'img.youtube.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.youtube.com',
      },
      {
        protocol: 'https',
        hostname: '**.ytimg.com',
      },
    ],
  },
  // #region agent log
  // Log config loading
  // #endregion
}

// #region agent log
try {
  const http = require('http');
  const postData = JSON.stringify({
    location: 'next.config.js:20',
    message: 'next.config.js loaded',
    data: { config: 'loaded' },
    timestamp: Date.now(),
    sessionId: 'debug-session',
    runId: 'run1',
    hypothesisId: 'B'
  });
  const options = {
    hostname: '127.0.0.1',
    port: 7243,
    path: '/ingest/2d9a3094-d668-452b-8f3b-566e36c26226',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };
  const req = http.request(options, () => {});
  req.on('error', () => {});
  req.write(postData);
  req.end();
} catch(e) {}
// #endregion

module.exports = nextConfig
