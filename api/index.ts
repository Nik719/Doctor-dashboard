// CJS entry: no import/export here, repo root type=module would make Vercel treat as ESM
const { createServer } = require("../server/index");
const { connectDB } = require("../server/db");

const app = createServer();

module.exports = async function handler(req, res) {
      try {
              await connectDB();
      } catch (err) {
              console.error("DB connection failed:", err.message);
              res.statusCode = 503;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Database unavailable", detail: err.message }));
              return;
      }
      app(req, res);
};
