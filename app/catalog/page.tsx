import { fetchProducts } from '@/lib/products';
import { athletes } from '@/lib/athletes';
import SafeImage from '@/components/SafeImage';
import CatalogExplorer from '@/components/CatalogExplorer';

// Static image paths for catalog visuals

export default async function CatalogPage({ searchParams }: { searchParams?: { school?: string; athlete?: string } }) {
  const school = searchParams?.school || '';
  const athleteSlug = searchParams?.athlete || '';
  const products = await fetchProducts({ school: school || undefined, athleteSlug: athleteSlug || undefined });

  const schools = Array.from(new Set(athletes.map(a => a.school))).sort();
  const athleteMap = new Map(athletes.map(a => [a.slug, a.name]));

  const buster = `?v=${Date.now()}`;
  // Use images guaranteed to exist in public/players
  const infoImg1 = `/players/jonah_coleman.webp${buster}`;
  const infoImg2 = `/players/maliki_crawford.webp${buster}`;
  const infoImg3 = `/players/madden_faraimo.webp${buster}`;
  // Provide product images (from public/catalog) to the explorer above
  //

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <section className="py-12 bg-gradient-to-br from-red-600 via-red-700 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Catalog</h1>
          <p className="text-red-100">Browse all products across players and schools.</p>
        </div>
      </section>

      <CatalogExplorer />

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
                <SafeImage
                  src={infoImg1}
                  fallbackSrc={`/IMG_3743.webp${buster}`}
                  alt="Quality materials"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl w-full max-w-xl aspect-[4/3] bg-black mx-auto">
                <SafeImage
                  src={infoImg2}
                  fallbackSrc={`/IMG_3899.webp${buster}`}
                  alt="Represent Optimal Sports"
                  className="absolute inset-0 w-full h-full object-cover"
                />
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
                <SafeImage
                  src={infoImg3}
                  fallbackSrc={`/IMG_3903.webp${buster}`}
                  alt="Autographed items"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


