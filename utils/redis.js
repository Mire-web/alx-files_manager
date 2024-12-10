import { createClient } from 'redis';
import {promisify} from 'util';

/**
 * Represents a Redis client.
 */
class RedisClient {
  /**
  * Creates a new RedisClient instance.
  */
  constructor() {
    this.client = createClient();
    this.connected = true;
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
    this.client.on('connect', () => {
      this.connected = true;
    })
    this.client.on('error', (err) => {
      this.connected = false;
      console.log(err)
    });
  }

  /**
  * Checks if this client's connection to the Redis server is active.
  * @returns {boolean}
  */
  isAlive() {
    return this.connected;
  }

  async get(key) {
    return await this.getAsync(key);
  }

  async set(key, value, duration) {
    await this.setAsync(key, value, 'EX', duration);
  }

  async del(key) {
    await this.delAsync(key, (err, reply) => {
      if (err)
        throw err;
    });
  }
}

const redisClient = new RedisClient();

export default redisClient;
