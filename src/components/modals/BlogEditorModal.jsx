import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const BlogEditorModal = ({ isOpen, onClose, onSave, blog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setAuthor(blog.author);
      setImage(blog.image || '');
      if (editorRef.current) {
        editorRef.current.innerHTML = blog.content;
      }
    } else {
      setTitle('');
      setAuthor('');
      setImage('');
      if (editorRef.current) {
        editorRef.current.innerHTML = '<p>Start writing your blog content here...</p>';
      }
    }
  }, [blog, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = editorRef.current.innerHTML;
    const textContent = editorRef.current.textContent.trim();

    if (!title.trim()) {
      alert('Please enter a blog title!');
      return;
    }
    if (!author.trim()) {
      alert('Please enter the author name!');
      return;
    }
    if (!textContent || textContent === 'Start writing your blog content here...') {
      alert('Please add some content to your blog post!');
      return;
    }

    onSave({ title, author, image, content });
    onClose();
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            <X />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Blog Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Author Name *</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Featured Image URL</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Blog Content *</label>
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 p-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => execCommand('bold')}
                    className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    onClick={() => execCommand('italic')}
                    className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    onClick={() => execCommand('underline')}
                    className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Underline"
                  >
                    <u>U</u>
                  </button>
                  <div className="border-l border-gray-300 mx-2"></div>
                  <button
                    type="button"
                    onClick={() => execCommand('formatBlock', 'h2')}
                    className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Heading 2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => execCommand('formatBlock', 'h3')}
                    className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Heading 3"
                  >
                    H3
                  </button>
                  <div className="border-l border-gray-300 mx-2"></div>
                  <button
                    type="button"
                    onClick={() => execCommand('insertUnorderedList')}
                    className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Bullet List"
                  >
                    •
                  </button>
                  <button
                    type="button"
                    onClick={() => execCommand('insertOrderedList')}
                    className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Numbered List"
                  >
                    1.
                  </button>
                </div>

                <div
                  ref={editorRef}
                  contentEditable
                  className="min-h-[400px] max-h-[400px] overflow-y-auto p-4 focus:outline-none prose max-w-none"
                  style={{ lineHeight: '1.8' }}
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                {blog ? 'Update Blog Post' : 'Publish Blog Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogEditorModal;