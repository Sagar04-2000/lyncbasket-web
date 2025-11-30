// src/pages/admin/AdminDashboard.jsx
import React, { useMemo } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useApp } from "../../context/AppContext";

const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-2xl shadow flex flex-col">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-bold mt-1">{value}</div>
    {subtitle && <div className="text-xs text-gray-400 mt-2">{subtitle}</div>}
  </div>
);

const AdminDashboard = () => {
  const { blogs, media, admins } = useApp();

  const totals = useMemo(() => {
    const totalBlogs = blogs?.length || 0;
    const totalMedia = media?.length || 0;
    const totalAdmins = admins?.length || 0;
    const recentBlogs = (blogs || []).slice(0, 5);
    return { totalBlogs, totalMedia, totalAdmins, recentBlogs };
  }, [blogs, media, admins]);

  return (
    <AdminLayout active="dashboard">
      <div>
        <h2 className="text-2xl font-bold mb-4">Overview</h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatCard title="Total Blogs" value={totals.totalBlogs} subtitle="Published posts" />
          <StatCard title="Media Library" value={totals.totalMedia} subtitle="Uploaded files" />
          <StatCard title="Admins" value={totals.totalAdmins} subtitle="Super + Normal" />
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 border rounded-xl">
            <h3 className="font-semibold mb-3">Recent Blogs</h3>
            {totals.recentBlogs.length === 0 ? (
              <div className="text-gray-500">No recent blogs.</div>
            ) : (
              <ul className="space-y-3">
                {totals.recentBlogs.map((b) => (
                  <li key={b.id} className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="font-medium">{b.title}</div>
                      <div className="text-sm text-gray-500">{new Date(b.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-gray-400">{b.author}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 border rounded-xl">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg" onClick={() => window.history.pushState({}, "", "/admin/blogs") || null}>
                Create Blog
              </button>
              <button className="px-4 py-2 border rounded-lg" onClick={() => window.history.pushState({}, "", "/admin/media") || null}>
                Open Media Library
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
