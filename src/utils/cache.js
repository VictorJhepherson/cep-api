import dotenv from 'dotenv';
dotenv.config();

import * as redis from 'redis';

class Cache {
  constructor() {
    this.client = redis.createClient(process.env.REDIS_PORT);
    this.connect();
  }

  async connect() {
    await this.client.connect();
  }

  async get(key) {
    const value = await this.client.get(key);

    return value ? JSON.parse(value) : null;
  }

  set(key, value, timeExp) {
    return this.client.setEx(key, timeExp, JSON.stringify(value));
  }
}

export default new Cache();
