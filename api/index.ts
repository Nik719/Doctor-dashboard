import type { IncomingMessage, ServerResponse } from "http";
import serverlessHttp from "serverless-http";
import { createServer } from "../server/index";
import { connectDB } from "../server/db";

const app = createServer();
const httpHandler = serverlessHttp(app);

// Await DB connection before every request — critical for serverless cold starts
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  await connectDB();
  return httpHandler(req, res);
}
