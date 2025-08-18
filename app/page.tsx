import Link from "next/link";
import VideoBackground from "../components/VideoBackground";
import { athletes } from "../lib/athletes";
import { getSchoolByName } from "../lib/schools";

export default function HomePage() {
  // Get first 4 athletes for homepage
  const featuredAthletes = athletes.slice(0, 4);
  
  const instagramPhotos = [
    { 
      src: "/503434072_18050765681603363_2382997233816373608_n.jpg", 
      alt: "OPTIMAL SIGNED - Myles Purchase", 
      overlayText: "@OPTIMALSPORTSMGMT",
      isMain: true 
    },
    { 
      src: "/504101920_18049286879603363_1084582550272691093_n.jpg", 
      alt: "OPTIMAL SIGNED - Tuasivi Nomura", 
      overlayText: "@OPTIMALSPORTSMGMT",
      isMain: true 
    },
    { 
      src: "/524393326_18054878426603363_5233614071608525766_n.jpg", 
      alt: "BIG MEDIA DAYS - Team Photo", 
      overlayText: "@OPTIMALSPORTSMGMT",
      isMain: true 
    },
    { 
      src: "/527350224_18055009787603363_4745511802424426391_n.jpg", 
      alt: "HALL OF FAME GAME - Pro Football Hall of Fame", 
      overlayText: "@OPTIMALSPORTSMGMT",
      isMain: true 
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-black h-[60vh] flex items-center">
        {/* Video Background */}
        <VideoBackground />
        
        {/* Enhanced Overlay with depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 backdrop-blur-sm" />
        
        {/* Content - Now centered and more prominent */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          {/* Main Title with enhanced styling and subtle glow */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent drop-shadow-2xl" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2)' }}>
                OPTIMAL
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-red-200 tracking-wider" style={{ textShadow: '0 0 15px rgba(248, 113, 113, 0.4), 0 0 30px rgba(248, 113, 113, 0.2)' }}>
                SPORTS MANAGEMENT
              </span>
            </h1>
            
            {/* Accent line */}
            <div className="w-32 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto mb-6 rounded-full shadow-lg"></div>
          </div>

          <p className="text-gray-100 text-xl md:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Elevating athletes through professional representation and premium merchandise partnerships
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link href="/contact" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] text-center transform hover:scale-105">
              Get Started
            </Link>
            <Link href="/athletes" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-4 rounded-xl text-center transition-all duration-300 transform hover:scale-105">
              View Athletes
            </Link>
          </div>
          
          <div className="mt-8">
            <Link href="/athletes" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-lg font-medium transition-colors">
              <span>Discover our complete roster</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Athletes Grid */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Athletes</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Meet the exceptional talent driving our success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredAthletes.map((athlete) => {
              const schoolInfo = getSchoolByName(athlete.school);
              return (
                <Link
                  key={athlete.slug}
                  href={`/athletes/${athlete.slug}`}
                  className="relative bg-black rounded-3xl shadow-2xl overflow-hidden group hover:shadow-red-500/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                >
                  {/* Full Background Image */}
                  <div className="relative h-[450px] w-full overflow-hidden rounded-3xl">
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
      </section>

      {/* Athlete Vision Section - Brand New */}
      <section className="py-20 bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Driven By Our Athletes&apos; Vision
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed">
              Optimal Sports Management was built upon our athletes&apos; vision of not only being the best players they can be on the field, but also the most notable figures off-the-field through innovative marketing campaigns.
            </p>
      </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Left Side - Vision Content */}
            <div className="space-y-8">
              {/* Our Foundation Card */}
              <div className="group relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-red-900 rounded-2xl p-6 shadow-xl border border-red-500/30 hover:shadow-red-500/25 hover:scale-[1.02] transition-all duration-500 cursor-pointer">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-red-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-red-400/20 rounded-full blur-lg group-hover:scale-125 transition-transform duration-700 delay-100"></div>
                
                {/* Floating Icons */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">★</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-100 transition-colors duration-300">Our Foundation</h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-red-500 rounded-full group-hover:w-16 transition-all duration-300"></div>
                    </div>
      </div>

                  <p className="text-gray-300 leading-relaxed text-sm mb-4 group-hover:text-white transition-colors duration-300">
                    By working with a variety of companies across the nation and having our own storefront, we ensure that our client&apos;s professional and personal needs are met.
                  </p>
                  
                  {/* Interactive Feature Pills */}
                  <div className="space-y-2">
                    {[
                      { icon: "🌐", text: "Nationwide Partnerships" },
                      { icon: "🏪", text: "Dedicated Storefront" },
                      { icon: "🤝", text: "Personal Support" }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200" style={{ transitionDelay: `${200 + index * 100}ms` }}>
                        <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-xs shadow-md">
                          {feature.icon}
                        </div>
                        <span className="text-red-100 font-medium text-sm">{feature.text}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-red-900 rounded-2xl p-6 shadow-xl border border-red-500/30 hover:shadow-red-500/25 hover:scale-[1.02] transition-all duration-500 cursor-pointer">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-red-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-red-400/20 rounded-full blur-lg group-hover:scale-125 transition-transform duration-700 delay-100"></div>
                
                {/* Floating Icons */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-xs font-bold text-white">⚡</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-100 transition-colors duration-300">Innovation & Growth</h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-red-500 rounded-full group-hover:w-16 transition-all duration-300"></div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-sm mb-4 group-hover:text-white transition-colors duration-300">
                    Through cutting-edge marketing campaigns and strategic partnerships, we help athletes become household names both on and off the field.
                  </p>
                  
                  {/* Interactive Feature Pills */}
                  <div className="space-y-2">
                    {[
                      { icon: "🚀", text: "Cutting-Edge Marketing" },
                      { icon: "🤝", text: "Strategic Partnerships" },
                      { icon: "📈", text: "Maximum Exposure" }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200" style={{ transitionDelay: `${200 + index * 100}ms` }}>
                        <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-xs shadow-md">
                          {feature.icon}
                        </div>
                        <span className="text-red-100 font-medium text-sm">{feature.text}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Two Photos */}
            <div className="space-y-6">
              <div className="relative">
                <div className="h-64 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/STARTSUPPORTING.webp" 
                    alt="Start Supporting Your Favorite Athletes" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg mb-1">Supporting Excellence</h4>
                    <p className="text-gray-200 text-sm">Empowering athletes to reach their full potential</p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="h-64 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/DRIVENTOGIVEUP.webp" 
                    alt="Driven to Give Up" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-bold text-lg mb-1">Never Give Up</h4>
                    <p className="text-gray-200 text-sm">The determination that drives champions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* College Teams Ticker */}
          <div className="py-8 md:py-12 bg-transparent overflow-hidden relative">
            <div className="flex animate-scroll">
              {/* First set of actual college logos */}
              <div className="flex items-center gap-8 md:gap-12 lg:gap-16 pr-8 md:pr-12 lg:pr-16 min-w-max">
                <div className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 flex items-center justify-center">
                  <img src="/Boise-State-Broncos-Logo-tumb.png" alt="Boise State Broncos" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300" style={{background: 'transparent'}} />
                </div>
                <div className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 flex items-center justify-center">
                  <img src="/BYU-Cougars-Logo-thumb.png" alt="BYU Cougars" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300" style={{background: 'transparent'}} />
                </div>
                <div className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 flex items-center justify-center">
                  <img src="/Central-Florida-Knights-Logo-tumb.png" alt="UCF Knights" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300" style={{background: 'transparent'}} />
                </div>
                <div className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 flex items-center justify-center">
                  <img src="/Clemson-Tigers-Logo-tumb.png" alt="Clemson Tigers" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300" style={{background: 'transparent'}} />
                </div>
                <div className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 flex items-center justify-center">
                  <img src="/Colorado-Buffaloes-Logo-tumb.png" alt="Colorado Buffaloes" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300" style={{background: 'transparent'}} />
                </div>
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center gap-8 md:gap-12 lg:gap-16 pr-8 md:pr-12 lg:pr-16 min-w-max">
                <div className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 flex items-center justify-center">
                  <img src="/Boise-State-Broncos-Logo-tumb.png" alt="Boise State Broncos" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300" style={{background: 'transparent'}} />
                </div>
                <div className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 flex items-center justify-center">
                  <img src="/BYU-Cougars-Logo-thumb.png" alt="BYU Cougars" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300" style={{background: 'transparent'}} />
                </div>
                <div className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 flex items-center justify-center">
                  <img src="/Central-Florida-Knights-Logo-tumb.png" alt="UCF Knights" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300" style={{background: 'transparent'}} />
                </div>
                <div className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 flex items-center justify-center">
                  <img src="/Clemson-Tigers-Logo-tumb.png" alt="Clemson Tigers" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300" style={{background: 'transparent'}} />
                </div>
                <div className="h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 flex items-center justify-center">
                  <img src="/Colorado-Buffaloes-Logo-tumb.png" alt="Colorado Buffaloes" className="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300" style={{background: 'transparent'}} />
                </div>
              </div>
            </div>
            
            {/* Overlay gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-gray-100 dark:from-black to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-l from-gray-100 dark:from-black to-transparent pointer-events-none"></div>
            
            {/* Center text overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/95 dark:bg-black/70 px-3 md:px-4 lg:px-6 py-1.5 md:py-2 lg:py-2.5 rounded-md md:rounded-lg lg:rounded-xl border border-gray-300/60 dark:border-gray-500/30">
                <h3 className="text-gray-900 dark:text-white font-bold text-xs md:text-sm lg:text-base text-center">REPRESENTING ELITE COLLEGE PROGRAMS</h3>
              </div>
            </div>
          </div>

          {/* How We Serve Our Athletes - Enhanced Visual Section */}
          <div className="mb-16">
            <div className="text-center mb-20">
              <h3 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">How We Serve Our Athletes</h3>
              <p className="text-gray-600 dark:text-gray-200 text-xl max-w-4xl mx-auto leading-relaxed">
                Elite services crafted to transform your athletic potential into lasting success and recognition
              </p>
            </div>
            
            <div className="space-y-16">
              {/* NIL Representation */}
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/2">
                  <div className="relative h-80 rounded-3xl overflow-hidden group shadow-2xl">
                    <img 
                      src="/IMG_5172.webp" 
                      alt="NIL Representation and Brand Partnerships" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 via-purple-800/30 to-black/70"></div>
                    <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/20">
                      NIL EXPERTS
                    </div>
                    <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/20">
                      BRAND PARTNERSHIPS
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 space-y-6">
                  <h4 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">NIL Representation & Brand Partnerships</h4>
                  <p className="text-gray-600 dark:text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    Connect with premium brands and maximize your NIL earning potential through strategic partnerships.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-gray-900 dark:text-white font-medium text-sm">Brand Strategy</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Contract Optimization</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Partnership Management</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Revenue Growth</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Innovative Marketing - Reversed */}
              <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
                <div className="lg:w-1/2">
                  <div className="relative h-80 rounded-3xl overflow-hidden group shadow-2xl">
                    <img 
                      src="/IMG_3969.webp" 
                      alt="Innovative Marketing Campaigns" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/20 via-teal-800/30 to-black/70"></div>
                    <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/20">
                      MARKETING
                    </div>
                    <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/20">
                      VIRAL CAMPAIGNS
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 space-y-6">
                  <h4 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">Innovative Marketing & Brand Development</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    Build your brand with strategic marketing campaigns that drive engagement and recognition.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Campaign Development</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Social Media Strategy</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Content Creation</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Digital Innovation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contracting & Coordination */}
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/2">
                  <div className="relative h-80 rounded-3xl overflow-hidden group shadow-2xl">
                    <img 
                      src="/IMG_3743.webp" 
                      alt="Professional Contract Management" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-700/20 via-orange-800/30 to-black/70"></div>
                    <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/20">
                      CONTRACTS
                    </div>
                    <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/20">
                      LEGAL PROTECTION
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 space-y-6">
                  <h4 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">Professional Contract Management</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    Expert contract management and legal protection for all your athletic opportunities.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"/>
                          <path d="M6 8h8v2H6V8zM6 12h5v2H6v-2z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Contract Review</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Legal Protection</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Event Coordination</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Full Support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nationwide Reach - Reversed */}
              <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
                <div className="lg:w-1/2">
                  <div className="relative h-80 rounded-3xl overflow-hidden group shadow-2xl">
                    <img 
                      src="/IMG_1546.webp" 
                      alt="Nationwide Network and Reach" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 via-gray-800/30 to-black/70"></div>
                    <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/20">
                      NETWORK
                    </div>
                    <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/20">
                      NATIONWIDE REACH
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 space-y-6">
                  <h4 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">Nationwide Network & Expansion</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    Access our nationwide network to unlock opportunities in every major market across the country.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Coast-to-Coast</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Elite Partnerships</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"/>
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Market Access</span>
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-900 dark:text-white font-medium text-sm">Global Reach</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            
          {/* Explore All Services Button - Moved here */}
          <div className="text-center mt-12">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore All Services
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>



          {/* Community CTA */}
          <section className="py-16 bg-gradient-to-r from-red-600 to-red-500 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Join the Optimal Community</h3>
                  <p className="text-red-50">Share game clips, milestones, and event photos. Stay on top of NIL news and growth insights.</p>
                </div>
                <div className="flex gap-3 md:justify-end">
                  <Link href="/about" className="bg-white text-gray-900 dark:text-black font-semibold px-5 py-3 rounded-lg">Learn More</Link>
                  <Link href="/contact" className="bg-transparent border-2 border-white text-white px-5 py-3 rounded-lg">Get Started</Link>
                </div>
              </div>
            </div>
          </section>

      {/* Enhanced Social Section - Full Height Instagram Photos */}
      <section className="bg-gray-100 dark:bg-black text-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Follow Our Journey
          </h2>
          </div>

          {/* Full Height Instagram Photos - No Extra Spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {instagramPhotos.filter(photo => photo.isMain).map((photo, index) => (
        <a
                key={index} 
                href="https://instagram.com/OPTIMALSPORTSMGMT" 
          target="_blank"
          rel="noopener noreferrer"
                className="relative group cursor-pointer transform hover:-translate-y-2 transition-all duration-500 block"
              >
                <div className="h-80 md:h-96 lg:h-[450px] overflow-hidden border-4 border-white/20 shadow-2xl hover:shadow-white/20 transition-all duration-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={photo.src} 
                    alt={photo.alt} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Enhanced Instagram Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                    <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.849 0 3.205-.012 3.584-.07 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058 1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <span className="font-bold text-xl">{photo.overlayText}</span>
                      </div>
                      <div className="text-sm text-gray-200 font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">Click to follow</div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
      </div>
      </section>
    </main>
  );
}