import { useEffect, useState } from "react";

const ClassM = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://to-backendapi-v1.vercel.app/api/files") // 🔹 Your backend API
      .then((res) => res.json())
      .then((data) => {
        setFiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching files:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading files...</p>;
  }

  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Available Files</h2>

        {files.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          <ul className="space-y-4">
            {files.map((file) => (
              <li key={file._id} className="border p-4 rounded-lg shadow">
                <h3 className="font-semibold">{file.title}</h3>

                {/* View PDF directly */}
                {file.fileType === "pdf" && (
                  <iframe
                    src={`https://to-backendapi-v1.vercel.app${file.fileUrl}`}
                    width="100%"
                    height="400"
                    title={file.title}
                  ></iframe>
                )}

                {/* View PPT via Google Docs Viewer */}
                {file.fileType === "ppt" || file.fileType === "pptx" ? (
                  <iframe
                    src={`https://docs.google.com/viewer?url=https://to-backendapi-v1.vercel.app${file.fileUrl}&embedded=true`}
                    width="100%"
                    height="400"
                    title={file.title}
                  ></iframe>
                ) : null}

                {/* Download Link */}
                <a
                  href={`https://to-backendapi-v1.vercel.app${file.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline block mt-2"
                >
                Please Download your Material
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ClassM;
