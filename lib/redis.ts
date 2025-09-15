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
    }
  };
}

export { redis as kv };
