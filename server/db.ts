import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  // Skip if connected OR already in progress — calling connect() at state 2
  // would fire a duplicate request during serverless cold starts
  const state = mongoose.connection.readyState;
  if (state === 1 || state === 2) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  await mongoose.connect(uri, {
    bufferCommands: false,       // fail fast instead of queuing ops when disconnected
    maxPoolSize: 1,              // single connection per serverless instance
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  console.log("✅ Connected to MongoDB");
}
