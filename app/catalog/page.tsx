import { fetchProducts } from '@/lib/products';
import { athletes } from '@/lib/athletes';

export default async function CatalogPage({ searchParams }: { searchParams?: { school?: string; athlete?: string } }) {
  const school = searchParams?.school || '';
  const athleteSlug = searchParams?.athlete || '';
  const products = await fetchProducts({ school: school || undefined, athleteSlug: athleteSlug || undefined });

  const schools = Array.from(new Set(athletes.map(a => a.school))).sort();
  const athleteMap = new Map(athletes.map(a => [a.slug, a.name]));

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <section className="py-12 bg-gradient-to-br from-red-600 via-red-700 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Catalog</h1>
          <p className="text-red-100">Browse all products across players and schools.</p>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Browse by School placeholder grid */}
          <div className="mb-10">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3">Browse by School</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {schools.map(name => (
                <a
                  key={name}
                  href={`?school=${encodeURIComponent(name)}`}
                  className="group relative rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-4 flex items-center justify-center hover:border-red-500/60 transition-colors"
                >
                  <div className="h-8 w-8 mr-2 rounded bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800" />
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-1">
                    {name}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <input name="q" className="border rounded-lg px-3 py-2" placeholder="Search product name" />
            <select name="school" defaultValue={school} className="border rounded-lg px-3 py-2">
              <option value="">All Schools</option>
              {schools.map(s => (<option key={s} value={s}>{s}</option>))}
            </select>
            <select name="athlete" defaultValue={athleteSlug} className="border rounded-lg px-3 py-2">
              <option value="">All Players</option>
              {Array.from(athleteMap.entries()).map(([slug, name]) => (
                <option key={slug} value={slug}>{name}</option>
              ))}
            </select>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p.id} className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden">
                <div className="h-56 bg-gray-200 dark:bg-neutral-700 flex items-center justify-center">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover"/>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">No image</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2">{p.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{p.athleteName} • {p.school}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-red-600 dark:text-red-400 font-bold">${'{'}p.price.toFixed(2){'}'}</span>
                    {p.externalUrl && (
                      <a href={p.externalUrl} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 font-semibold">Buy</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating informational sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">The perfect fit</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">Like our athletes who demand the highest quality of gear on the field, we also utilize the best materials to ensure our merchandise is of the highest quality.</p>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl w-full max-w-xl aspect-[4/3] bg-black">
                <img src="/placeholder-1.jpg" alt="Quality materials" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl w-full max-w-xl aspect-[4/3] bg-black mx-auto">
                <img src="/placeholder-2.jpg" alt="Represent Optimal Sports" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-6">
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Represent Optimal Sports</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">Be a part of the Optimal Sports crew alongside your favorite players and show your support!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Autograph and signed</h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">All of our autographed memorabilia, whether it is a photograph or a football helmet, is guaranteed to be authentic from the athlete who signed it.</p>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl w-full max-w-xl aspect-[4/3] bg-black mx-auto">
                <img src="/placeholder-3.jpg" alt="Autographed items" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


