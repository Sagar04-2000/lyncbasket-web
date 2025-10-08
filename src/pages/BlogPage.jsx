import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate, generateExcerpt } from '../utils/helpers';
import BlogEditorModal from '../components/modals/BlogEditorModal';
import BlogDetailModal from '../components/modals/BlogDetailModal';

const BlogPage = () => {
  const { isAdmin, blogs, addBlog, updateBlog, deleteBlog, logout } = useApp();
  const [showEditor, setShowEditor] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

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

  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
    setShowDetail(true);
  };

  const handleDeleteBlog = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      deleteBlog(blogId);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-16">
          <div className="text-center flex-1">
            <div className="inline-block mb-4 bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 rounded-full text-white font-semibold text-sm">
              Latest Insights
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Expert SEO & Link Building Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest strategies, case studies, and industry insights from our
              team of SEO experts.
            </p>
          </div>
        </div>

        {/* Admin Panel */}
        {isAdmin && (
          <div className="mb-8 bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Admin Panel</h3>
              <div className="flex gap-4">
                <button
                  onClick={handleCreateBlog}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create New Blog
                </button>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No Blogs Message */}
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No Blog Posts Yet</h3>
            <p className="text-xl text-gray-600 mb-8">
              Be the first to share insights with our community!
            </p>
            {isAdmin && (
              <button
                onClick={handleCreateBlog}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
              >
                Write First Blog Post
              </button>
            )}
          </div>
        ) : (
          /* Blog Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer relative group"
                onClick={() => handleViewBlog(blog)}
              >
                {/* Icon Badge */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  📝
                </div>

                {/* Featured Image */}
                {blog.image && (
                  <div className="mb-6 overflow-hidden rounded-xl relative">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}

                {/* Blog Content */}
                <div className="mb-6">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-4">
                    {formatDate(blog.createdAt)} • {blog.author}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {generateExcerpt(blog.content)}
                  </p>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                      <span>Read Full Article</span>
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </div>
                    {isAdmin && (
                      <div
                        className="flex gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditBlog(blog);
                          }}
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-2 rounded-lg text-sm hover:shadow-lg transition-all transform hover:scale-105"
                          title="Edit Blog"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBlog(blog.id);
                          }}
                          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-lg text-sm hover:shadow-lg transition-all transform hover:scale-105"
                          title="Delete Blog"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Blog Editor Modal */}
      <BlogEditorModal
        isOpen={showEditor}
        onClose={() => {
          setShowEditor(false);
          setEditingBlog(null);
        }}
        onSave={handleSaveBlog}
        blog={editingBlog}
      />

      {/* Blog Detail Modal */}
      <BlogDetailModal
        isOpen={showDetail}
        onClose={() => {
          setShowDetail(false);
          setSelectedBlog(null);
        }}
        blog={selectedBlog}
        onEdit={handleEditBlog}
        onDelete={deleteBlog}
      />
    </section>
  );
};

export default BlogPage;