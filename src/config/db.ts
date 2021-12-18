import mongoose from 'mongoose';

export const connectDb = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log('::> Database connected successfully');
  } catch (error: any) {
    console.log('<:: Database connection failed... ', error.message);
  }

  mongoose.connection.on('disconnected', () => {
    console.log('<:: Database disconnected');
  });
};
