"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import SafeImage from "@/components/SafeImage";

type GroupBy = "none" | "school" | "athlete";

export default function CatalogExplorer() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [groupBy, setGroupBy] = useState<GroupBy>("none");
  const [galleryMap, setGalleryMap] = useState<Record<string, string[]>>({});
  const [page, setPage] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const SIZE_STOPS = ["XS", "S", "M", "L", "XL", "2XL"];
  const CATEGORY_OPTIONS = ["Tees", "Hoodies", "Hats", "Accessories"];
  const [sizeIndex, setSizeIndex] = useState<number>(2); // default to M

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('page', String(page));
        params.set('limit', '8');
        if (query.trim()) params.set('name', query.trim());
        if (selectedSize) params.set('size', selectedSize);
        if (selectedCategory) params.set('category', selectedCategory);
        const res = await fetch(`/api/products?${params.toString()}`, { cache: "no-store" });
        const data: Product[] = res.ok ? await res.json() : [];
        if (!cancelled) {
          if (data && data.length > 0) {
            setProducts(data);
          } else {
            // Use 2–3 featured products with multiple images from /public/catalog, rest are mocks
            const buster = `?v=${Date.now()}`;
            // Get a list of catalog files via a lightweight endpoint (or infer common names)
            const catalogFiles = await fetch('/api/catalog-files').then(r => r.ok ? r.json() : []).catch(() => []);
            const imgs: string[] = Array.isArray(catalogFiles) && catalogFiles.length > 0
              ? catalogFiles.map((p: string) => `${p}${buster}`)
              : [
                  '/catalog/mens-classic-tee-black-front-*.webp',
                  '/catalog/mens-classic-tee-black-back-*.webp',
                  '/catalog/unisex-premium-hoodie-black-front-*.webp'
                ];

            const now = Date.now();
            const featured: Product[] = [
              {
                id: 'featured-1',
                name: 'Optimal Tee',
                price: 49.0,
                imageUrl: imgs[0] || '/IMG_3743.webp',
                sizes: ['S','M','L','XL'],
                categories: ['Tees'],
                athleteSlug: 'jonah-coleman',
                athleteName: 'Jonah Coleman',
                school: 'Arizona',
                active: true,
                createdAt: now,
                updatedAt: now,
                externalUrl: '#',
              },
              {
                id: 'featured-2',
                name: 'Optimal Hoodie',
                price: 79.0,
                imageUrl: imgs[1] || '/IMG_3899.webp',
                sizes: ['S','M','L','XL'],
                categories: ['Hoodies'],
                athleteSlug: 'christian-pierce',
                athleteName: 'Christian Pierce',
                school: 'USC',
                active: true,
                createdAt: now,
                updatedAt: now,
                externalUrl: '#',
              },
              {
                id: 'featured-3',
                name: 'Optimal Tee (Alt)',
                price: 49.0,
                imageUrl: imgs[2] || '/IMG_3903.webp',
                sizes: ['S','M','L','XL'],
                categories: ['Tees'],
                athleteSlug: 'rico-flores-jr',
                athleteName: 'Rico Flores Jr.',
                school: 'Arizona',
                active: true,
                createdAt: now,
                updatedAt: now,
                externalUrl: '#',
              },
            ];

            setProducts(featured);

            // Attach simple galleries (multiple photos per listing) using remaining images
            const galleries: Record<string, string[]> = {
              'featured-1': imgs.slice(0, 3),
              'featured-2': imgs.slice(3, 6),
              'featured-3': imgs.slice(6, 9),
            };
            setGalleryMap(galleries);

            // Add a few mock filler items that DO NOT use your photos
            const mocks: Product[] = Array.from({ length: 6 }).map((_, i) => ({
              id: `mock-${i+1}`,
              name: `Mock Item ${i+1}`,
              price: 39 + i * 10,
              imageUrl: undefined,
              athleteSlug: 'mock',
              athleteName: 'Mock Player',
              school: 'Mock U',
              active: true,
              createdAt: now,
              updatedAt: now,
              externalUrl: '#',
            }));
            setProducts((curr) => [...curr, ...mocks]);
          }
        }
      } catch (e) {
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [page, query, selectedSize, selectedCategory]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.athleteName.toLowerCase().includes(q) ||
      p.school.toLowerCase().includes(q)
    );
  }, [products, query]);

  // Keep selectedSize in sync with the slider
  useEffect(() => {
    setSelectedSize(SIZE_STOPS[sizeIndex] || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizeIndex]);

  // Apply client-side filters for mock data as well
  const clientFiltered = useMemo(() => {
    return filtered.filter(p => {
      if (selectedSize && !(p.sizes || []).includes(selectedSize)) return false;
      if (selectedCategory && !(p.categories || []).includes(selectedCategory)) return false;
      return true;
    });
  }, [filtered, selectedSize, selectedCategory]);

  const grouped = useMemo(() => {
    if (groupBy === "none") return { All: clientFiltered } as Record<string, Product[]>;
    const key = groupBy === "school" ? (p: Product) => p.school : (p: Product) => p.athleteName;
    return clientFiltered.reduce<Record<string, Product[]>>((acc, p) => {
      const k = key(p) || "Unknown";
      (acc[k] ||= []).push(p);
      return acc;
    }, {});
  }, [clientFiltered, groupBy]);

  const groupKeys = useMemo(() => Object.keys(grouped).sort(), [grouped]);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-3 lg:col-span-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl p-4 h-fit sticky top-4">
          <div className="space-y-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-gray-100"
            />
            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Group</div>
            <div className="inline-flex flex-wrap gap-2">
              <button className={`px-3 py-1.5 rounded-lg border text-sm ${groupBy === "none" ? "bg-red-600 text-white border-red-600" : "bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-neutral-700"}`} onClick={() => setGroupBy("none")} type="button">None</button>
              <button className={`px-3 py-1.5 rounded-lg border text-sm ${groupBy === "school" ? "bg-red-600 text-white border-red-600" : "bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-neutral-700"}`} onClick={() => setGroupBy("school")} type="button">By School</button>
              <button className={`px-3 py-1.5 rounded-lg border text-sm ${groupBy === "athlete" ? "bg-red-600 text-white border-red-600" : "bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-neutral-700"}`} onClick={() => setGroupBy("athlete")} type="button">By Player</button>
            </div>
            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Size</div>
            <div className="space-y-2">
              <input
                type="range"
                min={0}
                max={SIZE_STOPS.length - 1}
                step={1}
                value={sizeIndex}
                onChange={(e) => { setSizeIndex(Number(e.target.value)); setPage(1); }}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 select-none">
                {SIZE_STOPS.map((s, i) => (
                  <span key={s} className={`${i === sizeIndex ? 'text-red-600 dark:text-red-400 font-semibold' : ''}`}>{s}</span>
                ))}
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={() => { setSelectedSize(""); setPage(1); }} className="text-xs text-gray-600 dark:text-gray-400 hover:text-red-600">All sizes</button>
              </div>
            </div>
            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Category</div>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
              className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">All categories</option>
              {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </aside>

        {/* Content */}
        <div className="md:col-span-9 lg:col-span-9">
          {groupBy === 'none' && (
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Showing 8 per page</div>
            <div className="inline-flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200" onClick={() => setPage(p => Math.max(1, p-1))} type="button">Prev</button>
              <span className="text-gray-700 dark:text-gray-300 text-sm">Page {page}</span>
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200" onClick={() => setPage(p => p+1)} type="button">Next</button>
            </div>
          </div>
          )}

        {loading ? (
          <div className="text-gray-600 dark:text-gray-300">Loading...</div>
        ) : (
          <div className="flex flex-col gap-8">
            {groupKeys.map((key) => (
              <div key={key}>
                {groupBy !== "none" && (
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{key}</h3>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {(groupBy === 'none' ? grouped[key].slice(0, 8) : grouped[key]).map((p) => (
                    <a key={p.id} href={`/catalog/${p.id}`} className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden block group">
                      <div className="h-56 bg-gray-200 dark:bg-neutral-700 flex items-center justify-center">
                        {p.imageUrl ? (
                          <SafeImage src={p.imageUrl} fallbackSrc="/IMG_3743.webp" alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400 text-sm">No image</span>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-1">
                          {p.athleteName ? (
                            <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-xs text-gray-700 dark:text-gray-200">
                              <span className="inline-block w-6 h-6 rounded-full overflow-hidden bg-gray-200 dark:bg-neutral-700">
                                <img src={`/players/${(p.athleteName || '').toLowerCase().replace(/[^a-z0-9]+/g,'_')}.webp`} alt={p.athleteName} className="w-full h-full object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/IMG_3743.webp';}} />
                              </span>
                              {p.athleteName}
                            </span>
                          ) : null}
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2">{p.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{p.school}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-red-600 dark:text-red-400 font-bold">${p.price.toFixed(2)}</span>
                          {p.externalUrl && (
                            <a href={p.externalUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 font-semibold" onClick={(e) => e.stopPropagation()}>Buy</a>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
            {groupBy === 'none' && (
              <div className="flex items-center justify-center gap-3 mt-6">
                <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200" onClick={() => setPage(p => Math.max(1, p-1))} type="button">Prev</button>
                <span className="text-gray-700 dark:text-gray-300 text-sm">Page {page}</span>
                <button className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200" onClick={() => setPage(p => p+1)} type="button">Next</button>
              </div>
            )}
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </section>
  );
}


