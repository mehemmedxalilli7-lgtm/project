import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB qoşuldu: ${conn.connection.host} ✅`);
  } catch (error) {
    console.error('MongoDB Qoşulma Xətasi 🔴:', error);
    process.exit(1);
  }
};