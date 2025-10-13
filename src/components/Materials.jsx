import { useState } from "react";

const Materials = () => {
  // 🎥 Splunk class video (already working)
  const videoUrl =
    "https://www.vidline.com/share/V054HB626Y/56aedaffba9fc4e85cf766da1ae95b96";

  // 📚 List of PowerPoints / PDFs
  const docs = [
    {
      id: 1,
      title: "Splunk Class October 11 Note",
      type: "slides",
      url: "https://drive.google.com/file/d/1swg7fD7Q6DEO_E8PQZTIiPCrNtikWlSK/preview",
    },
    {
      id: 2,
      title: "Splunk Class 1 SPLUNK INTRO",
      type: "slides",
      url: "https://drive.google.com/file/d/1bf5cRkcEC3yDJ5MnzpRKDpRLhRhdUH90/preview",
    },
    // {
    //   id: 3,
    //   title: "Splunk Reference Material (PDF)",
    //   type: "pdf",
    //   url: "https://drive.google.com/file/d/1ThR1ndrem7iKlfDMEYTBwSOYHQsjU5TB/preview",
    // },
  ];

  // Track the selected document
  const [selectedDoc, setSelectedDoc] = useState(docs[0]);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">📚 Splunk Learning Materials</h1>

      {/* === CLASS VIDEO === */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-3">🎬 Class Video</h2>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <iframe
            src={videoUrl}
            title="Splunk Class Video"
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* === SLIDES / DOCUMENTS === */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-3">📊 PowerPoint / PDF Viewer</h2>

        {/* Buttons for switching between materials */}
        <div className="flex flex-wrap gap-3 mb-4">
          {docs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedDoc.id === doc.id
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {doc.title}
            </button>
          ))}
        </div>

        {/* Embedded document (PowerPoint or PDF) */}
        <div className="w-full h-[600px] rounded-xl overflow-hidden border">
          <iframe
            src={selectedDoc.url}
            title={selectedDoc.title}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Optional: show share link for reference */}
        <div className="mt-3 text-sm text-gray-600">
          <span className="font-semibold">Share link:</span>{" "}
          <a
            href={selectedDoc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-words"
          >
            {selectedDoc.url}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Materials;
