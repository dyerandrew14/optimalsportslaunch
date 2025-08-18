import Link from "next/link";
import VideoBackground from "../../components/VideoBackground";

export default function ServicesPage() {

  const services = [
    {
      title: "NFL Contract Representation",
      description: "Expert contract negotiation and salary optimization to ensure you receive the compensation you deserve. We handle performance bonuses, guaranteed money, and complex contract structures.",
      image: "/IMG_3969.webp",
      imageAlt: "Professional athlete contract representation",
      gradient: "from-red-600 via-red-700 to-black",
      features: ["Contract Negotiation", "Salary Optimization", "Performance Bonuses", "Guaranteed Money"],
      stats: "15+ years experience",
      badge: "NFL READY"
    },
    {
      title: "NIL Representation & Marketing",
      description: "Strategic brand development and endorsement deals that maximize your market value. We create comprehensive marketing strategies that scale with your career.",
      image: "/IMG_5172.webp",
      imageAlt: "NIL marketing and brand partnerships for athletes",
      gradient: "from-blue-600 via-purple-600 to-red-600",
      features: ["Brand Strategy", "Market Research", "Endorsement Deals", "Social Media Growth"],
      stats: "200+ brand partnerships",
      badge: "NIL EXPERTS"
    },
    {
      title: "Client Relations & Support",
      description: "Comprehensive personal and professional support to handle your everyday needs. From charity management to family logistics, we ensure you can focus on your game.",
      image: "/IMG_3743.webp",
      imageAlt: "Comprehensive athlete support and client relations",
      gradient: "from-green-600 via-teal-600 to-blue-600",
      features: ["Charity Management", "Family Logistics", "Travel Coordination", "Personal Assistance"],
      stats: "24/7 support available",
      badge: "FULL SERVICE"
    },
    {
      title: "NIL Collective Representation",
      description: "Specialized representation for collective deals with NCAA compliance expertise. We maximize your collective value while ensuring regulatory adherence.",
      image: "/IMG_3897.webp",
      imageAlt: "College athletes NIL collective representation",
      gradient: "from-purple-600 via-pink-600 to-red-600",
      features: ["Collective Deals", "NCAA Compliance", "Brand Alignment", "Risk Mitigation"],
      stats: "100% compliance rate",
      badge: "NCAA COMPLIANT"
    },
    {
      title: "Wealth Management & Career Planning",
      description: "Long-term financial planning and career transition support. We help you build lasting wealth and prepare for life after sports.",
      image: "/IMG_1546.webp",
      imageAlt: "Athlete wealth management and career planning",
      gradient: "from-yellow-600 via-orange-600 to-red-600",
      features: ["Financial Planning", "Investment Strategy", "Career Transition", "Legacy Building"],
      stats: "$50M+ managed assets",
      badge: "WEALTH BUILDERS"
    }
  ];

  const stats = [
    { number: "500+", label: "Athletes Represented" },
    { number: "$2B+", label: "Contracts Negotiated" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  return (
    <main className="min-h-screen">
      {/* Professional Header with Video Background */}
      <section className="relative py-12 bg-gradient-to-br from-red-600 via-red-700 to-black text-white overflow-hidden">
        {/* Video Background */}
        <VideoBackground />
        
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 backdrop-blur-sm" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                Professional Sports Management
              </span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Comprehensive services designed to maximize your potential and secure your future
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NFL-Style Alternating Services */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
                Elite Services
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional expertise that elevates champions to the next level
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}>
                {/* Image Side */}
                <div className="flex-1 group">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img 
                      src={service.image} 
                      alt={service.imageAlt}
                      className="w-full h-[400px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Image Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
                    
                    {/* Floating Badges */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-black/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-black border border-red-500/50 shadow-xl">
                        {service.badge}
                      </div>
                    </div>
                    
                    <div className="absolute top-6 right-6">
                      <div className="bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold border border-white/30 shadow-xl">
                        {service.stats}
                      </div>
                    </div>
                    
                    {/* Bottom Number Badge */}
                    <div className="absolute bottom-6 right-6">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 shadow-xl">
                        <span className="text-2xl font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:bg-white/10">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg flex-shrink-0"></div>
                        <span className="text-white font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="pt-6">
                    <Link 
                      href="/contact"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-black text-white font-black px-8 py-4 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-red-500/30 transform hover:scale-105 group/btn border border-red-500/50"
                    >
                      <span className="text-lg">Get Started</span>
                      <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>

                  {/* Service Number Indicator */}
                  <div className="flex items-center gap-3 pt-4">
                    <div className="flex space-x-2">
                      {services.map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            i === index 
                              ? 'bg-red-500 shadow-lg shadow-red-500/50' 
                              : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm font-medium">
                      {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Process Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
                Our Process
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A proven methodology that delivers results
            </p>
          </div>

          <div className="relative">
            {/* Clean Progress Line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-700">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-600 w-full" />
            </div>

            {/* Minimal Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Assessment", description: "Evaluate your current situation" },
                { step: "2", title: "Strategy", description: "Develop comprehensive plans" },
                { step: "3", title: "Execution", description: "Implement with precision" },
                { step: "4", title: "Optimization", description: "Continuously improve" }
              ].map((process, index) => (
                <div key={index} className="text-center relative">
                  {/* Circle on Line */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-lg font-bold relative z-10 bg-red-600 text-white">
                      {process.step}
                    </div>
                  </div>

                  {/* Clean Content */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">
                      {process.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {process.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>




    </main>
  );
}


