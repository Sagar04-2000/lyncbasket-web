import React from 'react';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const { navigateToPage } = useApp();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-black mb-6 bg-gradient-to-r from-cyan-500 to-amber-500 bg-clip-text text-transparent">
              LynkBasket
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Premium link building services that deliver real results through ethical,
              transparent strategies.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigateToPage('services')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Guest Post Outreach
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('services')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Niche Edit Links
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToPage('services')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Authority Building
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              {['about', 'case-studies', 'blog', 'contact'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => navigateToPage(page)}
                    className="text-gray-300 hover:text-white transition-colors capitalize"
                  >
                    {page.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <div className="text-gray-300 space-y-3">
              <p>📧 hello@lynkbasket.com</p>
              <p>📞 (555) 123-4567</p>
              <p>🕐 Response within 2 hours</p>
              <button
                onClick={() => navigateToPage('contact')}
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl mt-4 font-bold hover:shadow-lg transition-all"
              >
                Get Free Audit
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 LynkBasket. All rights reserved. | Professional Link Building Services
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;