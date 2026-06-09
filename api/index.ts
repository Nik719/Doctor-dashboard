import { createServer } from "../server/index";
import { connectDB } from "../server/db";

const app = createServer();

// Express apps are standard Node.js request listeners (req, res) — no serverless-http needed.
// CJS bundling (via api/package.json) keeps require() available for Mongoose/dotenv internals.
module.exports = async function handler(req: any, res: any) {
  await connectDB();
  app(req, res);
};
