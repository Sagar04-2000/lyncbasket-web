// src/pages/admin/SuperAdminLoginPage.jsx
import React, { useState } from "react";
import { useApp } from "../../context/AppContext";

const SuperAdminLoginPage = () => {
  const { loginSuperAdmin } = useApp();

  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();

    const username = form.username.trim();
    const password = form.password.trim();

    if (!username || !password) return;

    // This will auto-redirect if login succeeds
    loginSuperAdmin(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        
        <h2 className="text-3xl font-bold text-center mb-6">
          Super Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Username */}
          <input
            type="text"
            required
            placeholder="Super Admin Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            className="w-full border px-4 py-2 rounded-lg"
            autoComplete="username"
          />

          {/* Password */}
          <input
            type="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full border px-4 py-2 rounded-lg"
            autoComplete="current-password"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-lg font-semibold"
          >
            Login as Super Admin
          </button>
        </form>

      </div>
    </div>
  );
};

export default SuperAdminLoginPage;
