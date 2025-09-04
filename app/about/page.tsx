import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Christopher Gil",
      title: "Founder & Chief Executive Officer",
      image: "/imagejpeg_0.jpg",
      bio: "Christopher is the Founder and CEO of Optimal Sports Management. He is originally from Los Angeles, California. He brings three years of sports management experience working for several Los Angeles based professional sports teams and two sports management firms, prior to graduating from USC in Fall 2020 with a degree in Sports Media. While at USC, he was a member of the Sports Business Association. Christopher is also a proud graduate of Loyola Marymount University, having attained his Master's of Science in Business Management from the Hilton Center for Business in May of 2023. Christopher became an NFLPA Certified Contract Advisor in 2023.",
      credentials: ["USC Sports Media Graduate", "LMU MS Business Management", "NFLPA Certified Contract Advisor"]
    },
    {
      name: "Frank Yip",
      title: "Co-Founder and Director of Football Operations",
      image: "/IMG_0069.JPG",
      bio: "Frank Yip is a proud graduate of the Marshall School of Business at the University of Southern California and the School of Law at Santa Clara University. He is also a certified financial planner from the Denver School of Financial Planning and the University of Southern California. He currently serves as the Founder and CEO of Coaches Athletic Advisory Services (CAAS). Frank brings a wealth of experience in the sports industry, having worked primarily in the collegiate and professional football industry.",
      credentials: ["USC Marshall School of Business", "Santa Clara University School of Law", "Certified Financial Planner"]
    },
    {
      name: "Jon Kingdon",
      title: "Director of Scouting",
      image: "/jon-kingdon-placeholder.jpg",
      bio: "Jon Kingdon dedicated 33 years to the legendary Al Davis and the Oakland Raiders, beginning as an intern in 1978 and serving as Director of College Scouting until his departure in 2012. A trusted advisor to Davis, Kingdon played a key role in player evaluations, though they occasionally differed on draft selections. He co-authored Al Davis: Behind the Raider Shield with Bruce Kebric, offering an insider's perspective on the Raiders' iconic leader.",
      credentials: ["33 Years with Oakland Raiders", "Oberlin College Graduate", "Co-author of Al Davis Biography"]
    },
    {
      name: "Steve Briscoe",
      title: "Director of Youth Football",
      image: "/steve-briscoe-placeholder.jpg",
      bio: "Coach Steve Briscoe is the Co-Founder and President of Next Level Sports & Academics. He has been coaching and mentoring student athletes for 8+ years. He has coached on many levels from Little League Youth to Elite High School and National 7v7 teams. Coach Briscoe is currently the Passing Coordinator/ College Relations Coordinator for Mount Diablo High School, located in Northern California.",
      credentials: ["8+ Years Coaching Experience", "Next Level Sports & Academics", "Mount Diablo High School"]
    },
    {
      name: "Damian Ochoa",
      title: "Marketing Coordinator",
      image: "/damian-ochoa-placeholder.jpg",
      bio: "Damian Ochoa is a proud graduate of Chapman University where he attained his Bachelor's degree in Political Science and a minor in Entrepreneurship. He is currently attending the University of San Francisco and is attaining his Master's of Science in Sports Management. Prior to joining Optimal Sports Management, Damian worked for Steinberg Sports & Entertainment as an Account Executive, where he collaborated with agents to facilitate collegiate NIL deals.",
      credentials: ["Chapman University Graduate", "USF MS Sports Management", "Steinberg Sports & Entertainment"]
    },
    {
      name: "Jerry",
      title: "Senior Advisor",
      image: "/IMG_3969.webp",
      bio: "Jerry is a seasoned advisor supporting athletes across contract preparation, career planning, and brand strategy.",
      credentials: ["Advisory", "Career Planning", "Brand Strategy"]
    }
  ];

  const faqs = [
    {
      question: "I am currently an American college football player and would like to learn more about the NIL laws that came into effect. Would it also be possible to represent me?",
      answer: "Absolutely! We specialize in NIL representation and would be happy to discuss how we can help you navigate the new NIL landscape while maintaining your collegiate eligibility. Our experienced advisors have been involved in the sports industry for over 30 years and understand the complexities of NIL regulations."
    },
    {
      question: "Are there any career opportunities/internships for students or recent college graduates?",
      answer: "Yes, we offer internship and career opportunities for qualified candidates. We're always looking for passionate individuals who want to learn about sports management and athlete representation. Please reach out to us for current openings and application processes."
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Optimal Sports Management is dedicated to enhancing the lives of our clients, 
                both on and off-the field, by giving them the necessary resources to not only 
                achieve their goals, but to also create a meaningful impact within their 
                communities through their athletic career and beyond.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full">
                  <span className="text-red-700 dark:text-red-300 font-medium">NIL Representation</span>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                  <span className="text-red-700 dark:text-red-300 font-medium">Community Impact</span>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
                  <span className="text-green-700 dark:text-green-300 font-medium">Career Development</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Founded in July 2021
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  At the beginning of the NIL era, our USC-educated executives brought 
                  real-world experience in Business Administration and Sports Media to 
                  revolutionize athlete representation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              From the dawn of NIL to becoming a leading sports management agency
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  The NIL Frontier
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The new NIL frontier is certainly a game changer and as a high school/collegiate 
                  athlete, you are certainly in the right place to take advantage of it. With that 
                  being said, it is imperative you find the right NIL advisors to walk you and your 
                  family through the process and to avoid jeopardizing collegiate eligibility.
                </p>
              </div>
              
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Experienced Advisors
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  This is why we have experienced advisors who have been involved within the sports 
                  industry for the past 30 years. These advisors include former athletes, coaches, 
                  and college athletic administrators.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Driven By Our Athletes&apos; Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Optimal Sports Management was built upon our athletes&apos; vision of not only being 
                  the best players they can be on the field, but also the most notable figures 
                  off-the field through innovative marketing campaigns.
                </p>
                <Link 
                  href="/athletes" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  View Our Athletes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Unique */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What Makes Us Unique?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our selective approach and elite athlete roster sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Selective Agency
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We maintain exclusivity by working with only elite athletes, ensuring 
                the highest quality representation for our clients.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Close Relationships
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our selective approach allows us to maintain close relationships with 
                clients and create tailored marketing strategies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Tailored Strategies
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We work with a variety of companies across the nation and have our 
                own storefront to meet all client needs.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/signup" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Join Optimal Today
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Optimal Sports Management Executive Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative h-64 bg-gray-200 dark:bg-neutral-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-red-600 dark:text-red-400 font-semibold mb-4">
                    {member.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                    {member.bio}
                  </p>
                  <div className="space-y-2">
                    {member.credentials.map((credential, credIndex) => (
                      <div key={credIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {credential}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get answers to common questions about working with us
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={index} className="group border border-gray-200 dark:border-neutral-700 rounded-lg">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                  <h3 className="font-medium text-gray-900 dark:text-white text-left pr-4">
                    {faq.question}
                  </h3>
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 border-t border-gray-200 dark:border-neutral-700">
                  <p className="pt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Social Section - Instagram CTA Style from Homepage */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Follow Our Journey
            </h2>
          </div>

          {/* Instagram Photos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              {
                src: "/504101920_18049286879603363_1084582550272691093_n.jpg",
                alt: "Community Photo 1",
                overlayText: "@OPTIMALSPORTSMGMT"
              },
              {
                src: "/503434072_18050765681603363_2382997233816373608_n.jpg",
                alt: "Community Photo 2", 
                overlayText: "@OPTIMALSPORTSMGMT"
              },
              {
                src: "/524393326_18054878426603363_5233614071608525766_n.jpg",
                alt: "Community Photo 3",
                overlayText: "@OPTIMALSPORTSMGMT"
              },
              {
                src: "/527350224_18055009787603363_4745511802424426391_n.jpg",
                alt: "Community Photo 4",
                overlayText: "@OPTIMALSPORTSMGMT"
              }
            ].map((photo, index) => (
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
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.849 0 3.205-.012 3.584-.07 4.849-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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


