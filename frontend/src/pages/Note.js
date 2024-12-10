import React, { useState,useEffect } from 'react';
import axios from "axios";
const API_URL = "http://localhost:5000/api/files";


const Note=()=>{
    const [files, setFiles] = useState([]);
    const [currentDir, setCurrentDir] = useState("");
    const [error, setError] = useState("");
    const [previewFile, setPreviewFile] = useState(null); 
    const [fileType, setFileType] = useState(""); 

    // Fetch files from the backend
    const fetchFiles = async (dir = "") => {
    try {
        const response = await axios.get(API_URL, { params: { dir } });
        setFiles(response.data);
        setCurrentDir(dir);
        setError("");
    } catch (err) {
        setError("Error fetching files.");
        console.error(err);
    }
    };

    // Handle file upload
    const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
        await axios.post(`${API_URL}/upload`, formData, {
        params: { dir: currentDir }, // Pass the current directory
        });
        fetchFiles(currentDir); // Refresh file list
    } catch (err) {
        setError("Error uploading file.");
        console.error(err);
    }
    };

    // Handle file or directory deletion
    const handleDelete = async (filename) => {
    try {
        await axios.delete(`${API_URL}/delete/${filename}`);
        fetchFiles(currentDir); // Refresh file list
    } catch (err) {
        setError("Error deleting file.");
        console.error(err);
    }
    };

    // Handle navigation into directories
    const navigateToDirectory = (dirName) => {
    const newPath = currentDir ? `${currentDir}/${dirName}` : dirName;
    fetchFiles(newPath);
    };

    // Navigate back to the parent directory
    const navigateBack = () => {
    if (!currentDir) return;
    const parentDir = currentDir.split("/").slice(0, -1).join("/");
    fetchFiles(parentDir);
    };

    // Open file preview
    const handlePreview = (filename) => {
    const fileExtension = filename.split(".").pop().toLowerCase();

    setPreviewFile(`${API_URL}/preview/${filename}`);
    setFileType(fileExtension);
    };

    // Close file preview
    const closePreview = () => {
    setPreviewFile(null);
    setFileType("");
    };

    useEffect(() => {
    fetchFiles(); // Initial fetch on component mount
    }, []);





    return(
    <div className="app-container">
      <h1>File Explorer</h1>

      {error && <div className="error">{error}</div>}

      {previewFile ? (
        <div className="preview-container">
          <button className="close-btn" onClick={closePreview}>
            Close
          </button>
          {fileType === "jpg" || fileType === "jpeg" || fileType === "png" || fileType === "gif" ? (
            <img src={previewFile} alt="Preview" className="preview-image" />
          ) : fileType === "mp4" || fileType === "webm" || fileType === "ogg" ? (
            <video controls className="preview-video">
              <source src={previewFile} type={`video/${fileType}`} />
              Your browser does not support the video tag.
            </video>
          ) : fileType === "pdf" ? (
            <iframe src={previewFile} title="PDF Preview" className="preview-frame"></iframe>
          ) : (
            <div>Unsupported file type for preview</div>
          )}
        </div>
      ) : (
        <>
          <div className="controls">
            <button onClick={navigateBack} disabled={!currentDir}>
              Go Back
            </button>

            <label htmlFor="file-upload" className="upload-btn">
              Upload
            </label>
            <input
              type="file"
              id="file-upload"
              style={{ display: "none" }}
              onChange={(e) => handleUpload(e.target.files[0])}
            />
          </div>

          <div className="file-list">
            <ul>
              {files.map((file) => (
                <li key={file.name}>
                  {file.type === "directory" ? (
                    <button onClick={() => navigateToDirectory(file.name)}>
                      📁 {file.name}
                    </button>
                  ) : (
                    <>
                      🗃️ {file.name}
                      <button onClick={() => handlePreview(file.name)}>
                        Open
                      </button>
                      <button onClick={() => handleDelete(file.name)}>
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
    );
}
export default Note;




