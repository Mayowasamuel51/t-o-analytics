import { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

const Materials = () => {
  // 🎥 Splunk class video
  const videoUrl =
    "https://player.vimeo.com/video/1126909883?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479";

  // Thumbnail image (you can replace this with your own)
  const thumbnail =
    "https://img.freepik.com/free-vector/online-video-concept-illustration_114360-4685.jpg?t=st=1728854400~exp=1729459200~hmac=8b54d6f30b83fbc622b0e446ac5e94f89452a3ef11f9a3dd25c22fa8918c659b&w=1380";

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
      title: "Splunk Class 1 - SPLUNK INTRO",
      type: "slides",
      url: "https://drive.google.com/file/d/1bf5cRkcEC3yDJ5MnzpRKDpRLhRhdUH90/preview",
    },
  ];

  // Track the selected document
  const [selectedDoc, setSelectedDoc] = useState(docs[0]);
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        📚 Splunk Learning Materials
      </h1>

      {/* === CLASS VIDEO === */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-3">🎬 Class Video</h2>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          {!playVideo ? (
            <div
              className="relative w-full h-full cursor-pointer group"
              onClick={() => setPlayVideo(true)}
            >
              <img
                src={thumbnail}
                alt="Video Thumbnail"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity group-hover:bg-opacity-60">
                <FaPlayCircle className="text-white text-6xl opacity-90 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          ) : (
            <iframe
              src={`${videoUrl}?autoplay=1`}
              title="Splunk Class Video"
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          )}
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

        {/* Optional: show share link */}
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
