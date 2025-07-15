// index.js
const app = require("./api/proxy");
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
