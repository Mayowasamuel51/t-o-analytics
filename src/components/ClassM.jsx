import { useEffect, useState } from "react";

const ClassM = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://to-backendapi-v1.vercel.app/api/all/assignment") // ✅ endpoint to get all assignments
      .then((res) => res.json())
      .then((data) => {
        setAssignments(data.data || []); // adjust based on API response structure
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching assignments:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading assignments...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">📚 Class Assignments</h2>

        {assignments.length === 0 ? (
          <p>No assignments available yet.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map((assignment) => (
              <li
                key={assignment._id}
                className="border p-4 rounded-lg shadow bg-white dark:bg-gray-800"
              >
                <h3 className="font-semibold text-lg mb-2">
                  {assignment.name || "TO INSTRUCTOR"}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {assignment.message || assignment.description}
                </p>

                {/* If assignment has image */}
                {assignment.imageurl && (
                  <img
                    src={assignment.imageurl}
                    alt="Assignment"
                    className="mt-3 w-full max-h-80 object-cover rounded-md"
                  />
                )}

                <p className="text-sm text-gray-500 mt-2">
  {new Date(assignment.date).toLocaleString()}
</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

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

export default ClassM;
