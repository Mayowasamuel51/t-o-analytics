
import { useState } from "react";

const SendPdf = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://to-backendapi-v1.vercel.app/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    // alert("Uploaded: " + data.fullUrl || data.fileUrl);
  };

  return (
    <>
      <form onSubmit={handleUpload} className="mt-10">
        <h1 className="text-center font-bold">UPLOAD POWERPOINT</h1>
        <div className="mt-28 p-11">
          <input
            type="file"
            accept=".pdf,.ppt,.pptx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default SendPdf;
