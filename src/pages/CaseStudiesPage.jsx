import React from 'react';
import { useApp } from '../context/AppContext';

const CaseStudiesPage = () => {
  const { navigateToPage, showNotification } = useApp();

  const caseStudies = [
    {
      emoji: '🚀',
      tag: 'SaaS Industry',
      title: '+300% Organic Traffic in 6 Months',
      description:
        'We secured over 80 high-quality backlinks (DR50+), helping a B2B SaaS client rank top 3 for multiple commercial keywords.',
      result: 'From 2,000 to 8,000 organic monthly visitors',
      color: 'blue',
    },
    {
      emoji: '🛍️',
      tag: 'E-commerce',
      title: 'DR20 to DR52 Domain Growth',
      description:
        'Implemented a custom link building and content outreach strategy. Targeted blogs in the home & lifestyle niche.',
      result: '150% increase in backlinks, 70% revenue boost',
      color: 'orange',
    },
    {
      emoji: '🎓',
      tag: 'EdTech',
      title: 'National Media Links',
      description:
        'Helped an education startup land placements on national-level publications (e.g., USA Today, EdSurge) via HARO and content partnerships.',
      result: 'DR jumped 30+ points in 4 months',
      color: 'purple',
    },
  ];

  const testimonials = [
    {
      initial: 'M',
      name: 'SEO Manager',
      company: 'Digital Agency',
      quote:
        "Their guest posts are top-notch – relevant, well-written, and from real sites. The quality of backlinks we received exceeded our expectations.",
      color: 'blue',
    },
    {
      initial: 'F',
      name: 'Founder',
      company: 'eCommerce Brand',
      quote:
        "Finally found a link building company that doesn't cut corners. Real outreach, real results. Our organic traffic has never been better.",
      color: 'green',
    },
  ];

  const downloadCaseStudies = () => {
    const caseStudyData = `
LynkBasket - Case Studies Pack
=============================

CASE STUDY 1: SaaS Brand
Result: +300% Organic Traffic
Timeframe: 6 Months
Details: Secured 80+ high-quality backlinks (DR50+)
From 2,000 to 8,000 organic monthly visitors
-------------------

CASE STUDY 2: E-commerce Store
Result: DR20 to DR52
Timeframe: 4 Months
Details: 150% increase in backlinks, 70% revenue boost
-------------------

CASE STUDY 3: EdTech Startup
Result: National Media Links
Timeframe: 4 Months
Details: DR jumped 30+ points with USA Today, EdSurge placements
-------------------

Contact us for detailed metrics and strategies:
Email: hello@lynkbasket.com
Phone: (555) 123-4567
    `.trim();

    const blob = new Blob([caseStudyData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LynkBasket-Case-Studies.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    showNotification('Case study pack downloaded successfully!', 'success');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 rounded-full text-white font-semibold text-sm">
            Proven SEO Wins
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Don't Just Take Our Word For It
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real clients. See how our strategic link building campaigns have
            transformed businesses across different industries.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative"
            >
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                {study.emoji}
              </div>
              <div className="mb-6">
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-${study.color}-100 text-${study.color}-800 mb-4`}
                >
                  {study.tag}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{study.title}</h3>
                <p className="text-gray-600 leading-relaxed">{study.description}</p>
              </div>
              <div
                className={`bg-gradient-to-r from-${study.color}-50 to-${study.color}-100 p-6 rounded-2xl border border-${study.color}-200`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 bg-${study.color}-500 rounded-full`}></div>
                  <span className={`font-bold text-${study.color}-800`}>Key Result</span>
                </div>
                <p className={`font-bold text-${study.color}-900 text-lg`}>{study.result}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Hear directly from businesses we've helped grow</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br from-${testimonial.color}-500 to-${testimonial.color}-600 rounded-full flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {testimonial.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 text-lg leading-relaxed italic mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-12 rounded-3xl text-white shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">👉 Want to see more results?</h3>
              <p className="text-xl mb-8 opacity-90">
                Download our comprehensive case study pack with detailed metrics, strategies, and ROI
                breakdowns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={downloadCaseStudies}
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Download Case Study Pack
                </button>
                <button
                  onClick={() => navigateToPage('contact')}
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  Schedule Strategy Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesPage;