import { createClient } from 'redis';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';

const redisClient = createClient({
  url: env.REDIS_URL,
  password: env.REDIS_PASSWORD
});

if (!building) await redisClient.connect();

export { redisClient };
