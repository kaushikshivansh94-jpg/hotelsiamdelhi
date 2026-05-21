import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb://127.0.0.1:27017/hotel-siam-delhi";

if (!MONGODB_URI) {
  throw new Error("MongoDB URI not found");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectMongoDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default connectMongoDB;