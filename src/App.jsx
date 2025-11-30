import React, { useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Notification from "./components/Notification";

// Public Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";

// Admin Login Pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import SuperAdminLoginPage from "./pages/superadmin/SuperAdminLoginPage";

// Admin Panel Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageAdmins from "./pages/admin/ManageAdmins";
import ManageBlogs from "./pages/admin/ManageBlogs";
import ManageMedia from "./pages/admin/ManageMedia";

import "./styles/custom.css";

const AppContent = () => {
  const { currentPage, navigateToPage, isAdmin, currentAdmin, notification, clearNotification } = useApp();

  // Initial page load
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();

    const map = {
      "/": "home",
      "/about": "about",
      "/services": "services",
      "/case-studies": "case-studies",
      "/blog": "blog",
      "/contact": "contact",

      "/admin": "admin-login",
      "/admin/login": "admin-login",

      "/superadmin": "superadmin-login",
      "/superadmin/login": "superadmin-login",

      "/admin/dashboard": "admin-dashboard",
      "/admin/admins": "admin-manage",
      "/admin/blogs": "admin-blogs",
      "/admin/media": "admin-media",
    };

    navigateToPage(map[path] || "home");
  }, [navigateToPage]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const map = {
      "/": "home",
      "/about": "about",
      "/services": "services",
      "/case-studies": "case-studies",
      "/blog": "blog",
      "/contact": "contact",

      "/admin": "admin-login",
      "/admin/login": "admin-login",

      "/superadmin": "superadmin-login",
      "/superadmin/login": "superadmin-login",

      "/admin/dashboard": "admin-dashboard",
      "/admin/admins": "admin-manage",
      "/admin/blogs": "admin-blogs",
      "/admin/media": "admin-media",
    };

    const handler = () => {
      const path = window.location.pathname.toLowerCase();
      const page = map[path] || "home";
      navigateToPage(page);
    };

    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [navigateToPage]);

  // Routing System
  const renderPage = () => {
    switch (currentPage) {
      // Public pages
      case "home": return <HomePage />;
      case "about": return <AboutPage />;
      case "services": return <ServicesPage />;
      case "case-studies": return <CaseStudiesPage />;
      case "blog": return <BlogPage />;
      case "contact": return <ContactPage />;

      // Login pages
      case "admin-login": return <AdminLoginPage />;
      case "superadmin-login": return <SuperAdminLoginPage />;

      // Admin Panel
      case "admin-dashboard":
        return isAdmin ? <AdminDashboard /> : <AdminLoginPage />;

      case "admin-manage":
        return isAdmin && currentAdmin?.role === "super"
          ? <ManageAdmins />
          : <AdminLoginPage />;

      case "admin-blogs":
        return isAdmin ? <ManageBlogs /> : <AdminLoginPage />;

      case "admin-media":
        return isAdmin ? <ManageMedia /> : <AdminLoginPage />;

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
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
