// src/components/admin/AdminLayout.jsx
import React from "react";
import { useApp } from "../../context/AppContext";

const NavItem = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
      active ? "bg-cyan-600 text-white" : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    {label}
  </button>
);

const AdminLayout = ({ children, active }) => {
  const { navigateToPage, currentAdmin, logout } = useApp();
  const isSuper = currentAdmin?.role === "super";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-12 gap-8">
        
        {/* SIDEBAR */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <div className="bg-white p-4 rounded-2xl shadow">
            
            {/* HEADER */}
            <div className="mb-6">
              <h3 className="text-xl font-bold">Admin Panel</h3>
              <p className="text-sm text-gray-500">
                Signed in as <b>{currentAdmin?.username}</b>
              </p>
            </div>

            {/* NAVIGATION */}
            <div className="flex flex-col gap-2">

              <NavItem
                label="Overview"
                active={active === "dashboard"}
                onClick={() => navigateToPage("admin-dashboard")}
              />

              <NavItem
                label="Blogs"
                active={active === "blogs"}
                onClick={() => navigateToPage("admin-blogs")}
              />

              <NavItem
                label="Media Library"
                active={active === "media"}
                onClick={() => navigateToPage("admin-media")}
              />

              {/* SUPER ADMIN ONLY */}
              {isSuper && (
                <NavItem
                  label="Manage Admins"
                  active={active === "admins"}
                  onClick={() => navigateToPage("admin-manage")}
                />
              )}
            </div>

            {/* LOGOUT */}
            <div className="mt-6 pt-4 border-t">
              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>

          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="bg-white rounded-2xl p-6 shadow min-h-[70vh]">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
