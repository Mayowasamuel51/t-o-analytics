import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import FetchTotalSplunkUser from "../hooks/FetchTotalSplunkUser";
import FetchTotalEdcationalUser from "../hooks/FetchTotalEdcationalUser";

const api_splunk = import.meta.env.VITE_BACKEND_LIVE_SPLUNK;
const api_educational = import.meta.env.VITE_BACKEND_LIVE_EDUCATIONAL;
const api_education = import.meta.env.VITE_EDUCATIONAL_GET_TOTAL;
const SendPdf = () => {
  const navigate = useNavigate();
  const { data } = FetchTotalSplunkUser();
     const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/files") // 🔹 Your backend API
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
    return <p className="p-6">Loading files...</p>;
  }

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   const res = await fetch("http://localhost:5000/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data = await res.json();
  //   alert("Uploaded: " + data.url);
  // };
  


  return (
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
                  src={`http://localhost:8000 ${file.fileUrl}`}
                  width="100%"
                  height="400"
                  title={file.title}
                ></iframe>
              )}

              {/* View PPT via Google Docs Viewer */}
              {(file.fileType === "pptx" ) && (
                <iframe
                  src={`https://docs.google.com/viewer?url=http://localhost:8000${file.fileUrl}&embedded=true`}
                  width="100%"
                  height="400"
                  title={file.title}
                ></iframe>
              )}

              {/* Download Link */}
              <a
                href={`http://localhost:8000${file.fileUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block mt-2"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>

    // <form onSubmit={handleUpload}>
    //   <input type="file" accept=".pdf,.ppt,.pptx" onChange={(e) => setFile(e.target.files[0])} />
    //   <button type="submit">Upload</button>
    // </form>
  );

};

export default SendPdf;
