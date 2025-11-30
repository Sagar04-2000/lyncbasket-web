import React, { useState } from "react";
import { useApp } from "../../context/AppContext";

const SuperAdminLoginPage = () => {
  const { loginSuperAdmin } = useApp();

  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();
    loginSuperAdmin(form.username, form.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Super Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Super Admin Username"
            className="w-full border px-4 py-2 rounded-lg"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded-lg"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg"
          >
            Login as Super Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLoginPage;
