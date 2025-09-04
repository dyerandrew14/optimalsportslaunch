export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  athleteSlug: string;
  athleteName: string;
  school: string;
  active: boolean;
  createdAt: number;
  updatedAt: number;
  externalUrl?: string; // optional purchase link
};

const API_BASE = process.env.NODE_ENV === 'production'
  ? 'https://your-site.vercel.app'
  : 'http://localhost:3000';

export async function fetchProducts(params?: { athleteSlug?: string; school?: string }): Promise<Product[]> {
  const qs = new URLSearchParams();
  if (params?.athleteSlug) qs.set('athlete', params.athleteSlug);
  if (params?.school) qs.set('school', params.school);
  const url = `${API_BASE}/api/products${qs.toString() ? `?${qs.toString()}` : ''}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function createProduct(input: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function updateProduct(id: string, input: Partial<Product>): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) return null;
  return res.json();
}

export async function deleteProduct(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/api/products/${id}`, { method: 'DELETE' });
  return res.ok;
}


