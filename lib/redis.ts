import { Redis } from '@upstash/redis';

// Debug environment variables
console.log('Redis URL:', process.env.redis_KV_REST_API_URL ? 'Found' : 'Missing');
console.log('Redis Token:', process.env.redis_KV_REST_API_TOKEN ? 'Found' : 'Missing');

// Create Redis client using the correct environment variable names
const redis = new Redis({
  url: process.env.redis_KV_REST_API_URL!,
  token: process.env.redis_KV_REST_API_TOKEN!,
});

export { redis as kv };
