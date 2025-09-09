import { Redis } from '@upstash/redis';

// Create Redis client using the new environment variable names
const redis = new Redis({
  url: process.env.redis_KV_URL!,
  token: process.env.redis_KV_REST_API_TOKEN!,
});

export { redis as kv };
