// src/pages/admin/ManageAdmins.jsx
import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useApp } from "../../context/AppContext";

const ManageAdmins = () => {
  const { admins, addAdmin, removeAdmin, currentAdmin } = useApp();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "admin", // force only admin creation
  });

  const [confirmData, setConfirmData] = useState(null);

  const isSuper = currentAdmin?.role === "super";

  const handleAdd = (e) => {
    e.preventDefault();

    if (!isSuper) return alert("Only super admin can add admins.");
    if (!form.username.trim() || !form.password.trim())
      return alert("Please fill all fields.");

    // ❗ Prevent creating OR overriding the superadmin
    if (form.username.trim().toLowerCase() === "superadmin") {
      alert("Super admin account cannot be created or modified.");
      return;
    }

    // Prevent duplicate usernames
    if (admins.some((a) => a.username === form.username.trim())) {
      alert("Username already exists!");
      return;
    }

    // Always create ONLY normal admins
    addAdmin(form.username.trim(), form.password.trim(), "admin");

    // reset
    setForm({ username: "", password: "", role: "admin" });
  };

  const requestDelete = (username) => {
    if (!isSuper) return alert("Only super admin can delete admins.");
    setConfirmData({ username });
  };

  const handleConfirmDelete = () => {
    removeAdmin(confirmData.username);
    setConfirmData(null);
  };

  return (
    <AdminLayout active="admins">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Manage Admins</h2>

        {!isSuper && (
          <div className="mt-2 text-sm text-yellow-700">
            You are NOT a Super Admin — access is limited.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Existing Admins */}
        <div className="p-5 border rounded-xl bg-white shadow">
          <h3 className="font-semibold text-lg mb-3">Existing Admins</h3>

          <ul className="space-y-3">
            {admins.map((admin) => (
              <li
                key={admin.username}
                className="flex justify-between items-center p-3 border rounded-lg"
              >
                <div>
                  <div className="font-semibold">{admin.username}</div>
                  <div className="text-sm text-gray-500">{admin.role}</div>
                </div>

                {/* ❗ YOU CANNOT DELETE THE FIXED SUPERADMIN */}
                {isSuper && admin.role !== "super" && (
                  <button
                    onClick={() => requestDelete(admin.username)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Create Admin */}
        <div className="p-5 border rounded-xl bg-white shadow">
          <h3 className="font-semibold text-lg mb-3">Create Admin (Super Only)</h3>

          <form onSubmit={handleAdd} className="space-y-4">
            
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Username"
              autoComplete="new-username"
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Password"
              autoComplete="new-password"
              className="w-full border px-3 py-2 rounded-lg"
            />

            {/* ❗ REMOVED Super Admin from dropdown */}
            <select
              disabled
              className="w-full border px-3 py-2 rounded-lg opacity-50 cursor-not-allowed"
            >
              <option value="admin">Admin</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg w-full"
            >
              Create Admin
            </button>
          </form>
        </div>

      </div>

      {/* Confirm Delete Popup */}
      {confirmData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
            <p className="text-lg font-medium mb-4">
              Delete admin "{confirmData.username}"?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>

              <button
                onClick={() => setConfirmData(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

export default ManageAdmins;
