"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('join');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Header - Shorter */}
      <section className="relative py-12 bg-gradient-to-br from-red-600 via-red-700 to-black text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
              Join Optimal Sports
            </span>
          </h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto mb-6">
            Ready to elevate your athletic career? Connect with us and discover the opportunities waiting for you.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-white to-red-300 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white dark:bg-neutral-950 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-gray-100 dark:bg-neutral-800 p-2 rounded-2xl shadow-inner">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('join')}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    activeTab === 'join'
                      ? 'bg-red-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                >
                  🏈 Join the Team
                </button>
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    activeTab === 'contact'
                      ? 'bg-red-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                >
                  💬 Reach Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'join' ? (
            /* Join the Team Form */
            <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-neutral-700 p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Athlete Application
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Tell us about yourself and your athletic journey. We&apos;re excited to learn more about your goals and how we can help you achieve them.
                </p>
              </div>

              <form className="space-y-8">
                {/* Personal Information */}
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        First Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Last Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Athletic Information */}
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Athletic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        School/University *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                        placeholder="Enter your school name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Sport *
                      </label>
                      <select 
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                      >
                        <option value="">Select your sport</option>
                        <option value="football">Football</option>
                        <option value="basketball">Basketball</option>
                        <option value="baseball">Baseball</option>
                        <option value="soccer">Soccer</option>
                        <option value="track">Track & Field</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Position *
                      </label>
                      <input 
                        type="text" 
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                        placeholder="Enter your position"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Class Year *
                      </label>
                      <select 
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                      >
                        <option value="">Select class year</option>
                        <option value="freshman">Freshman</option>
                        <option value="sophomore">Sophomore</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                        <option value="graduate">Graduate</option>
                        <option value="high-school">High School</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Goals & Additional Info */}
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    Tell Us About Your Goals
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Career Goals & Aspirations *
                      </label>
                      <textarea 
                        required
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200 resize-none"
                        placeholder="Tell us about your athletic goals, where you see yourself in the next few years, and what you hope to achieve..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Current Achievements & Highlights
                      </label>
                      <textarea 
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200 resize-none"
                        placeholder="Share your key achievements, stats, awards, or any notable accomplishments..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    required
                    className="w-5 h-5 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-1"
                  />
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    I agree to the <Link href="/privacy" className="text-red-600 hover:text-red-700 underline">Privacy Policy</Link> and consent to being contacted about joining Optimal Sports Management.
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Submit Application
                </button>
              </form>
            </div>
          ) : (
            /* Reach Out Form */
            <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-neutral-700 p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Have a question or want to learn more about our services? We&apos;d love to hear from you and will get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Subject *
                  </label>
                  <select 
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnerships">Partnership Opportunities</option>
                    <option value="media">Media & Press</option>
                    <option value="services">Questions About Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Message *
                  </label>
                  <textarea 
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-base transition-all duration-200 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    required
                    className="w-5 h-5 text-red-600 focus:ring-red-500 border-gray-300 rounded mt-1"
                  />
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    I agree to the <Link href="/privacy" className="text-red-600 hover:text-red-700 underline">Privacy Policy</Link> and consent to being contacted about my inquiry.
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Contact Information & Support */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950 border-t border-gray-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Get In Touch & Learn More
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions, explore our services, or get direct support from our team
            </p>
          </div>

          {/* Contact Methods - Enhanced Dropdowns */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              How Can We Help You?
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Athlete Recruitment",
                  description: "Ready to join our roster? Learn about our application process",
                  badge: "🏈 Athletes",
                  email: "christophergil@optimalsports.net",
                  phone: "+1 (555) 123-4568",
                  details: "Our recruitment team specializes in identifying and developing talented athletes. We provide comprehensive NIL representation, brand building, and career development services tailored to your unique goals.",
                  services: ["NIL Deal Negotiation", "Social Media Strategy", "Brand Partnerships", "Career Planning"]
                },
                {
                  title: "Partnership Opportunities",
                  description: "Brand collaborations and sponsorship inquiries",
                  badge: "🤝 Partnerships",
                  email: "christophergil@optimalsports.net",
                  phone: "+1 (555) 123-4569",
                  details: "We work with leading brands to create authentic partnerships with our athletes. Our partnership team handles everything from initial outreach to contract execution and campaign management.",
                  services: ["Brand Collaborations", "Event Partnerships", "Product Endorsements", "Content Creation"]
                },
                {
                  title: "Media & Press",
                  description: "Interview requests and media inquiries",
                  badge: "📰 Media",
                  email: "christophergil@optimalsports.net",
                  phone: "+1 (555) 123-4570",
                  details: "Our media relations team manages all press inquiries, interview requests, and media appearances for our athletes. We ensure professional representation across all media channels.",
                  services: ["Interview Coordination", "Press Releases", "Media Training", "Crisis Management"]
                },
                {
                  title: "General Inquiries",
                  description: "Questions about our services or how we can help",
                  badge: "💬 General",
                  email: "christophergil@optimalsports.net",
                  phone: "+1 (555) 123-4567",
                  details: "Have questions about our services, pricing, or how we work with athletes? Our general inquiry team is here to provide information and guide you to the right department.",
                  services: ["Service Information", "Pricing Details", "Process Overview", "Initial Consultations"]
                }
              ].map((method, index) => (
                <details key={index} className="group border-2 border-gray-200 dark:border-neutral-700 rounded-2xl hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <summary className="flex items-center justify-between p-8 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors rounded-2xl">
                    <div className="flex items-center gap-6">
                      <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 px-4 py-2 rounded-xl text-sm font-bold text-red-700 dark:text-red-300 shadow-md">
                        {method.badge}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {method.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                          {method.description}
                        </p>
                      </div>
                    </div>
                    <svg className="w-8 h-8 text-gray-400 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-8 pb-8 border-t border-gray-200 dark:border-neutral-700">
                    <div className="pt-8">
                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                        {method.details}
                      </p>
                      
                      {/* Services Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        {method.services.map((service, serviceIndex) => (
                          <div key={serviceIndex} className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-700 dark:to-neutral-800 rounded-lg p-3 text-center">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{service}</span>
                          </div>
                        ))}
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-md">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                            <a href={`mailto:${method.email}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors">
                              {method.email}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-md">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                            <a href={`tel:${method.phone}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors">
                              {method.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Get answers to the most common questions about working with Optimal Sports Management
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "How do I get started with Optimal Sports Management?",
                  answer: "Getting started is easy! Simply fill out our 'Join the Team' application form above with your athletic information and goals. Our recruitment team will review your application within 24-48 hours and schedule a consultation to discuss how we can help elevate your career. We'll walk you through our services, answer any questions, and create a customized plan for your success."
                },
                {
                  question: "What sports and levels do you work with?",
                  answer: "We work with athletes across all major college sports including football, basketball, baseball, soccer, track & field, and more. Our services extend to high school athletes committed to Division I programs, current college athletes at all levels, and professional athletes. Whether you're just starting your NIL journey or looking to expand existing partnerships, we have the expertise to help."
                },
                {
                  question: "What does your NIL representation include?",
                  answer: "Our comprehensive NIL representation includes deal sourcing and negotiation, contract review and legal support, brand partnership development, social media strategy and content creation, financial planning and tax guidance, compliance assistance, and ongoing career development. We handle all aspects of your NIL opportunities so you can focus on your sport and academics."
                },
                {
                  question: "How much do your services cost?",
                  answer: "Our fee structure is transparent and success-based. We typically work on a commission basis for NIL deals we secure, meaning you only pay when we deliver results. For ongoing management services, we offer various packages tailored to your needs and goals. During your initial consultation, we'll discuss pricing options that work best for your situation."
                },
                {
                  question: "How quickly can you help me secure NIL deals?",
                  answer: "Timeline varies based on your sport, social media presence, and market demand. Some athletes see opportunities within the first month, while building a strong foundation typically takes 3-6 months. We focus on both immediate opportunities and long-term brand building to ensure sustainable success throughout your career."
                },
                {
                  question: "Do you help with social media and personal branding?",
                  answer: "Absolutely! Personal branding and social media optimization are core components of our services. We help develop your unique brand identity, create engaging content strategies, optimize your social media profiles, provide professional photography and videography, and teach you how to effectively engage with your audience to maximize your marketability."
                }
              ].map((faq, index) => (
                <details key={index} className="group border-2 border-gray-200 dark:border-neutral-700 rounded-2xl hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors rounded-2xl">
                    <h4 className="font-bold text-gray-900 dark:text-white text-left pr-4 text-lg leading-relaxed">
                      {faq.question}
                    </h4>
                    <svg className="w-7 h-7 text-gray-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 border-t border-gray-200 dark:border-neutral-700">
                    <p className="pt-6 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Quick Contact Summary */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 text-white text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-red-100 mb-6 text-lg">
              Choose your path above or contact us directly for immediate assistance
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-medium">24-hour response</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium">Free consultation</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-medium">Immediate support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}