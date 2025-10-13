
import { useState } from "react";

const Materials = () => {
  // 🎥 List of Splunk videos
  const videos = [
    {
      id: 1,
      title: "Orientation",
      url: "https://player.vimeo.com/video/1126909883?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
    },
    {
      id: 2,
      title: "Splunk Class October 11th",
      url: "https://player.vimeo.com/video/1127004938?badge=0&autopause=0&player_id=0&app_id=58479",
    }
    // {
    //   id: 3,
    //   title: "Splunk Class 2 - Dashboards & Reports",
    //   url: "https://player.vimeo.com/video/1127030000?badge=0&autopause=0&player_id=0&app_id=58479", // example link
    // },
  ];

  // 📚 PowerPoints / PDFs
  const docs = [
    {
      id: 1,
      title: "Splunk Class October 11 Note",
      url: "https://drive.google.com/file/d/1swg7fD7Q6DEO_E8PQZTIiPCrNtikWlSK/preview",
    },
    {
      id: 2,
      title: "Splunk Class 1 - SPLUNK INTRO",
      url: "https://drive.google.com/file/d/1bf5cRkcEC3yDJ5MnzpRKDpRLhRhdUH90/preview",
    },
  ];

  // Track selections
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [selectedDoc, setSelectedDoc] = useState(docs[0]);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        📚 Splunk Learning Materials
      </h1>

      {/* === CLASS VIDEO SECTION === */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
          <h2 className="text-lg font-semibold mb-2 md:mb-0">🎬 Class Videos</h2>

          {/* Video dropdown selector */}
          <select
            value={selectedVideo.id}
            onChange={(e) =>
              setSelectedVideo(
                videos.find((v) => v.id === Number(e.target.value))
              )
            }
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            {videos.map((video) => (
              <option key={video.id} value={video.id}>
                {video.title}
              </option>
            ))}
          </select>
        </div>

        {/* Embedded selected video */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <iframe
            src={selectedVideo.url}
            title={selectedVideo.title}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
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

        {/* Optional: share link */}
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
