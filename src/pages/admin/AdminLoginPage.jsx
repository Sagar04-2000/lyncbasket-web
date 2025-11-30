// src/pages/admin/AdminLoginPage.jsx
import React, { useState } from "react";
import { useApp } from "../../context/AppContext";

const AdminLoginPage = () => {
  const { loginAdmin, navigateToPage } = useApp();

  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = form.username.trim();
    const password = form.password.trim();

    // Try normal admin login (superadmin will NOT log in here)
    const logged = loginAdmin(username, password);

    if (logged) {
      navigateToPage("admin-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              required
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              className="w-full border px-4 py-2 rounded-lg"
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full border px-4 py-2 rounded-lg"
              autoComplete="current-password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
