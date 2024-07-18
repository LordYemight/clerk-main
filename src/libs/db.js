import mongoose, { Mongoose } from 'mongoose'

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
    const options = {
      bufferCommands: false,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(Mongo, options).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};
