import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate, generateExcerpt } from '../utils/helpers';
import BlogEditorModal from '../components/modals/BlogEditorModal';

const BlogPage = () => {
  const { isAdmin, blogs, addBlog, updateBlog, deleteBlog, logout, navigateToPage } = useApp();
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Detect /admin or /admin/dashboard
  const path = window.location.pathname;
  const isAdminRoute = path === "/admin" || path === "/admin/dashboard";

  // -------------------------
  // CRUD Actions
  // -------------------------
  const handleCreateBlog = () => {
    setEditingBlog(null);
    setShowEditor(true);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setShowEditor(true);
  };

  const handleSaveBlog = (blogData) => {
    if (editingBlog) {
      updateBlog(editingBlog.id, blogData);
    } else {
      addBlog(blogData);
    }
    setShowEditor(false);
    setEditingBlog(null);
  };

  const handleViewBlog = (blog) => setSelectedBlog(blog);

  const handleDeleteBlog = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      deleteBlog(blogId);
      if (selectedBlog?.id === blogId) setSelectedBlog(null);
    }
  };

  // =====================================================
  // SINGLE BLOG VIEW (User reading page)
  // =====================================================
  if (selectedBlog) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <button
            onClick={() => setSelectedBlog(null)}
            className="mb-8 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            ← Back to Blogs
          </button>

          <h1 className="text-4xl font-bold mb-4">{selectedBlog.title}</h1>

          <div className="text-gray-600 mb-6">
            {formatDate(selectedBlog.createdAt)} • {selectedBlog.author}
          </div>

          {selectedBlog.image && (
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-auto rounded-lg mb-6"
            />
          )}

          {/* ⭐ Full HTML Rendering */}
          <div
            className="prose max-w-none text-gray-800 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
          ></div>

          {isAdmin && (
            <div className="flex gap-4">
              <button
                onClick={() => handleEditBlog(selectedBlog)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBlog(selectedBlog.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <BlogEditorModal
          isOpen={showEditor}
          onClose={() => {
            setShowEditor(false);
            setEditingBlog(null);
          }}
          onSave={handleSaveBlog}
          blog={editingBlog}
        />
      </section>
    );
  }

  // =====================================================
  // BLOG LIST PAGE
  // =====================================================
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Admin Login Button Only at /admin */}
        {isAdminRoute && !isAdmin && (
          <div className="flex justify-end mb-8">
            <button
              onClick={() => navigateToPage("admin-login")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Admin Login
            </button>
          </div>
        )}

        {/* Admin Panel */}
        {isAdmin && (
          <div className="mb-8 bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Admin Panel</h3>

              <div className="flex gap-4">
                <button
                  onClick={handleCreateBlog}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  + Create New Blog
                </button>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="p-8 bg-white shadow-lg rounded-2xl cursor-pointer"
              onClick={() => handleViewBlog(blog)}
            >
              <h3 className="text-xl font-bold mb-4">{blog.title}</h3>

              {/* Show only clean text preview, not HTML */}
              <p className="text-gray-600">
                {generateExcerpt(blog.content.replace(/<[^>]+>/g, ""))}
              </p>
            </div>
          ))}
        </div>
      </div>

      <BlogEditorModal
        isOpen={showEditor}
        onClose={() => {
          setShowEditor(false);
          setEditingBlog(null);
        }}
        onSave={handleSaveBlog}
        blog={editingBlog}
      />
    </section>
  );
};

export default BlogPage;
