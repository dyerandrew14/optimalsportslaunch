import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { athletes } from '@/lib/athletes';
import { kv } from '@vercel/kv';
import Image from 'next/image';
export const dynamic = 'force-dynamic';

async function getProductServer(id: string): Promise<Product | null> {
  // Try individual record first
  try {
    const byId = await kv.get<Product>(`product:${id}`);
    if (byId) return byId;
  } catch {}
  // Fallback to list
  try {
    const all = (await kv.get<Product[]>('products:all')) || [];
    const found = all.find(p => p.id === id) || null;
    if (found) return found;
  } catch {}
  // Final fallback: query list API (works even when KV unavailable due to in-memory fallback there)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || ''}/api/products`, { cache: 'no-store' });
    if (res.ok) {
      const list = await res.json() as Product[];
      const found = list.find(p => p.id === id) || null;
      if (found) return found;
    }
  } catch {}
  // Final fallback: seeded items (keeps detail pages working if KV empty)
  const seeded: Record<string, Product> = {
    'man-tee': {
      id: 'man-tee', name: 'Optimal Man Tee', price: 49,
      imageUrl: '/catalog/mens-classic-tee-black-front-6616e04f63957_540x.webp',
      images: ['/catalog/mens-classic-tee-black-front-6616e04f63957_540x.webp','/catalog/mens-classic-tee-black-left-6616e04f64dee_540x.webp','/catalog/mens-classic-tee-black-right-6616e04f6534e_540x.webp','/catalog/mens-classic-tee-black-back-62b588dcdd3e6_540x.webp'],
      athleteSlug: '', athleteName: '', school: '', categories: ['Tees'], sizes: ['S','M','L','XL'], active: true, createdAt: Date.now(), updatedAt: Date.now()
    },
    'man-hoodie': {
      id: 'man-hoodie', name: 'Optimal Man Hoodie', price: 79,
      imageUrl: '/catalog/unisex-premium-hoodie-black-front-62b584b06d8bc_540x.webp',
      images: ['/catalog/unisex-premium-hoodie-black-front-62b584b06d8bc_540x.webp'],
      athleteSlug: '', athleteName: '', school: '', categories: ['Hoodies'], sizes: ['S','M','L','XL'], active: true, createdAt: Date.now(), updatedAt: Date.now()
    },
    'flag-tee': {
      id: 'flag-tee', name: 'Optimal Flag Tee', price: 49,
      imageUrl: '/catalog/mens-classic-tee-black-front-62b588dcdd26d_540x.webp',
      images: ['/catalog/mens-classic-tee-black-front-62b588dcdd26d_540x.webp'],
      athleteSlug: '', athleteName: '', school: '', categories: ['Tees'], sizes: ['S','M','L','XL'], active: true, createdAt: Date.now(), updatedAt: Date.now()
    }
  };
  return seeded[id] || null;
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProductServer(params.id);
  if (!product) return notFound();

  const images = product.images && product.images.length > 0 ? product.images : (product.imageUrl ? [product.imageUrl] : []);
  const checkoutUrl = product.externalUrl || process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL || '/catalog';

  // Resolve athlete from slug first, then best-effort by name
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  let assignedAthlete = product.athleteSlug
    ? athletes.find(a => a.slug === product.athleteSlug)
    : (product.athleteName
        ? athletes.find(a => normalize(a.name) === normalize(product.athleteName))
        : undefined);
  // If not found in static list, try KV/API for dynamic athletes
  if (!assignedAthlete && product.athleteSlug) {
    try {
      const kvAth = await kv.get<any>(`athlete:${product.athleteSlug}`);
      if (kvAth) assignedAthlete = kvAth as any;
    } catch {}
    if (!assignedAthlete) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || ''}/api/athletes`, { cache: 'no-store' });
        if (res.ok) {
          const list = await res.json() as any[];
          assignedAthlete = list.find(a => a.slug === product.athleteSlug);
        }
      } catch {}
    }
  }
  // Ensure we always show a player card – default to first known athlete
  if (!assignedAthlete) {
    assignedAthlete = athletes[0];
  }
  const derivedFromName = (name: string | undefined) => name ? `/players/${name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.webp` : '/IMG_3743.webp';
  const athleteAvatar = assignedAthlete?.image || derivedFromName(product.athleteName) || '/IMG_3743.webp';

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-700 bg-black relative">
              {images[0] && (
                <Image
                  src={images[0]}
                  alt={product.name}
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                  priority
                  unoptimized
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-3">
                {images.slice(1, 5).map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-700 bg-black relative">
                    <Image src={img} alt={`${product.name} ${i+2}`} fill sizes="(min-width:1024px) 10vw, 25vw" className="object-cover" unoptimized />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">{product.name}</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{[product.athleteName, product.school].filter(Boolean).join(' • ')}</p>
                <div className="mt-4 text-2xl font-bold text-red-600 dark:text-red-400">${product.price.toFixed(2)}</div>
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Sizes available</div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <span key={s} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full lg:w-auto px-7 py-3 rounded-xl bg-red-600 text-white font-bold shadow-lg hover:bg-red-700 transition-transform hover:scale-[1.02]">
                Checkout on Shopify
              </a>

              <div>
                <div className="relative bg-black rounded-3xl shadow-2xl overflow-hidden group hover:shadow-red-500/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 max-w-xl">
                  {/* subtle border glow */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none ring-1 ring-white/10" />
                  <div className="p-6 flex items-center gap-5">
                    <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-red-500/40 flex-shrink-0 relative">
                      <Image src={athleteAvatar} alt={assignedAthlete?.name || product.athleteName || 'Player'} fill sizes="80px" className="object-cover" unoptimized />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs uppercase tracking-wide text-white/60">Player</div>
                      <div className="text-xl font-bold text-white truncate group-hover:text-red-200 transition-colors">{assignedAthlete?.name || product.athleteName}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        {(assignedAthlete?.school || product.school) && (
                          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">{assignedAthlete?.school || product.school}</span>
                        )}
                        {assignedAthlete?.conference && (
                          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">{assignedAthlete.conference}</span>
                        )}
                        {assignedAthlete?.classYear && (
                          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">{assignedAthlete.classYear}</span>
                        )}
                      </div>
                    </div>
                    {assignedAthlete?.slug && (
                      <Link href={`/athletes/${assignedAthlete.slug}`} className="px-3 py-2 rounded-lg border border-white/20 text-sm font-medium text-white hover:border-red-500 hover:text-red-400 transition-colors whitespace-nowrap">
                        View profile
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs - full width under listing */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6">FAQs</h2>
          <div className="space-y-4">
            <details className="group border border-gray-200 dark:border-neutral-700 rounded-xl">
              <summary className="px-5 py-4 cursor-pointer flex justify-between items-center text-lg text-gray-900 dark:text-white font-semibold">
                Shipping & Delivery
                <span className="text-gray-500 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <div className="px-5 pb-5 text-gray-700 dark:text-gray-300">
                Orders typically ship within 3–5 business days. You will receive a tracking link as soon as your order ships.
              </div>
            </details>
            <details className="group border border-gray-200 dark:border-neutral-700 rounded-xl">
              <summary className="px-5 py-4 cursor-pointer flex justify-between items-center text-lg text-gray-900 dark:text-white font-semibold">
                Returns & Exchanges
                <span className="text-gray-500 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <div className="px-5 pb-5 text-gray-700 dark:text-gray-300">
                Returns are accepted within 30 days in original condition. Please contact support for exchange options.
              </div>
            </details>
            <details className="group border border-gray-200 dark:border-neutral-700 rounded-xl">
              <summary className="px-5 py-4 cursor-pointer flex justify-between items-center text-lg text-gray-900 dark:text-white font-semibold">
                Sizing & Care
                <span className="text-gray-500 group-open:rotate-180 transition-transform">⌄</span>
              </summary>
              <div className="px-5 pb-5 text-gray-700 dark:text-gray-300">
                Most apparel fits true-to-size. Wash cold and tumble dry low to preserve print quality.
              </div>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}


