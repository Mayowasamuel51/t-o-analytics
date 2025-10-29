// CoursePortal.jsx
// Single-file React component (Tailwind CSS required)
// Paste this into your project (e.g. src/components/CoursePortal.jsx)
// Install dependency: npm install @vimeo/player
// Make sure you set the logged-in user's email into localStorage as: localStorage.setItem('user', 'user@example.com')

import React, { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { NavLink } from "react-router-dom";
import DashboardDropdown from "./Dropdown";

const allowedEmails = [
  "adenusitimi@gmail.com",
  "oluwaferanmiolulana@gmail.com",
  "oluwaferanmi.olulana@gmail.com",
  "tomideolulana@gmail.com",
  "randommayowa@gmail.com",
  "yinkalola51@gmail.com",
  "toanalyticsllc@gmail.com",
  "kevwe_oberiko@yahoo.com",
  "denisgsam@gmail.com",
  "fpasamuelmayowa51@gmail.com",
  "oluwatiroyeamoye@gmail.com",
  "trbanjo@gmail.com",
  "emanfrimpong@gmail.com",
  "dipeoluolatunji@gmail.com",
  "lybertyudochuu@gmail.com",
];

const sampleCourses = [
  {
    id: "splunk",
    title: "Splunk Training",
    classes: [
      {
        id: "class1",
        title: "Orientation — Intro (1 Videos)",
        videos: [
          {
            id: "v1",
            title: "To-analytics Orientation",
            url: "https://player.vimeo.com/video/1126909883",
          },
          // {
          //   id: "v2",
          //   title: "To-analytics Splunk Class 1",
          //   url: "https://player.vimeo.com/video/1127004938",
          // },
        ],
        docs: [
          {
            id: "d1",
            title: "To-analytics Orientation",
            url: "https://drive.google.com/file/d/1VzC-nTY7XhLagAeLIFdN1e6_MQMUkXiv/preview",
          },
          // {
          //   id: "d2",
          //   title: "To-analytics Splunk Class 1 Note",
          //   url: "https://drive.google.com/file/d/1VYiqPwen5Dc1tV2x8_ohR55n6toGBm1G/preview",
          // },
        ],
      },
      {
        id: "class2",
        title: "Class 1 — Splunk SEIM (1 Videos)",
        videos: [
          // {
          //   id: "v1",
          //   title: "To-analytics Orientation",
          //   url: "https://player.vimeo.com/video/1126909883",
          // },
          {
            id: "v2",
            title: "To-analytics Splunk Class 1",
            url: "https://player.vimeo.com/video/1127004938",
          },
        ],
        docs: [
          {
            id: "d1",
            title: "To-analytics Splunk Class 1 Intro",
            url: "https://drive.google.com/file/d/1bf5cRkcEC3yDJ5MnzpRKDpRLhRhdUH90/preview",
          },
          {
            id: "d2",
            title: "To-analytics Splunk Class 1 Note",
            url: "https://drive.google.com/file/d/1VYiqPwen5Dc1tV2x8_ohR55n6toGBm1G/preview",
          },
        ],
      },
      {
        id: "class3",
        title: "Class 2 —  Splunk Basics",
        videos: [  {
            id: "v2",
            title: "To-analytics Splunk Class 1",
            url: "https://player.vimeo.com/video/1131114931" 
          },
            {
            id: "v2",
            title: "To-analytics Splunk Class 2 Note",
            url: " https://drive.google.com/file/d/1sf-kifLwlcAvM9qLcJTde9qWX3OCvd78/preview",
          },
         

        ],
        docs: [
          {
            id: "d3",
            title: "To-analytics Splunk Class 2",
            url: "https://drive.google.com/file/d/1V3zqvISvQLDZlQKUryIna4xnmAzcNRSC/preview",
          },
        ],
      },
      { id: "class3", title: "Class 3 — (Coming soon)", videos: [], docs: [] },
      { id: "class4", title: "Class 4 — (Coming soon)", videos: [], docs: [] },
    ],
  },
];

function storageProgressKey(email) {
  return `cp_progress_${(email || "").toLowerCase().trim()}`;
}

/**
 * CoursePortal (single-file)
 */
export default function CoursePortal() {
  const [courses] = useState(sampleCourses);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedClass, setSelectedClass] = useState(courses[0].classes[0]);
  const [showClassDetails, setShowClassDetails] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [thumbnails, setThumbnails] = useState({});
  const playerRef = useRef(null);
  const vimeoPlayerRef = useRef(null);
  const [isMutedHint, setIsMutedHint] = useState(false);
  const [loadingThumbs, setLoadingThumbs] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isAllowed, setIsAllowed] = useState(false);
  const [progressState, setProgressState] = useState({}); // mirror of saved progress per-email

  // init: user + permission + progress state
  useEffect(() => {
    const e = localStorage.getItem("user") || "";
    setUserEmail(e);
    setIsAllowed(allowedEmails.map((a) => a.toLowerCase()).includes((e || "").toLowerCase()));
    if (e) {
      try {
        const saved = JSON.parse(localStorage.getItem(storageProgressKey(e)) || "{}");
        setProgressState(saved || {});
      } catch (err) {
        setProgressState({});
      }
    }
    // set default selected class/video
    setSelectedCourse(courses[0]);
    setSelectedClass(courses[0].classes[0]);
  }, [courses]);

  // fetch thumbnails for the selected class videos via Vimeo oEmbed
  useEffect(() => {
    async function fetchThumbs() {
      setLoadingThumbs(true);
      const vmap = {};
      const videos = selectedClass.videos || [];
      await Promise.all(
        videos.map(async (v) => {
          if (v.thumbnail) {
            vmap[v.id] = v.thumbnail;
            return;
          }
          try {
            const videoUrl = v.url.includes("vimeo.com") ? v.url.replace("player.", "") : v.url;
            const oembed = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoUrl)}`;
            const res = await fetch(oembed);
            if (!res.ok) throw new Error("no oembed");
            const data = await res.json();
            vmap[v.id] = data.thumbnail_url || null;
          } catch (e) {
            vmap[v.id] = null;
          }
        })
      );
      setThumbnails(vmap);
      setLoadingThumbs(false);
    }
    fetchThumbs();
  }, [selectedClass]);

  // initialize/destroy Vimeo player when selectedVideo changes
  useEffect(() => {
    if (!selectedVideo) return;

    // cleanup previous player
    if (vimeoPlayerRef.current) {
      try {
        vimeoPlayerRef.current.unload?.();
      } catch (e) {}
      try {
        vimeoPlayerRef.current.destroy?.();
      } catch (e) {}
      vimeoPlayerRef.current = null;
    }

    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", `${selectedVideo.url}?transparent=0&autoplay=0`);
    iframe.setAttribute("allow", "autoplay; fullscreen; picture-in-picture");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.setAttribute("frameborder", "0");

    if (playerRef.current) {
      playerRef.current.innerHTML = "";
      playerRef.current.appendChild(iframe);
    }

    const player = new Player(iframe);
    vimeoPlayerRef.current = player;

    // try to set volume; if blocked by browser autoplay policy, show hint
    player.setVolume(1).catch(() => setIsMutedHint(true));

    // restore last-time for this class/video if present
    try {
      const saved = JSON.parse(localStorage.getItem(storageProgressKey(userEmail)) || "{}");
      const cls = saved[selectedClass.id] || {};
      if (cls.videoId === selectedVideo.id && cls.time > 0) {
        player.ready().then(() => player.setCurrentTime(cls.time).catch(() => {}));
      }
    } catch (e) {}

    // periodically save time & auto-complete at 90%
    const interval = setInterval(async () => {
      try {
        const t = await player.getCurrentTime();
        const dur = await player.getDuration();
        updateVideoProgress(selectedClass.id, selectedVideo.id, t, dur);
      } catch (e) {}
    }, 3000);

    const onPlay = () => setIsMutedHint(false);
    player.on("play", onPlay);

    return () => {
      clearInterval(interval);
      try {
        player.off("play", onPlay);
      } catch (e) {}
      try {
        player.unload?.();
        player.destroy?.();
      } catch (e) {}
      vimeoPlayerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVideo, selectedClass, userEmail]);

  // when switching class, clear selectedVideo and attempt to restore saved pointer
  useEffect(() => {
    setSelectedVideo(null);
    setShowClassDetails(true);
    try {
      const saved = JSON.parse(localStorage.getItem(storageProgressKey(userEmail)) || "{}");
      const cls = saved[selectedClass.id] || {};
      if (cls.videoId) {
        const found = selectedClass.videos.find((v) => v.id === cls.videoId);
        if (found) setSelectedVideo(found);
      }
    } catch (e) {}
  }, [selectedClass, userEmail]);

  // helpers: update progress & mark complete
  function updateVideoProgress(classId, videoId, timeSec, durationSec) {
    const e = userEmail || "anonymous";
    const key = storageProgressKey(e);
    const prev = JSON.parse(localStorage.getItem(key) || "{}");
    prev[classId] = { ...(prev[classId] || {}), videoId, time: timeSec };
    if (durationSec > 0 && timeSec / durationSec >= 0.9) {
      prev[classId].completed = true;
    }
    localStorage.setItem(key, JSON.stringify(prev));
    setProgressState(prev);
  }

  function markClassCompleted(classId) {
    const e = userEmail || "anonymous";
    const key = storageProgressKey(e);
    const prev = JSON.parse(localStorage.getItem(key) || "{}");
    prev[classId] = { ...(prev[classId] || {}), completed: true };
    localStorage.setItem(key, JSON.stringify(prev));
    setProgressState(prev);
  }

  function isClassCompleted(classId) {
    const p = progressState[classId] || {};
    return !!p.completed;
  }

  if (!isAllowed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied 🚫</h1>
        <p className="text-gray-700">This page is restricted to authorized To-Analytics members only.</p>
        {userEmail ? (
          <p className="mt-3 text-sm text-gray-500">Your email: {userEmail}</p>
        ) : (
          <p className="mt-3 text-sm text-gray-500">Please log in to view this page.</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
     <DashboardDropdown/>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Courses</h2>

          <div className="space-y-2">
            {courses.map((c) => (
              <div key={c.id}>
                <button
                  onClick={() => {
                    setSelectedCourse(c);
                    setSelectedClass(c.classes[0]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-all hover:bg-gray-100 ${c.id === selectedCourse.id ? "bg-gray-100 font-semibold" : ""}`}
                >
                  {c.title}
                </button>

                {c.id === selectedCourse.id && (
                  <div className="mt-2 ml-2 space-y-1">
                    {c.classes.map((cl) => (
                      <button
                        key={cl.id}
                        onClick={() => {
                          setSelectedClass(cl);
                          setShowClassDetails(true);
                        }}
                        className={`flex items-center justify-between w-full text-left text-sm px-2 py-1 rounded-lg transition-all hover:bg-gray-100 ${cl.id === selectedClass.id ? "bg-blue-50 font-medium" : ""}`}
                      >
                        <span>
                          {isClassCompleted(cl.id) ? "✅" : "⭕"} <span className="ml-2">{cl.title}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Saved progress</span>
              <button
                onClick={() => {
                  localStorage.removeItem(storageProgressKey(userEmail));
                  setProgressState({});
                  alert("Progress cleared for this account.");
                }}
                className="text-xs text-red-600 hover:underline"
              >
                Clear
              </button>

             
            </div>
            <div className="mt-2 text-xs text-gray-500">Progress saved per email in your browser.</div>
          </div>
        </aside>

        {/* Main content */}
        <main className="col-span-12 md:col-span-6 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold">{selectedClass.title}</h1>
              <p className="text-sm text-gray-500">{selectedClass.videos.length > 1 ? `Contains ${selectedClass.videos.length} videos` : "Video playlist"}</p>
            </div>
          </div>

          <div className="mt-4 ">
            {/* Video cards (for multi-video classes like Class 1) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedClass.videos.map((v) => (
                <div key={v.id} className={`p-3 rounded-xl border ${selectedVideo && selectedVideo.id === v.id ? "border-blue-400 shadow" : "border-gray-200"}`}>
                  <div className="w-full h-40 bg-gray-200 overflow-hidden rounded">
                    {thumbnails[v.id] ? (
                      <img src={thumbnails[v.id]} alt={v.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">{loadingThumbs ? "..." : "No thumb"}</div>
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{v.title}</div>
                      <div className="text-xs text-gray-500">Vimeo • {v.id}</div>
                    </div>
                    <div>
                      <button onClick={() => setSelectedVideo(v)} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Player area */}
            <div className="mt-6">
              <div className="rounded-xl overflow-hidden border h-[420px] bg-black" ref={playerRef} />

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-gray-600">{selectedVideo ? selectedVideo.title : "No video selected"}</div>
                <div className="flex items-center gap-3">
                  {isMutedHint && <div className="text-red-500 text-xs">Audio may be blocked — play and allow sound on your browser.</div>}

                  <button
                    onClick={() => {
                      if (!selectedVideo) {
                        alert("Select a video first");
                        return;
                      }
                      markClassCompleted(selectedClass.id);
                    }}
                    className="px-3 py-2 rounded-lg bg-gray-100 text-sm"
                  >
                    Mark as Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right: Docs & Notes */}
        <aside className="col-span-12 md:col-span-3 bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold">Slides & Notes</h3>

          <div className="mt-3">
            {selectedClass.docs.length > 0 ? (
              selectedClass.docs.map((doc) => (
                <div key={doc.id} className="mb-2">
                  <a href={doc.url} target="_blank" rel="noreferrer" className="text-sm underline">
                    {doc.title}
                  </a>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500">No slides yet for this class.</div>
            )}
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium">Quick Notes</h4>
            <p className="text-xs text-gray-500">Notes saved per email.</p>
            <textarea
              placeholder="Write notes..."
              className="w-full mt-2 p-2 rounded border min-h-[160px]"
              value={(() => {
                try {
                  const saved = JSON.parse(localStorage.getItem(storageProgressKey(userEmail)) || "{}");
                  return (saved[selectedClass.id] && saved[selectedClass.id].note) || "";
                } catch (e) {
                  return "";
                }
              })()}
              onChange={(e) => {
                try {
                  const key = storageProgressKey(userEmail);
                  const prev = JSON.parse(localStorage.getItem(key) || "{}");
                  prev[selectedClass.id] = { ...(prev[selectedClass.id] || {}), note: e.target.value };
                  localStorage.setItem(key, JSON.stringify(prev));
                  setProgressState(prev);
                } catch (err) {}
              }}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}



// import { useState, useEffect } from "react";
// import { NavLink, Outlet } from "react-router-dom";

// const Materials = () => {
//   const allowedEmails = [
//     "adenusitimi@gmail.com",
//      "oluwaferanmiolulana@gmail.com",
//     "Oluwaferanmi.olulana@gmail.com",
//     "tomideolulana@gmail.com",
//     "randommayowa@gmail.com",
//     "yinkalola51@gmail.com",
//     "toanalyticsllc@gmail.com",
//     "kevwe_oberiko@yahoo.com",
//     "denisgsam@gmail.com",
//     "oluwaferanmi.olulana@gmail.com",
//     "fpasamuelmayowa51@gmail.com",
//     "oluwatiroyeamoye@gmail.com",
//     "trbanjo@gmail.com",
//     "emanfrimpong@gmail.com",
//     "dipeoluolatunji@gmail.com",
//     "lybertyudochuu@gmail.com",
//   ];

//   const [userEmail, setUserEmail] = useState("");
//   const [isAllowed, setIsAllowed] = useState(false);

//   useEffect(() => {
//     const email = localStorage.getItem("user");
//     setUserEmail(email);
//     if (email) {
//       const normalized = email.toLowerCase();
//       const allowed = allowedEmails.map((e) => e.toLowerCase());
//       setIsAllowed(allowed.includes(normalized));
//     }
//   }, []);

//   const videos = [
//     {
//       id: 1,
//       title: "To-analytics Orientation",
//       url: "https://player.vimeo.com/video/1126909883?badge=0&autopause=0&player_id=0&app_id=58479",
//     },
//     {
//       id: 2,
//       title: "To-analytics Splunk Class 1",
//       url: "https://player.vimeo.com/video/1127004938?badge=0&autopause=0&player_id=0&app_id=58479",
//     },
//   ];

//   const docs = [
//     {
//       id: 1,
//       title: "To-analytics Splunk Class 1 Intro",
//       url: "https://drive.google.com/file/d/1bf5cRkcEC3yDJ5MnzpRKDpRLhRhdUH90/preview",
//     },
//     {
//       id: 2,
//       title: "To-analytics Splunk Class 1 Note",
//       url: "https://drive.google.com/file/d/1VYiqPwen5Dc1tV2x8_ohR55n6toGBm1G/preview",
//     },

//     {
//       id:3, 
//       title:"To-analytics Splunk Class 2",
//       url:"https://drive.google.com/file/d/1V3zqvISvQLDZlQKUryIna4xnmAzcNRSC/preview"
//     }
//   ];

//   const [selectedVideo, setSelectedVideo] = useState(videos[0]);
//   const [selectedDoc, setSelectedDoc] = useState(docs[0]);

//   if (!isAllowed) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">
//           Access Denied 🚫
//         </h1>
//         <p className="text-gray-700">
//           This page is restricted to authorized To-Analytics members only.
//         </p>
//         {userEmail ? (
//           <p className="mt-3 text-sm text-gray-500">Your email: {userEmail}</p>
//         ) : (
//           <p className="mt-3 text-sm text-gray-500">
//             Please log in to view this page.
//           </p>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold text-gray-800">
//         📚 Splunk Learning Materials
//       </h1>
// {/* materials */}
 

//       <NavLink
//         to="/dashboard/takequiz"
//         className="inline-block bg-PURPLE hover:bg-BLUE text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
//       >
//         Take Splunk Quiz
//       </NavLink>
//       {/* <Outlet></Outlet> */}

//       {/* === VIDEO SECTION === */}
//       <div className="bg-white shadow-md rounded-2xl p-6">
//         <h2 className="text-xl font-semibold mb-4">🎬 Class Videos</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
//           {videos.map((video) => (
//             <div
//               key={video.id}
//               onClick={() => setSelectedVideo(video)}
//               className={`cursor-pointer rounded-2xl border transition-all hover:scale-[1.03] hover:shadow-lg overflow-hidden bg-white ${
//                 selectedVideo.id === video.id
//                   ? "border-blue-500 shadow-md"
//                   : "border-gray-200"
//               }`}
//             >
//               <div className="aspect-video bg-black">
//                 <iframe
//                   src={`${video.url}&muted=1&autoplay=0`}
//                   title={video.title}
//                   className="w-full h-full rounded-t-2xl"
//                   frameBorder="0"
//                   allow="autoplay; fullscreen"
//                 ></iframe>
//               </div>
//               <div className="p-4 bg-gray-50 text-sm font-semibold text-gray-800 text-center">
//                 {video.title}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* === DOCUMENT SECTION === */}
//       <div className="bg-white shadow-md rounded-2xl p-4">
//         <h2 className="text-lg font-semibold mb-4">📊 Slides</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {docs.map((doc) => (
//             <div
//               key={doc.id}
//               onClick={() => setSelectedDoc(doc)}
//               className={`cursor-pointer rounded-2xl border bg-white transition-all overflow-hidden hover:scale-[1.03] hover:shadow-lg ${
//                 selectedDoc.id === doc.id
//                   ? "border-blue-500 shadow-md"
//                   : "border-gray-200"
//               }`}
//             >
//               <div className="aspect-[4/3] bg-gray-100">
//                 <iframe
//                   src={doc.url}
//                   title={doc.title}
//                   className="w-full h-full pointer-events-none rounded-t-2xl"
//                   frameBorder="0"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <div className="p-4 text-center text-sm font-semibold text-gray-800 truncate">
//                 {doc.title}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-10">
//           <h3 className="text-md font-semibold mb-3 text-gray-700">
//             📖 Viewing: {selectedDoc.title}
//           </h3>
//           <div className="w-full h-[600px] rounded-xl overflow-hidden border">
//             <iframe
//               src={selectedDoc.url}
//               title={selectedDoc.title}
//               className="w-full h-full"
//               frameBorder="0"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Materials;
