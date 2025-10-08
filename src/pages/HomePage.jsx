import React from 'react';
import { useApp } from '../context/AppContext';

const HomePage = () => {
  const { navigateToPage } = useApp();

  const features = [
    {
      emoji: '🎯',
      tag: 'Manual Outreach',
      title: '100% Manual Outreach',
      description: 'Personal, targeted outreach to real websites with genuine editorial oversight',
      color: 'blue',
    },
    {
      emoji: '🔗',
      tag: 'Quality Links',
      title: 'High-Quality DoFollow Backlinks',
      description: 'Authority links that actually move rankings and drive real traffic',
      color: 'green',
    },
    {
      emoji: '📈',
      tag: 'Measurable Results',
      title: 'Measurable SEO Gains',
      description: 'Track real improvements in traffic and rankings with detailed reporting',
      color: 'purple',
    },
  ];

  const benefits = [
    {
      emoji: '🎯',
      tag: 'Domain Authority',
      title: 'Boost Domain Authority Through Contextual Backlinks',
      description:
        "Strategic placement on high-authority sites that pass real link equity and improve your domain's credibility.",
      benefit: 'Higher search rankings & credibility',
      color: 'blue',
    },
    {
      emoji: '📈',
      tag: 'Traffic Growth',
      title: 'Grow Organic Traffic With High-Authority Placements',
      description:
        'Quality backlinks from trusted sources that drive referral traffic and improve search engine rankings.',
      benefit: 'Drive targeted traffic that converts into qualified leads',
      color: 'green',
    },
    {
      emoji: '🤝',
      tag: 'Partnerships',
      title: 'Build Real Relationships With Niche-Relevant Sites',
      description:
        'Long-term partnerships with industry publications that provide ongoing value and authority building.',
      benefit: 'Sustainable growth & brand authority',
      color: 'purple',
    },
  ];

  return (
    <div className="bg-gray-50 font-sans"> {/* global font set to sans-serif */}
      {/* Hero Section */}
      <section className="text-white py-24 relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 rounded-full text-white font-semibold text-sm">
              Link Building That Works
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="block mb-2">High-Quality Backlinks.</span>
              <span className="block mb-2 text-yellow-300">Real Outreach.</span>
              <span className="block">Lasting Results.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed max-w-3xl mx-auto">
              Welcome to LynkBasket, your trusted partner for white-hat link building and strategic
              outreach services that drive SEO performance and brand authority.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative"
                >
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                    {feature.emoji}
                  </div>
                  <div className="mb-6">
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-${feature.color}-100 text-${feature.color}-800 mb-4 font-sans`}
                    >
                      {feature.tag}
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-sans">{feature.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed font-sans">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => navigateToPage('contact')}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 font-sans"
              >
                Request a Free SEO Audit
              </button>
              <button
                onClick={() => navigateToPage('services')}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 font-sans"
              >
                View Our Packages
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 rounded-full text-white font-semibold text-sm font-sans">
              What We Specialize In
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-sans">
              We Help Businesses
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative flex flex-col min-h-[420px]"
              >
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  {benefit.emoji}
                </div>

                <div className="mb-6">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-${benefit.color}-100 text-${benefit.color}-800 mb-4 font-sans`}
                  >
                    {benefit.tag}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 font-sans">{benefit.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed font-sans">{benefit.description}</p>
                </div>

                <div
                  className={`bg-gradient-to-r from-${benefit.color}-50 to-${benefit.color}-100 p-6 rounded-2xl border border-${benefit.color}-200 mt-auto font-sans`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 bg-${benefit.color}-500 rounded-full`}></div>
                    <span className={`font-semibold text-${benefit.color}-800 text-sm font-sans`}>Key Benefit</span>
                  </div>
                  <p className={`font-bold text-${benefit.color}-900 text-base leading-snug font-sans`}>
                    {benefit.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 font-sans">
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
              Whether you're an <span className="font-bold text-cyan-600">agency scaling SEO campaigns</span> or a{' '}
              <span className="font-bold text-cyan-600">startup looking for traction</span>, we provide
              scalable, transparent, and results-driven solutions.
            </p>
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-12 rounded-3xl text-white shadow-2xl max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-4xl">🚀</div>
                <h3 className="text-3xl font-bold font-sans">
                  Ready to grow with link building that actually moves the needle?
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                  onClick={() => navigateToPage('contact')}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg font-sans"
                >
                  Get Free Strategy Session
                </button>
                <button
                  onClick={() => navigateToPage('services')}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 font-sans"
                >
                  View Our Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
