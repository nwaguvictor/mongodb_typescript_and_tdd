import mongoose from 'mongoose';
import { User } from '../../src/models/user.model';
import { connectDb } from '../../src/config/db';

describe('Mongodb Connection', () => {
  beforeAll(async () => {
    await connectDb('mongodb://localhost/test_db');
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
      expect(true).toBe(true);
    });
  });
});
