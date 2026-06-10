import mongoose from "mongoose";

// Cache the in-flight connect promise so concurrent serverless invocations
// AWAIT the same connection instead of skipping while state is "connecting".
// (Returning early at state 2 + bufferCommands:false caused intermittent
// 500s: queries fired before the connection was ready.)
let connectPromise: Promise<typeof mongoose> | null = null;

export async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState === 1) return;

  if (!connectPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    connectPromise = mongoose.connect(uri, {
      bufferCommands: false, // fail fast instead of queuing ops when disconnected
      maxPoolSize: 1, // single connection per serverless instance
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    connectPromise
      .then(() => console.log("✅ Connected to MongoDB"))
      .catch((err) => {
        console.error("❌ MongoDB connection failed:", err.message);
        connectPromise = null; // allow retry on next invocation
      });
  }

  await connectPromise;
}
