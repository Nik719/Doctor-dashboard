import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  // readyState 1 = connected — skip if already live
  if (mongoose.connection.readyState === 1) return;

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
