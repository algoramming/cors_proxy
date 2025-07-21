// api/proxy.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const multer = require("multer");
const FormData = require("form-data");

const app = express();

// Increase payload limit for large requests
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Configure CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Configure multer for file uploads
const upload = multer({
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB limit
  },
});

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Handle all HTTP methods
const proxyHandler = async (req, res) => {
  try {
    const targetUrl = req.query.url;

    if (!targetUrl) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    // Log request details
    console.log({
      targetUrl,
      method: req.method,
      headers: req.headers,
      body: req.body,
    });

    // Prepare headers
    const headers = {
      ...req.headers,
      // host: new URL(targetUrl).host,
    };

    // Remove unnecessary headers
    delete headers["origin"];
    delete headers["referer"];
    delete headers["host"];

    // Handle different content types
    let data = req.body;
    if (req.headers["content-type"]?.includes("multipart/form-data")) {
      const formData = new FormData();
      Object.entries(req.body).forEach(([key, value]) => {
        formData.append(key, value);
      });
      data = formData;
      headers["content-type"] = "multipart/form-data";
    }

    // Make the request
    const response = await axios({
      method: req.method.toLowerCase(),
      url: targetUrl,
      headers: headers,
      data: ["GET", "HEAD"].includes(req.method) ? undefined : data,
      responseType: "arraybuffer",
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    // Set response headers
    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Handle different response types
    const contentType = response.headers["content-type"] || "";
    if (contentType.includes("application/json")) {
      const jsonResponse = JSON.parse(response.data.toString());
      return res.status(response.status).json(jsonResponse);
    } else {
      return res.status(response.status).send(response.data);
    }
  } catch (error) {
    console.error("Proxy error:", {
      message: error.message,
      response: error.response?.data?.toString(),
      stack: error.stack,
    });

    if (error.response) {
      return res.status(error.response.status).send(error.response.data);
    } else {
      return res.status(500).json({
        error: error.message,
        details: error.stack,
      });
    }
  }
};

// Register routes for all HTTP methods
["get", "post", "put", "patch", "delete", "options"].forEach((method) => {
  app[method]("/api/proxy", upload.any(), proxyHandler);
});

module.exports = app;
