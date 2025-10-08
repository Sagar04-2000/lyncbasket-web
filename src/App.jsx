import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';
import AdminLoginModal from './components/modals/AdminLoginModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import './styles/custom.css';

const AppContent = () => {
  const { currentPage, notification, clearNotification } = useApp();
  const [showAdminModal, setShowAdminModal] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'case-studies':
        return <CaseStudiesPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{renderPage()}</main>
      <Footer />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}

      <AdminLoginModal isOpen={showAdminModal} onClose={() => setShowAdminModal(false)} />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;