import { useState } from "react";
import "./App.css";
import config from "./config/environment";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [key, setKey] = useState(null);

  const handleFormData = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    try {
      // 1. Get signed URL from backend
      const res = await fetch(config.API_BASE_URL + "/getSignUrl", {
        method: "GET",
        credentials: "include",
      });

      const { url, key } = await res.json(); // backend must send { url: "signed-url" }

      setKey(key); // store key to download later

      // 2. Upload file directly to S3
      const upload = await fetch(url, {
        method: "PUT",
        body: selectedFile,
        headers: {
          "Content-Type": selectedFile.type,
        },
      });

      console.log("Upload Success", upload);
      alert("File uploaded successfully!");
      setSelectedFile(null)
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDownload = async () => {
    if (!key) return alert("No image uploaded");

    // 3) ask backend for GET signed URL
    const res = await fetch(config.API_BASE_URL + "/getDownloadUrl?key=" + key);

    const { url } = await res.json();

    // 4) open image in new tab (or auto-download)
    const link = document.createElement("a");
    link.href = url;
    link.download = key; // file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleFormData} className="upload-form">
        <h2>Upload Your File</h2>

        <label className="file-label">
          <input
            type="file"
            name="myfile"
            onChange={handleFileChange}
            className="file-input"
          />
          <span className="file-btn">Choose File</span>
          <span className="file-name">
            {selectedFile ? selectedFile.name : "No file selected"}
          </span>
        </label>

        <button type="submit" className="submit-btn">
          Submit
        </button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={!key}
          className="submit-btn"
        >
          Download Uploaded Image
        </button>
      </form>
    </div>
  );
}

export default App;
