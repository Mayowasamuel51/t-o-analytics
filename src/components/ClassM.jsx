import { useEffect, useState } from "react";
import Quiz from "./Quiz"; // ✅ your existing quiz component

const ClassM = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    fetch("https://to-backendapi-v1.vercel.app/api/assignment")
      .then((res) => res.json())
      .then((data) => {
        setAssignments(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching assignments:", err);
        setLoading(false);
      });
  }, []);

  const loadQuiz = async (quizName) => {
    setSelectedQuiz(quizName);
    try {
      const res = await fetch(`http://localhost:8000/api/quizzes/${quizName}`);
      const data = await res.json();
      setQuizData(data);
    } catch (err) {
      console.error("Error loading quiz:", err);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading assignments...</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h2 className="text-xl font-bold mb-4">📚 Class Assignments</h2>

      {/* 🔽 Dropdown */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-700">
          Select a Quiz:
        </label>
        <select
          value={selectedQuiz}
          onChange={(e) => loadQuiz(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">-- Choose a Quiz --</option>
          <option value="splunk1">Splunk 1 Quiz</option>
          <option value="splunk2">Splunk 2 Quiz</option>
          <option value="splunk3">Splunk 3 Quiz</option>
        </select>
      </div>

      {/* 🧩 Show selected quiz */}
      {quizData && <Quiz data={quizData} />}
      
      {/* 📝 Assignments list */}
      <ul className="space-y-4 mt-8">
        {assignments.map((assignment) => (
          <li key={assignment._id} className="border p-4 rounded-lg shadow bg-white">
            <h3 className="font-semibold text-lg mb-2">{assignment.name || "TO INSTRUCTOR"}</h3>
            <p className="text-gray-700 font-extrabold">{assignment.message || assignment.description}</p>
            {assignment.imageurl && (
              <img src={assignment.imageurl} alt="Assignment" className="mt-3 w-full max-h-80 object-cover rounded-md" />
            )}
            <p className="text-sm text-gray-500 mt-2">{new Date(assignment.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassM;


// export default ClassM;

// import { useEffect, useState } from "react";

// const ClassM = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://to-backendapi-v1.vercel.app/api/files") // 🔹 Your backend API
//       .then((res) => res.json())
//       .then((data) => {
//         setFiles(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching files:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p className="p-6 text-center">Loading files...</p>;
//   }

//   return (
//     <>
//       <div className="p-6">
//         <h2 className="text-xl font-bold mb-4">Available Files</h2>

//         {files.length === 0 ? (
//           <p>No files uploaded yet.</p>
//         ) : (
//           <ul className="space-y-4">
//             {files.map((file) => (
//               <li key={file._id} className="border p-4 rounded-lg shadow">
//                 <h3 className="font-semibold">{file.title}</h3>

//                 {/* View PDF directly */}
//                 {file.fileType === "pdf" && (
//                   <iframe
//                     src={`https://to-backendapi-v1.vercel.app${file.fileUrl}`}
//                     width="100%"
//                     height="400"
//                     title={file.title}
//                   ></iframe>
//                 )}

//                 {/* View PPT via Google Docs Viewer */}
//                 {file.fileType === "ppt" || file.fileType === "pptx" ? (
//                   <iframe
//                     src={`https://docs.google.com/viewer?url=https://to-backendapi-v1.vercel.app${file.fileUrl}&embedded=true`}
//                     width="100%"
//                     height="400"
//                     title={file.title}
//                   ></iframe>
//                 ) : null}

//                 {/* Download Link */}
//                 <a
//                   href={`https://to-backendapi-v1.vercel.app${file.fileUrl}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline block mt-2"
//                 >
//                 Please Download your Material
//                 </a>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };
