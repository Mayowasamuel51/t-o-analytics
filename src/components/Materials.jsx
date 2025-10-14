import { useState } from "react";

const Materials = () => {
  // 🎥 List of Splunk videos
  const videos = [
    {
      id: 1,
      title: "Orientation",
      url: "https://player.vimeo.com/video/1126909883?badge=0&autopause=0&player_id=0&app_id=58479",
    },
    {
      id: 2,
      title: "Splunk Class October 11th",
      url: "https://player.vimeo.com/video/1127004938?badge=0&autopause=0&player_id=0&app_id=58479",
    }
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

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [selectedDoc, setSelectedDoc] = useState(docs[0]);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        📚 Splunk Learning Materials
      </h1>

      {/* === VIDEO SECTION === */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">🎬 Class Videos</h2>

        {/* Main video player */}
        {/* <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
          <iframe
            src={selectedVideo.url}
            title={selectedVideo.title}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div> */}

        {/* Flex-style video list (like Udemy) */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
  {videos.map((video) => (
    <div
      key={video.id}
      onClick={() => setSelectedVideo(video)}
      className={`cursor-pointer rounded-2xl border transition-all hover:scale-[1.03] hover:shadow-lg overflow-hidden bg-white ${
        selectedVideo.id === video.id ? "border-blue-500 shadow-md" : "border-gray-200"
      }`}
    >
      {/* Video thumbnail preview */}
      <div className="aspect-video bg-black">
        <iframe
          src={`${video.url}&muted=1`}
          title={video.title}
          className="w-full h-full pointer-events-none rounded-t-2xl"
          frameBorder="0"
          allow="autoplay; fullscreen"
        ></iframe>
      </div>

      {/* Video title bar */}
      <div className="p-4 bg-gray-50 text-sm font-semibold text-gray-800 text-center">
        {video.title}
      </div>
    </div>
  ))}
</div>

      </div>

      {/* === DOCUMENT SECTION === */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-3">📊 PowerPoint / PDF Viewer</h2>

        <div className="flex flex-wrap gap-3 mb-4">
          {docs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedDoc.id === doc.id
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {doc.title}
            </button>
          ))}
        </div>

        <div className="w-full h-[600px] rounded-xl overflow-hidden border">
          <iframe
            src={selectedDoc.url}
            title={selectedDoc.title}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Materials;
