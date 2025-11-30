import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const ToolbarButton = ({ active, title, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`px-3 py-2 rounded border ${
      active ? "bg-cyan-100 border-cyan-300" : "bg-white border-gray-300"
    } hover:brightness-95 transition-all`}
  >
    {children}
  </button>
);

const BlogEditorModal = ({ isOpen, onClose, onSave, blog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const editorRef = useRef(null);

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    heading: null,
    align: null,
  });

  // ---------------------------
  // Initialize editor
  // ---------------------------
  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setAuthor(blog.author || "");
      setImage(blog.image || "");
      if (editorRef.current) editorRef.current.innerHTML = blog.content || "";
    } else {
      setTitle("");
      setAuthor("");
      setImage("");
      if (editorRef.current)
        editorRef.current.innerHTML =
          "<p>Start writing your blog content here...</p>";
    }

    setActiveFormats({
      bold: false,
      italic: false,
      underline: false,
      heading: null,
      align: null,
    });
  }, [blog, isOpen]);

  const findBlockParent = (node) => {
    while (node && node !== editorRef.current) {
      if (node.nodeType === 1) {
        const tag = node.tagName.toUpperCase();
        if (["H1", "H2", "H3", "P", "DIV"].includes(tag)) {
          return { node, tag };
        }
      }
      node = node.parentNode;
    }
    return null;
  };

  const updateActiveFormats = () => {
    if (!editorRef.current) return;
    try {
      const sel = document.getSelection();
      const anchorNode = sel?.anchorNode;
      if (!anchorNode || !editorRef.current.contains(anchorNode)) {
        setActiveFormats({
          bold: false,
          italic: false,
          underline: false,
          heading: null,
          align: null,
        });
        return;
      }

      const bold = document.queryCommandState("bold");
      const italic = document.queryCommandState("italic");
      const underline = document.queryCommandState("underline");

      const found = findBlockParent(anchorNode);
      let heading = null;
      let align = null;
      if (found) {
        if (found.tag.startsWith("H")) heading = found.tag;
        const computed = window.getComputedStyle(found.node);
        const textAlign = computed.textAlign;
        if (["left", "center", "right"].includes(textAlign)) align = textAlign;
      }

      setActiveFormats({
        bold,
        italic,
        underline,
        heading,
        align,
      });
    } catch {}
  };

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () =>
      document.removeEventListener("selectionchange", updateActiveFormats);
  }, []);

  const execCommand = (command, value = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    if (command === "formatBlock" && value) {
      try {
        document.execCommand("formatBlock", false, `<${value.toLowerCase()}>`);
      } catch {
        document.execCommand("formatBlock", false, value);
      }
    } else {
      document.execCommand(command, false, value);
    }

    setTimeout(updateActiveFormats, 0);
  };

  // ---------------------------
  // Insert Link
  // ---------------------------
  const insertLink = () => {
    const url = prompt("Enter the URL (include https://):", "https://");
    if (url) execCommand("createLink", url);
  };

  // ---------------------------
  // Upload File (Local System)
  // ---------------------------
  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;

      // Insert Image
      if (file.type.startsWith("image/")) {
        const html = `<img src="${base64}" style="max-width:100%; margin:20px 0;" />`;
        document.execCommand("insertHTML", false, html);
      }

      // Insert Video
      else if (file.type.startsWith("video/")) {
        const html = `
          <video controls style="max-width:100%; margin:20px 0;">
            <source src="${base64}" type="${file.type}" />
          </video>
        `;
        document.execCommand("insertHTML", false, html);
      }

      // Insert ANY OTHER FILE
      else {
        const html = `
          <a href="${base64}" download="${file.name}" 
             style="color:blue; text-decoration:underline; margin:20px 0; display:block;">
             📄 Download ${file.name}
          </a>
        `;
        document.execCommand("insertHTML", false, html);
      }
    };

    reader.readAsDataURL(file);
  };

  // ---------------------------
  // Insert VIDEO from URL
  // ---------------------------
  const insertVideoURL = () => {
    let url = prompt("Enter YouTube or video URL:");
    if (!url) return;

    let embedURL = url;

    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1];
      embedURL = `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1];
      embedURL = `https://www.youtube.com/embed/${id}`;
    }

    const iframe = `
      <div style="margin: 20px 0;">
        <iframe 
          width="560" height="315"
          src="${embedURL}"
          frameborder="0" allowfullscreen>
        </iframe>
      </div>
    `;

    editorRef.current.focus();
    document.execCommand("insertHTML", false, iframe);
  };

  // ---------------------------
  // Submit Form
  // ---------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const content = editorRef.current?.innerHTML || "";
    const textContent = editorRef.current?.textContent?.trim() || "";

    if (!title.trim()) return alert("Please enter a blog title!");
    if (!author.trim()) return alert("Please enter the author name!");
    if (!textContent || textContent === "Start writing your blog content here...")
      return alert("Please add some content!");

    onSave({ title, author, image, content });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {blog ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={28} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title + Author */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold">Blog Title *</label>
                <input
                  className="w-full border px-4 py-3 rounded-xl"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="font-semibold">Author *</label>
                <input
                  className="w-full border px-4 py-3 rounded-xl"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="font-semibold">Featured Image URL</label>
              <input
                className="w-full border px-4 py-3 rounded-xl"
                placeholder="https://example.com/image.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {/* Editor */}
            <div>
              <label className="font-semibold">Blog Content *</label>

              <div className="border rounded-xl overflow-hidden">
                {/* Toolbar */}
                <div className="bg-gray-50 border-b p-3 flex flex-wrap gap-2 items-center">
                  <ToolbarButton
                    active={activeFormats.bold}
                    onClick={() => execCommand("bold")}
                  >
                    <b>B</b>
                  </ToolbarButton>

                  <ToolbarButton
                    active={activeFormats.italic}
                    onClick={() => execCommand("italic")}
                  >
                    <em>I</em>
                  </ToolbarButton>

                  <ToolbarButton
                    active={activeFormats.underline}
                    onClick={() => execCommand("underline")}
                  >
                    <u>U</u>
                  </ToolbarButton>

                  <div className="border-l h-6 mx-2" />

                  {/* Headings */}
                  <ToolbarButton
                    active={activeFormats.heading === "H1"}
                    onClick={() => execCommand("formatBlock", "H1")}
                  >
                    H1
                  </ToolbarButton>
                  <ToolbarButton
                    active={activeFormats.heading === "H2"}
                    onClick={() => execCommand("formatBlock", "H2")}
                  >
                    H2
                  </ToolbarButton>
                  <ToolbarButton
                    active={activeFormats.heading === "H3"}
                    onClick={() => execCommand("formatBlock", "H3")}
                  >
                    H3
                  </ToolbarButton>

                  <div className="border-l h-6 mx-2" />

                  {/* ⭐ Upload Button */}
                  <input
                    type="file"
                    id="uploadInput"
                    className="hidden"
                    onChange={uploadFile}
                  />

                  <ToolbarButton
                    title="Upload File"
                    onClick={() => document.getElementById("uploadInput").click()}
                  >
                    📤
                  </ToolbarButton>

                  {/* Insert Video via URL */}
                  <ToolbarButton
                    title="Insert Video URL"
                    onClick={insertVideoURL}
                  >
                    🎥
                  </ToolbarButton>

                  <div className="border-l h-6 mx-2" />

                  <ToolbarButton onClick={insertLink}>🔗</ToolbarButton>

                  <div className="border-l h-6 mx-2" />

                  <ToolbarButton onClick={() => execCommand("justifyLeft")}>
                    ⟵
                  </ToolbarButton>
                  <ToolbarButton onClick={() => execCommand("justifyCenter")}>
                    ↔
                  </ToolbarButton>
                  <ToolbarButton onClick={() => execCommand("justifyRight")}>
                    ⟶
                  </ToolbarButton>

                  <div className="border-l h-6 mx-2" />

                  <ToolbarButton onClick={() => execCommand("undo")}>
                    ↶
                  </ToolbarButton>
                  <ToolbarButton onClick={() => execCommand("redo")}>
                    ↷
                  </ToolbarButton>
                </div>

                {/* Content Area */}
                <div
                  ref={editorRef}
                  contentEditable
                  className="min-h-[400px] max-h-[400px] overflow-y-auto p-4 focus:outline-none prose max-w-none"
                  style={{ lineHeight: 1.8 }}
                  onInput={updateActiveFormats}
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border rounded-xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-xl"
              >
                {blog ? "Update Blog Post" : "Publish Blog Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogEditorModal;
