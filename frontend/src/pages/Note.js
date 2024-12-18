

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/note.module.css";

const API_URL = "http://localhost:5000/api/files";

const Note = () => {
  const [files, setFiles] = useState([]);
  const [currentDir, setCurrentDir] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  // Navigate into directories
  const navigateToDirectory = (dirName) => {
    const newPath = currentDir ? `${currentDir}/${dirName}` : dirName;
    fetchFiles(newPath);
  };

  // Navigate back to parent directory
  const navigateBack = () => {
    if (!currentDir) return;
    const parentDir = currentDir.split("/").slice(0, -1).join("/");
    fetchFiles(parentDir);
  };

  // Handle file preview
  const handlePreview = (filename) => {
    const fileExtension = filename.split(".").pop().toLowerCase();
    const filePath = currentDir ? `${currentDir}/${filename}` : filename;
    const fileUrl = `${API_URL}/preview/${encodeURIComponent(filePath)}`;
    navigate("/result", {
      state: {
        fileUrl,
        fileType: fileExtension,
      },
    });
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className={styles.fileContainer}>
      <h1 className={styles.heading}>File Explorer</h1>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.controls}>
        <button
          className={`${styles.button} ${!currentDir && styles.disabled}`}
          onClick={navigateBack}
          disabled={!currentDir}
        >
          Go Back
        </button>
      </div>

      <div className={styles.fileList}>
        <ul>
          {files.map((file) => (
            <li key={file.name} className={styles.fileItem} onClick={() => navigateToDirectory(file.name)}>
              {file.type === "directory" ? (
                <label
                  className={styles.directoryButton}
                  
                >
                  📁 {file.name}
                </label>
              ) : (
                <span
                  onClick={() => handlePreview(file.name)}
                  className={styles.fileName}
                >
                  {file.name.endsWith(".pdf") ? (
                    <FontAwesomeIcon icon={faFilePdf} className={styles.fileIcon} />
                  ) : (
                    <span className={styles.genericIcon}>🗎</span>
                  )}
                  {file.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Note;
