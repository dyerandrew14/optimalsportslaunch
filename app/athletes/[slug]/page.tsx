import { notFound } from "next/navigation";
import Link from "next/link";
import { athletes } from "@/lib/athletes";
import { kv } from "@vercel/kv";
import { getSchoolByName } from "@/lib/schools";
import { AthleteShop } from "@/components/AthleteShop";

type Params = { slug: string };

export async function generateStaticParams() {
  // Try KV-backed slugs so Admin-added athletes pre-render if present
  try {
    const all = (await kv.get<typeof athletes>("athletes:all")) || athletes;
    return all
      .filter(a => a.name.trim().toLowerCase() !== "to be announced")
      .map((a) => ({ slug: a.slug }));
  } catch {
    return athletes
      .filter(a => a.name.trim().toLowerCase() !== "to be announced")
      .map((a) => ({ slug: a.slug }));
  }
}

export default async function AthleteProfile({ params }: { params: Params }) {
  const { slug } = params;
  // Prefer KV so Admin edits are live, fall back to static list
  let athlete = null as (typeof athletes)[number] | null;
  try {
    athlete = await kv.get<typeof athletes[number]>(`athlete:${slug}`);
  } catch {}
  if (!athlete) {
    try {
      const all = (await kv.get<typeof athletes>("athletes:all")) || athletes;
      athlete = all.find(a => a.slug === slug && a.name.trim().toLowerCase() !== "to be announced") || null;
    } catch {
      athlete = athletes.find(a => a.slug === slug && a.name.trim().toLowerCase() !== "to be announced") || null;
    }
  }
  if (!athlete) return notFound();

  const schoolInfo = getSchoolByName(athlete.school);

  // categories could be introduced later for filtering merchandise

  return (
    <main className="py-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/athletes" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Athletes
        </Link>

        {/* Hero Section with Big Photo and Info */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Big Photo */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800">
                <img 
                  src={athlete.image} 
                  alt={athlete.name} 
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                
                {/* Position Badge */}
                <div className="absolute top-6 left-6">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {athlete.position}
                  </span>
                </div>

                {/* Number Badge */}
                <div className="absolute top-6 right-6">
                  <span className="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-2xl font-bold shadow-lg">
                    #{athlete.number}
                  </span>
                </div>

                {/* School Logo Overlay */}
                {schoolInfo && (
                  <div className="absolute bottom-6 right-6">
                    <div className="w-20 h-20 bg-white rounded-full p-2 shadow-lg border-2 border-white">
                      <img 
                        src={schoolInfo.logo} 
                        alt={schoolInfo.mascot} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Player Info */}
            <div className="space-y-8">
              {/* Player Name and School */}
              <div>
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {athlete.name}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  {schoolInfo && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <img 
                          src={schoolInfo.logo} 
                          alt={schoolInfo.mascot} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-gray-900 dark:text-white">{athlete.school}</p>
                        <p className="text-gray-600 dark:text-gray-400">{schoolInfo.mascot}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-gray-200 dark:border-neutral-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Number</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">#{athlete.number}</div>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-gray-200 dark:border-neutral-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Conference</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{athlete.conference}</div>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-gray-200 dark:border-neutral-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Class Year</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{athlete.classYear}</div>
                </div>
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-gray-200 dark:border-neutral-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Position</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{athlete.position}</div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-gray-200 dark:border-neutral-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About {athlete.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{athlete.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Section - Only show if athlete has merchandise */}
        <AthleteShop
          athleteName={athlete.name}
          hasMerchandise={athlete.hasMerchandise}
          merchandiseItems={athlete.merchandise ?? []}
          athleteSlug={athlete.slug}
        />

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-gray-200 dark:border-neutral-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Season Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-neutral-600">
                <span className="text-gray-600 dark:text-gray-400">2024</span>
                <span className="font-semibold">12 Games • 1,120 Yards • 10 TD</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-neutral-600">
                <span className="text-gray-600 dark:text-gray-400">2023</span>
                <span className="font-semibold">11 Games • 980 Yards • 8 TD</span>
              </div>
            </div>
          </div>
          {/* Right column - Player Mini Shop */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-gray-200 dark:border-neutral-700">
            <AthleteShop
              athleteName={athlete.name}
              hasMerchandise={true}
              merchandiseItems={athlete.merchandise ?? []}
              athleteSlug={athlete.slug}
            />
          </div>
        </div>
      </div>
    </main>
  );
}


