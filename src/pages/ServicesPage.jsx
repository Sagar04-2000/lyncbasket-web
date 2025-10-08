import React from 'react';
import { useApp } from '../context/AppContext';

const ServicesPage = () => {
  const { navigateToPage } = useApp();

  const services = [
    {
      emoji: '✍️',
      tag: 'Content Marketing',
      title: '1. Guest Post Outreach',
      features: [
        'High-quality content written and placed on real websites',
        'Industry-relevant blogs with genuine traffic',
        'DoFollow contextual backlinks',
      ],
      color: 'blue',
    },
    {
      emoji: '🔗',
      tag: 'Link Insertions',
      title: '2. Niche Edits (Link Insertions)',
      features: [
        'Inserted into existing, indexed articles',
        'Fast turnaround time',
        'Natural placement with anchor text optimization',
      ],
      color: 'green',
    },
    {
      emoji: '👑',
      tag: 'High Authority',
      title: '3. Authority Link Building',
      features: [
        'DR60+ placements on real authority sites',
        'Custom outreach campaigns',
        'Ideal for improving domain rating and brand visibility',
      ],
      color: 'purple',
    },
    {
      emoji: '📍',
      tag: 'Local SEO',
      title: '4. Local Link Building',
      features: [
        'Hyperlocal outreach for small businesses',
        'Citations, local blogs, and community features',
        'Boost map pack rankings and localized SEO',
      ],
      color: 'orange',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 rounded-full text-white font-semibold text-sm">
            Our Link Building Solutions
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Tailored Outreach and Link Acquisition Services
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Whether you're looking for guest posts, niche edits, or large-scale outreach campaigns, we
            deliver fully managed, white-hat link building solutions with guaranteed placements.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative"
            >
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                {service.emoji}
              </div>
              <div className="mb-6">
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-${service.color}-100 text-${service.color}-800 mb-4`}
                >
                  {service.tag}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <span className="text-green-500 font-bold">✅</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg mb-16 relative">
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
            🌟
          </div>
          <div className="mb-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800 mb-4">
              Influencer Marketing
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              5. Blogger & Influencer Outreach
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Build links and brand buzz through strategic partnerships with niche influencers and
              content creators who align with your brand values.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-yellow-50 p-10 rounded-2xl mb-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Reporting Included</h3>
            <p className="text-lg text-gray-700 mb-6">
              We provide monthly reports with live links, DA/DR, traffic stats, and anchor text
              distribution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigateToPage('contact')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Get Pricing
              </button>
              <button
                onClick={() => navigateToPage('case-studies')}
                className="border-2 border-cyan-600 text-cyan-600 px-8 py-3 rounded-xl font-bold hover:bg-cyan-600 hover:text-white transition-all duration-300"
              >
                See Sample Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;