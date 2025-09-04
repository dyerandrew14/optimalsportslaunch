"use client";

import Link from "next/link";
import { athletes } from "@/lib/athletes";
import { getSchoolByName } from "@/lib/schools";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function AthletesPage() {
  const searchParams = useSearchParams();
  const [filteredAthletes, setFilteredAthletes] = useState(athletes);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeague, setSelectedLeague] = useState(""); // "College" | "NFL" | ""

  // Helper to determine league
  const getLeague = (conference: string) => (conference === "NFL" ? "NFL" : "College");

  // Apply filters
  useEffect(() => {
    let filtered = athletes;

    // URL-based filtering (for search results)
    const schoolFromUrl = searchParams.get('school');
    if (schoolFromUrl) {
      filtered = filtered.filter(a => a.school === schoolFromUrl);
    }

    // Apply other filters
    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLeague) {
      if (selectedLeague === "NFL") {
        filtered = filtered.filter(a => getLeague(a.conference) === "NFL");
      } else if (selectedLeague === "College") {
        filtered = filtered.filter(a => getLeague(a.conference) === "College");
      }
    }

    setFilteredAthletes(filtered);
  }, [searchTerm, selectedLeague, searchParams]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLeague("");
  };

  return (
    <main className="pb-16">
      <section className="text-white py-16" style={{background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Our Athletes</h1>
          <p className="max-w-3xl text-gray-100">Meet the talented college athletes we represent and support in their journey to success. Each player brings unique skills, dedication, and potential to the field.</p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search / League filter */}
        <div className="-mt-10 mb-6">
          <div className="bg-white dark:bg-neutral-900 border rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <input 
                className="border rounded-lg px-3 py-2" 
                placeholder="Search player name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="border rounded-lg px-3 py-2"
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
              >
                <option value="">All Leagues</option>
                <option value="College">College</option>
                <option value="NFL">NFL</option>
              </select>
              <div className="hidden md:block" />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Showing {filteredAthletes.length} of {athletes.length} athletes
              </div>
              {(searchTerm || selectedLeague) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAthletes.map((athlete) => {
            const schoolInfo = getSchoolByName(athlete.school);
            return (
              <Link
                key={athlete.slug}
                href={`/athletes/${athlete.slug}`}
                className="relative bg-black rounded-3xl shadow-2xl overflow-hidden group hover:shadow-red-500/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              >
                {/* Full Background Image */}
                <div className="relative h-96 w-full overflow-hidden rounded-3xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={athlete.image} 
                    alt={athlete.name} 
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  
                  {/* Position and Number Badges */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold border border-red-500/50">
                    {athlete.position}
                  </div>
                  <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white/30">
                    #{athlete.number}
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
                  
                  {/* Transparent Info Section */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md border-t border-white/20 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {schoolInfo && (
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border-2 border-white/30 flex-shrink-0">
                          <img 
                            src={schoolInfo.logo} 
                            alt={schoolInfo.mascot} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-red-200 transition-colors">
                          {athlete.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <p className="text-gray-200 text-sm font-medium">{athlete.school}</p>
                          {schoolInfo && (
                            <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full border border-white/30">
                              {schoolInfo.mascot}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-3 opacity-90">{athlete.bio}</p>
                    <div className="flex justify-between text-sm text-gray-300">
                      <span className="bg-red-600/20 backdrop-blur-sm px-3 py-1 rounded-full border border-red-500/30">
                        {athlete.conference}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                        {athlete.classYear}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}


