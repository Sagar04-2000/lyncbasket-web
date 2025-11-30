import React from 'react';
import { X, Edit, Trash } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/helpers';

const BlogDetailModal = ({ isOpen, onClose, blog, onEdit, onDelete }) => {
  const { isAdmin } = useApp();

  if (!isOpen || !blog) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{blog.title}</h2>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onEdit(blog);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this blog post?")) {
                      onDelete(blog.id);
                      onClose();
                    }
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Trash className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}

            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              <X />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
          <div className="text-gray-600 mb-6 flex items-center gap-4">
            <span>📅 {formatDate(blog.createdAt)}</span>
            <span>✍️ {blog.author}</span>
          </div>

          {/* Featured Image */}
          {blog.image && (
            <div className="mb-6">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-xl"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          {/* Blog Content */}
          <div
            dangerouslySetInnerHTML={{ __html: blog.content || "<p>No content available</p>" }}
            className="blog-render-area"
          />
        </div>
      </div>

      {/* INLINE CSS FIXES FOR HEADINGS & LISTS (IMPORTANT) */}
      <style>{`
        .blog-render-area h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 16px 0 8px;
        }
        .blog-render-area h2 {
          font-size: 1.6rem;
          font-weight: 600;
          margin: 14px 0 6px;
        }
        .blog-render-area h3 {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 10px 0 4px;
        }
        .blog-render-area p { 
          margin: 10px 0;
          line-height: 1.8;
          color: #1f2937;
        }
        .blog-render-area ul, .blog-render-area ol {
          margin-left: 20px;
          padding-left: 20px;
        }
        .blog-render-area li {
          margin: 6px 0;
        }
        .blog-render-area img {
          max-width: 100%;
          border-radius: 12px;
          margin: 16px 0;
        }
        .blog-render-area iframe {
          width: 100%;
          border-radius: 10px;
          margin: 20px 0;
        }
      `}</style>
    </div>
  );
};

export default BlogDetailModal;
