import React, { useState,useRef } from 'react';
import { useApp } from '../context/AppContext';
import apiService from '../services/apiService';
import ReCAPTCHA from "react-google-recaptcha";

const ContactPage = () => {
  const { showNotification } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    website: '',
    services: [],
    budget: '$1,000 - $2,500',
    message: '',
  });

  const serviceOptions = [
    { id: 'guest-posting', label: 'Guest Post Outreach' },
    { id: 'link-insertion', label: 'Niche Edits(Link Insertion)' },
    { id: 'authority-link-building', label: 'Authority Link Building' },
    { id: 'local-link-building', label: 'Local Link Building' },
    { id: 'blogger-influencer-outreach', label: 'Blogger & Influencer Outreach' },
    { id: 'other' , label: 'Other'}
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
   const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceChange = (serviceId) => {
    setFormData(prevData => {
      const services = prevData.services.includes(serviceId)
        ? prevData.services.filter(id => id !== serviceId)
        : [...prevData.services, serviceId];
      return { ...prevData, services };
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if reCAPTCHA is verified
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      showNotification('Please complete the reCAPTCHA verification', 'error');
      return;
    }

    // Check if at least one service is selected
    if (formData.services.length === 0) {
      showNotification('Please select at least one service', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Uncomment this when backend is ready
      // await apiService.submitContactForm(formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      showNotification('Thank you for your inquiry! We will respond within 2 hours.', 'success');
      setFormData({
        fullName: '',
        email: '',
        website: '',
        services: [],
        budget: '$1,000 - $2,500',
        message: '',
      });
       // Reset reCAPTCHA
      recaptchaRef.current.reset();
    } catch (error) {
      showNotification('Failed to submit form. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 rounded-full text-white font-semibold text-sm">
            Start Building Links Today
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Let's Build Authority Together
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Whether you're looking to rank higher on Google, build brand authority, or scale your SEO
            efforts, we're here to help you succeed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-lg relative">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
              📝
            </div>
            <div className="mb-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-4">
                Free Consultation
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-8">
                Get Your Free Strategy Session
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Website URL *</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                    required
                  />
                </div>

                 <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    Services Interested In *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {serviceOptions.map((service) => (
                      <label
                        key={service.id}
                        className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-cyan-400 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service.id)}
                          onChange={() => handleServiceChange(service.id)}
                          className="w-5 h-5 text-cyan-500 rounded focus:ring-2 focus:ring-cyan-500"
                        />
                        <span className="text-gray-700 font-medium">{service.label}</span>
                      </label>
                    ))}
                  </div>
                  {formData.services.length > 0 && (
                    <p className="mt-2 text-sm text-cyan-600 font-medium">
                      {formData.services.length} service{formData.services.length > 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Monthly Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option>$1,000 - $2,500</option>
                    <option>$2,500 - $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Tell us about your goals *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                    rows="4"
                    required
                  />
                </div>

                 <div className="flex justify-center">
                  <ReCAPTCHA 
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    ref={recaptchaRef}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Free Strategy Session'}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg relative">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                📞
              </div>
              <div className="mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 mb-4">
                  Contact Info
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">Direct Contact</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg">📧</div>
                    <div>
                      <p className="font-semibold text-gray-800">Email</p>
                      <p className="text-gray-600">hello@lynkbasket.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg">📱</div>
                    <div>
                      <p className="font-semibold text-gray-800">Phone</p>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="text-lg">⏰</div>
                    <div>
                      <p className="font-semibold text-gray-800">Response Time</p>
                      <p className="text-gray-600">Within 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg relative">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                🎯
              </div>
              <div className="mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 mb-4">
                  Free Benefits
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-4">What You Get</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-green-500 font-bold text-lg">✅</span>
                    <span className="text-gray-700 font-medium">
                      Free website audit & competitor analysis
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-green-500 font-bold text-lg">✅</span>
                    <span className="text-gray-700 font-medium">
                      Custom link building strategy
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-green-500 font-bold text-lg">✅</span>
                    <span className="text-gray-700 font-medium">
                      Transparent pricing & timeline
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="text-green-500 font-bold text-lg">✅</span>
                    <span className="text-gray-700 font-medium">
                      No long-term contracts required
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-8 rounded-3xl text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">🚀</div>
                <h4 className="text-xl font-bold">Ready to Get Started?</h4>
              </div>
              <p className="mb-6 opacity-90">
                Join 500+ businesses that trust LynkBasket for their link building needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a>
                  href="mailto:hello@lynkbasket.com"
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-center hover:bg-gray-100 transition-all duration-300 shadow-lg"
                </a>
                 Email Us
                <a>
                
                  href="tel:5551234567"
                  className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-white hover:text-blue-600 transition-all duration-300"
                </a>
                  Call Now
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;