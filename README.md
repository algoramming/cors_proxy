# CORS Proxy Server

A simple proxy server that helps bypass CORS restrictions when making API requests from your frontend applications.

## Live URL

🌐 **Hosted on Vercel:** `https://algoramming-cors-proxy.vercel.app`

## How to Use

Simply use the proxy URL with your target API endpoint:

```
https://algoramming-cors-proxy.vercel.app/api/proxy?url=<your-target-url>
```

⚠️ **Important Note**: This proxy server may behave unexpectedly as the file location structure has been modified. It is recommended to use only API endpoints and direct file locations for reliable operation.

### Simple API Requests

Replace your direct API calls with the proxy URL:

**Instead of:**
```javascript
fetch('http://api.example.com/data')
```

**Use:**
```javascript
fetch('https://algoramming-cors-proxy.vercel.app/api/proxy?url=http://api.example.com/data')
```

### Examples

**GET Request:**
```bash
curl "https://algoramming-cors-proxy.vercel.app/api/proxy?url=http://jsonplaceholder.typicode.com/posts/1"
```

**POST Request:**
```bash
curl -X POST "https://algoramming-cors-proxy.vercel.app/api/proxy?url=http://jsonplaceholder.typicode.com/posts" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Post", "body": "This is a test"}'
```

**JavaScript/Fetch:**
```javascript
// GET request
fetch('https://algoramming-cors-proxy.vercel.app/api/proxy?url=http://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));

// POST request
fetch('https://algoramming-cors-proxy.vercel.app/api/proxy?url=http://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' })
})
.then(response => response.json())
.then(data => console.log(data));
```

## What It Does

- Bypasses CORS restrictions for your frontend applications
- Supports all HTTP methods (GET, POST, PUT, DELETE, etc.)
- Handles file uploads up to 100MB
- Processes JSON payloads up to 50MB
- Logs all requests for debugging

## Common Issues

- Make sure to include the full URL with protocol (https://)
- The proxy is hosted on Vercel and available 24/7
- Use API endpoints and direct file locations for best results

## License

MIT License

Copyright (c) 2025 Algoramming. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.