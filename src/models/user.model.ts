import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  postCount: number;
}

const schema = new Schema<IUser>({
  name: String,
  postCount: Number,
});

export const User = model('User', schema);
