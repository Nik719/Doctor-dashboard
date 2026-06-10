import { createServer } from "../server/index.js";
import { connectDB } from "../server/db.js";

const app = createServer();

export default async function handler(req: any, res: any) {
          try {
                      await connectDB();
          } catch (err: any) {
                      console.error("DB connection failed:", err.message);
                      res.statusCode = 503;
                      res.setHeader("Content-Type", "application/json");
                      res.end(
                                    JSON.stringify({ error: "Database unavailable", detail: err.message })
                                  );
                      return;
          }
          app(req, res);
}
