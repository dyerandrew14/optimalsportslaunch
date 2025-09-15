import { Redis } from '@upstash/redis';

// Debug environment variables
console.log('Redis URL:', process.env.redis_KV_REST_API_URL ? 'Found' : 'Missing');
console.log('Redis Token:', process.env.redis_KV_REST_API_TOKEN ? 'Found' : 'Missing');

// Simple persistent storage for local development using browser localStorage
const localStorage = new Map();

// Try to load from browser localStorage if available
if (typeof window !== 'undefined') {
  try {
    const stored = window.localStorage.getItem('optimal-sports-products');
    if (stored) {
      const parsed = JSON.parse(stored);
      for (const [key, value] of parsed) {
        localStorage.set(key, value);
      }
      console.log('Loaded products from browser localStorage');
    }
  } catch (e) {
    console.log('Could not load from localStorage:', e);
  }
}

// Create Redis client or fallback to local storage
let redis: {
  get<T = any>(key: string): Promise<T | null>;
  set(key: string, value: any): Promise<string>;
  del(key: string): Promise<number>;
  keys(pattern: string): Promise<string[]>;
  lrange(key: string, start: number, end: number): Promise<any[]>;
  rpush(key: string, ...values: any[]): Promise<number>;
  hset(key: string, field: string, value: any): Promise<number>;
  hset(key: string, obj: Record<string, any>): Promise<number>;
  hget<T = any>(key: string, field: string): Promise<T | null>;
  hdel(key: string, field: string): Promise<number>;
};

if (process.env.redis_KV_REST_API_URL && process.env.redis_KV_REST_API_TOKEN) {
  try {
    const redisClient = new Redis({
      url: process.env.redis_KV_REST_API_URL,
      token: process.env.redis_KV_REST_API_TOKEN,
    });
    // Wrap the Redis client to match our interface
    redis = {
      async get<T = any>(key: string): Promise<T | null> {
        return await redisClient.get(key);
      },
      async set(key: string, value: any): Promise<string> {
        return await redisClient.set(key, value);
      },
      async del(key: string): Promise<number> {
        return await redisClient.del(key);
      },
      async keys(pattern: string): Promise<string[]> {
        return await redisClient.keys(pattern);
      },
      async lrange(key: string, start: number, end: number): Promise<any[]> {
        return await redisClient.lrange(key, start, end);
      },
      async rpush(key: string, ...values: any[]): Promise<number> {
        return await redisClient.rpush(key, ...values);
      },
      async hset(key: string, fieldOrObj: string | Record<string, any>, value?: any): Promise<number> {
        if (typeof fieldOrObj === 'string' && value !== undefined) {
          return await redisClient.hset(key, { [fieldOrObj]: value });
        } else if (typeof fieldOrObj === 'object') {
          return await redisClient.hset(key, fieldOrObj);
        }
        throw new Error('Invalid hset parameters');
      },
      async hget<T = any>(key: string, field: string): Promise<T | null> {
        return await redisClient.hget(key, field);
      },
      async hdel(key: string, field: string): Promise<number> {
        return await redisClient.hdel(key, field);
      }
    };
    console.log('Connected to Redis');
  } catch (error) {
    console.log('Redis connection failed, using local storage');
    redis = createLocalStorage();
  }
} else {
  console.log('No Redis credentials found, using local storage');
  redis = createLocalStorage();
}

function createLocalStorage() {
  // Function to save to browser localStorage
  const saveToBrowser = () => {
    if (typeof window !== 'undefined') {
      try {
        const data = Array.from(localStorage.entries());
        window.localStorage.setItem('optimal-sports-products', JSON.stringify(data));
        console.log('Saved products to browser localStorage');
      } catch (e) {
        console.log('Could not save to localStorage:', e);
      }
    }
  };

  return {
    async get<T = any>(key: string): Promise<T | null> {
      return localStorage.get(key) || null;
    },
    async set(key: string, value: any) {
      localStorage.set(key, value);
      saveToBrowser();
      return 'OK';
    },
    async del(key: string) {
      localStorage.delete(key);
      saveToBrowser();
      return 1;
    },
    async keys(pattern: string) {
      const allKeys = Array.from(localStorage.keys());
      if (pattern === '*') return allKeys;
      return allKeys.filter(key => key.includes(pattern.replace('*', '')));
    },
    async lrange(key: string, start: number, end: number) {
      const value = localStorage.get(key);
      if (!Array.isArray(value)) return [];
      return value.slice(start, end === -1 ? undefined : end + 1);
    },
    async rpush(key: string, ...values: any[]) {
      const existing = localStorage.get(key) || [];
      const newArray = [...existing, ...values];
      localStorage.set(key, newArray);
      saveToBrowser();
      return newArray.length;
    },
    async hset(key: string, fieldOrObj: string | Record<string, any>, value?: any): Promise<number> {
      const hashKey = `hash:${key}`;
      let hashData = localStorage.get(hashKey) || {};
      
      if (typeof fieldOrObj === 'string' && value !== undefined) {
        hashData[fieldOrObj] = value;
      } else if (typeof fieldOrObj === 'object') {
        hashData = { ...hashData, ...fieldOrObj };
      }
      
      localStorage.set(hashKey, hashData);
      saveToBrowser();
      return Object.keys(hashData).length;
    },
    async hget<T = any>(key: string, field: string): Promise<T | null> {
      const hashKey = `hash:${key}`;
      const hashData = localStorage.get(hashKey) || {};
      return hashData[field] || null;
    },
    async hdel(key: string, field: string): Promise<number> {
      const hashKey = `hash:${key}`;
      const hashData = localStorage.get(hashKey) || {};
      if (field in hashData) {
        delete hashData[field];
        localStorage.set(hashKey, hashData);
        saveToBrowser();
        return 1;
      }
      return 0;
    }
  };
}

export { redis as kv };
