import { Schema, model } from 'mongoose';

export interface IUser {
  name: String;
}

const schema = new Schema<IUser>({
  name: String,
});

export const User = model('User', schema);
