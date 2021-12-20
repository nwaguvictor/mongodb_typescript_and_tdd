import mongoose from 'mongoose';
import { User } from '../../src/models/user.model';
import { connectDb } from '../../src/config/db';
import dotenv from 'dotenv';
dotenv.config();

const { MONGODB_URI } = process.env;

describe('Mongodb Connection', () => {
  beforeAll(async () => {
    await connectDb(MONGODB_URI!);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  describe('Create', () => {
    it('saves user record to the database', async () => {
      const user = new User({ name: 'Alex' });
      await user.save();
      expect(user.isNew).not.toBe(true);
    });
  });

  describe('Reading', () => {
    let user: any;
    beforeEach(async () => {
      user = new User({ name: 'Alex' });
      await user.save();
    });

    it('should find users from the database with a filter', async () => {
      const users = await User.find({ name: 'Alex' });
      expect(users[0].name).toBe('Alex');
    });

    it('should find a user with a particular id', async () => {
      const foundUser = await User.findOne({ _id: user._id });
      expect(foundUser?.name).toBe('Alex');
    });
  });

  describe('Update', () => {
    let user: any;
    beforeEach(async () => {
      user = new User({ name: 'Alex', postCount: 0 });
      await user.save();
    });

    it('uses model instance set and save methods to update a record', async () => {
      user.set({ name: 'Mike' });
      const updatedUser = await user.save();
      expect(updatedUser.name).toBe('Mike');
    });

    it('uses model class updateOne method to update a user record', async () => {
      await User.updateOne({ _id: user._id }, { name: 'Dan' });
      const foundUser = await User.findOne({ _id: user._id });
      expect(foundUser?.name).toBe('Dan');
    });

    it('uses model class findByIdAndUpdate method to update a particular user', async () => {
      await User.findByIdAndUpdate(user._id, { name: 'Uche' });
      const foundUser = await User.findOne({ _id: user._id });
      expect(foundUser?.name).toBe('Uche');
    });

    it('increments user postCount by 1', async () => {
      await User.updateMany({ name: 'Alex' }, { $inc: { postCount: 1 } });
      const foundUser = await User.findOne({ name: 'Alex' });
      expect(foundUser?.postCount).toBe(1);
    });
  });

  describe('Delete', () => {
    let user: any;
    beforeEach(async () => {
      user = new User({ name: 'Alex' });
      await user.save();
    });

    it('uses model instance to remove record', async () => {
      await user.remove();
      expect(await User.findOne({ _id: user._id })).toBeNull();
    });

    it('uses model to remove record', async () => {
      await User.remove({ _id: user._id });
      expect(await User.findOne({ _id: user._id })).toBeNull();
    });

    it('uses model class findOneAndRemove method to remove a record', async () => {
      await User.findOneAndRemove({ _id: user._id });
      expect(await User.findOne({ _id: user._id })).toBeNull();
    });

    it('uses model class findByIdAndRemove method to remove a single record', async () => {
      await User.findByIdAndRemove(user._id);
      expect(await User.findOne({ _id: user._id })).toBeNull();
    });
  });
});
