// src/pages/admin/ManageBlogs.jsx
import React, { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useApp } from "../../context/AppContext";
import BlogEditorModal from "../../components/modals/BlogEditorModal";

const ManageBlogs = () => {
  const { blogs, addBlog, updateBlog, deleteBlog } = useApp();
  const [showEditor, setShowEditor] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleCreate = () => {
    setEditing(null);
    setShowEditor(true);
  };

  const handleEdit = (b) => {
    setEditing(b);
    setShowEditor(true);
  };

  const handleSave = (data) => {
    if (editing) updateBlog(editing.id, data);
    else addBlog(data);

    setShowEditor(false);
    setEditing(null);
  };

  return (
    <AdminLayout active="blogs">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Manage Blogs</h2>

          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
          >
            + New Blog
          </button>
        </div>

        <div className="space-y-3">
          {blogs.length === 0 ? (
            <div className="text-gray-500">No blogs yet.</div>
          ) : (
            blogs.map((b) => (
              <div
                key={b.id}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-gray-500">
                    {b.author} • {new Date(b.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handleEdit(b)}
                    className="px-3 py-1 bg-yellow-400 rounded"
                  >
                    Edit
                  </button>

                  {/* 🔥 FIX: confirm() → window.confirm() (ESLint safe) */}
                  <button
                    onClick={() => {
                      if (window.confirm("Delete this blog?")) deleteBlog(b.id);
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BlogEditorModal
        isOpen={showEditor}
        onClose={() => {
          setShowEditor(false);
          setEditing(null);
        }}
        onSave={handleSave}
        blog={editing}
      />
    </AdminLayout>
  );
};

export default ManageBlogs;
