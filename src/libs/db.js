import mongoose from 'mongoose';

const Mongo = process.env.NEXT_PUBLIC_MONGODB_URL;

if (!Mongo) {
  throw new Error('Please define the NEXT_PUBLIC_MONGODB_URL environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connect = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(Mongo, {
      dbName: "Clerk",
      bufferCommands: false,
      connectTimeoutMS: 30000,
    }).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};
