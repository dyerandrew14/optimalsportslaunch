import { Redis } from '@upstash/redis';

// Create Redis client or fallback to local storage
let redis: any;

if (process.env.redis_KV_REST_API_URL && process.env.redis_KV_REST_API_TOKEN) {
  try {
    redis = new Redis({
      url: process.env.redis_KV_REST_API_URL,
      token: process.env.redis_KV_REST_API_TOKEN,
    });
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
    async get(key: string) {
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
      return allKeys.filter((key: any) => typeof key === 'string' && key.includes(pattern.replace('*', '')));
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
