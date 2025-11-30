// src/pages/admin/ManageMedia.jsx
import React, { useRef, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useApp } from "../../context/AppContext";

const ManageMedia = () => {
  const { media, addMedia, removeMedia } = useApp();
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    for (const f of files) {
      const reader = new FileReader();

      reader.onload = () => {
        addMedia({
          name: f.name,
          size: f.size,
          type: f.type,
          url: reader.result,
        });
      };

      reader.readAsDataURL(f);

      // Small delay for smoother UI
      await new Promise((res) => setTimeout(res, 120));
    }

    setUploading(false);
  };

  return (
    <AdminLayout active="media">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Media Library</h2>
          <div>
            <input
              ref={inputRef}
              type="file"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />

            <button
              onClick={() => inputRef.current.click()}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
            >
              {uploading ? "Uploading..." : "Upload Files"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {media.length === 0 ? (
            <div className="text-gray-500">No media uploaded yet.</div>
          ) : (
            media.map((m) => (
              <div
                key={m.id}
                className="border rounded overflow-hidden relative"
              >
                {m.type?.startsWith("image/") ? (
                  <img
                    src={m.url}
                    alt={m.name}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-600">
                    {m.type || "file"}
                  </div>
                )}

                <div className="p-2 flex justify-between items-center">
                  <div className="text-sm truncate">{m.name}</div>

                  {/* 🔥 FIX: confirm() → window.confirm() */}
                  <button
                    onClick={() => {
                      if (window.confirm("Delete file?")) removeMedia(m.id);
                    }}
                    className="text-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageMedia;
