import React from 'react';
import { useApp } from '../context/AppContext';

const AboutPage = () => {
  const { navigateToPage } = useApp();

  const principles = [
    {
      icon: '🔍',
      title: 'Transparency',
      description: 'No hidden PBNs or shady tactics',
    },
    {
      icon: '🎯',
      title: 'Relevance',
      description: 'Real placements on niche-relevant sites',
    },
    {
      icon: '💎',
      title: 'Quality',
      description: 'Every backlink is vetted for DA, traffic, and trust',
    },
    {
      icon: '🤝',
      title: 'Relationships',
      description: 'We build partnerships, not just links',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 rounded-full text-white font-semibold text-sm">
            Outreach, Evolved
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            We Build Links That Build Businesses
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            LynkBasket was created to fix what's broken in the link building industry: low-quality
            backlinks, spammy practices, and lack of transparency. We do things differently.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
              📖
            </div>
            <div className="mb-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-4">
                Our Journey
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Story</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                With a team of outreach specialists, content marketers, and SEO strategists, we've
                helped clients improve search rankings through ethical, ROI-focused link acquisition.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-bold text-blue-800">Our Mission</span>
              </div>
              <p className="font-bold text-blue-900">
                To help brands grow their online presence through strategic, white-hat outreach and
                link building.
              </p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
              ⚙️
            </div>
            <div className="mb-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 mb-4">
                Our Foundation
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Process is Built On:</h3>
              <div className="space-y-4">
                {principles.map((principle, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="text-xl">{principle.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">{principle.title}</h4>
                      <p className="text-gray-600 text-sm">{principle.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-50 to-yellow-50 p-10 rounded-2xl max-w-3xl mx-auto">
            <p className="text-2xl font-bold text-gray-900 mb-6">
              👉 Let's talk about building your authority the right way.
            </p>
            <button
              onClick={() => navigateToPage('contact')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
            >
              Book a Strategy Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;