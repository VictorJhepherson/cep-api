import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
const mongoURL = process.env.MONGO_URL;

class Database {
  constructor() {}

  async getConnection() {
    try {
      return await mongoose.connect(mongoURL);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new Database();
