import serverlessHttp from "serverless-http";
import { createServer } from "../server/index";

export default serverlessHttp(createServer());
