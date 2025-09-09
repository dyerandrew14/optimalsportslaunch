import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { athletes } from '@/lib/athletes';
import { kv } from '@vercel/kv';

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
  const assignedAthlete = product.athleteSlug
    ? athletes.find(a => a.slug === product.athleteSlug)
    : (product.athleteName
        ? athletes.find(a => normalize(a.name) === normalize(product.athleteName))
        : undefined);
  const athleteAvatar = assignedAthlete?.image || '/IMG_3743.webp';

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="aspect-square rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-700 bg-black">
              {images[0] && (<img src={images[0]} alt={product.name} className="w-full h-full object-cover" />)}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-3">
                {images.slice(1, 5).map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-700 bg-black">
                    <img src={img} alt={`${product.name} ${i+2}`} className="w-full h-full object-cover" />
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
                  <div className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Select Size</div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button key={s} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 hover:border-red-500 hover:text-red-600 transition-colors" type="button">{s}</button>
                    ))}
                  </div>
                </div>
              )}

              <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full lg:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold shadow-lg hover:from-emerald-600 hover:to-green-700 transition-transform hover:scale-[1.02]">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7 4l2-2h6l2 2h3v18H4V4h3zm5 4a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                Checkout on Shopify
              </a>

              {assignedAthlete && (
                <div>
                  <div className="rounded-2xl p-[1px] bg-gradient-to-r from-red-600/60 to-red-400/60">
                    <div className="rounded-2xl p-4 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-red-500/40 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={athleteAvatar} alt={assignedAthlete.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs uppercase tracking-wide text-gray-500">Player</div>
                        <div className="font-semibold text-gray-900 dark:text-white truncate">{assignedAthlete.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 truncate">{assignedAthlete.school} • {assignedAthlete.position}</div>
                      </div>
                      <Link href={`/athletes/${assignedAthlete.slug}`} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 text-sm font-medium text-gray-800 dark:text-gray-200 hover:border-red-500 hover:text-red-600 transition-colors">
                        View athlete
                      </Link>
                    </div>
                  </div>
                </div>
              )}
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


