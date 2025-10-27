import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Materials = () => {
  const allowedEmails = [
    "adenusitimi@gmail.com",
     "oluwaferanmiolulana@gmail.com",
    "Oluwaferanmi.olulana@gmail.com",
    "tomideolulana@gmail.com",
    "randommayowa@gmail.com",
    "yinkalola51@gmail.com",
    "toanalyticsllc@gmail.com",
    "kevwe_oberiko@yahoo.com",
    "denisgsam@gmail.com",
    "oluwaferanmi.olulana@gmail.com",
    "fpasamuelmayowa51@gmail.com",
    "oluwatiroyeamoye@gmail.com",
    "trbanjo@gmail.com",
    "emanfrimpong@gmail.com",
    "dipeoluolatunji@gmail.com",
    "lybertyudochuu@gmail.com",
  ];

  const [userEmail, setUserEmail] = useState("");
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("user");
    setUserEmail(email);
    if (email) {
      const normalized = email.toLowerCase();
      const allowed = allowedEmails.map((e) => e.toLowerCase());
      setIsAllowed(allowed.includes(normalized));
    }
  }, []);

  const videos = [
    {
      id: 1,
      title: "To-analytics Orientation",
      url: "https://player.vimeo.com/video/1126909883?badge=0&autopause=0&player_id=0&app_id=58479",
    },
    {
      id: 2,
      title: "To-analytics Splunk Class 1",
      url: "https://player.vimeo.com/video/1127004938?badge=0&autopause=0&player_id=0&app_id=58479",
    },
  ];

  const docs = [
    {
      id: 1,
      title: "To-analytics Splunk Class 1 Intro",
      url: "https://drive.google.com/file/d/1bf5cRkcEC3yDJ5MnzpRKDpRLhRhdUH90/preview",
    },
    {
      id: 2,
      title: "To-analytics Splunk Class 1 Note",
      url: "https://drive.google.com/file/d/1VYiqPwen5Dc1tV2x8_ohR55n6toGBm1G/preview",
    },

    {
      id:3, 
      title:"To-analytics Splunk Class 2",
      url:"https://drive.google.com/file/d/1V3zqvISvQLDZlQKUryIna4xnmAzcNRSC/preview"
    }
  ];

  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [selectedDoc, setSelectedDoc] = useState(docs[0]);

  if (!isAllowed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Access Denied 🚫
        </h1>
        <p className="text-gray-700">
          This page is restricted to authorized To-Analytics members only.
        </p>
        {userEmail ? (
          <p className="mt-3 text-sm text-gray-500">Your email: {userEmail}</p>
        ) : (
          <p className="mt-3 text-sm text-gray-500">
            Please log in to view this page.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">
        📚 Splunk Learning Materials
      </h1>
{/* materials */}
 

      <NavLink
        to="/dashboard/takequiz"
        className="inline-block bg-PURPLE hover:bg-BLUE text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
      >
        Take Splunk Quiz
      </NavLink>
      {/* <Outlet></Outlet> */}

      {/* === VIDEO SECTION === */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">🎬 Class Videos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`cursor-pointer rounded-2xl border transition-all hover:scale-[1.03] hover:shadow-lg overflow-hidden bg-white ${
                selectedVideo.id === video.id
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200"
              }`}
            >
              <div className="aspect-video bg-black">
                <iframe
                  src={`${video.url}&muted=1&autoplay=0`}
                  title={video.title}
                  className="w-full h-full rounded-t-2xl"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                ></iframe>
              </div>
              <div className="p-4 bg-gray-50 text-sm font-semibold text-gray-800 text-center">
                {video.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === DOCUMENT SECTION === */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">📊 Slides</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {docs.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className={`cursor-pointer rounded-2xl border bg-white transition-all overflow-hidden hover:scale-[1.03] hover:shadow-lg ${
                selectedDoc.id === doc.id
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200"
              }`}
            >
              <div className="aspect-[4/3] bg-gray-100">
                <iframe
                  src={doc.url}
                  title={doc.title}
                  className="w-full h-full pointer-events-none rounded-t-2xl"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 text-center text-sm font-semibold text-gray-800 truncate">
                {doc.title}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-md font-semibold mb-3 text-gray-700">
            📖 Viewing: {selectedDoc.title}
          </h3>
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
    </div>
  );
};

export default Materials;
