import React, { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "../styles/result.css"; // Custom CSS file

const Result = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="app-container">
      {/* PDF Viewer Section */}
      <div className="pdf-viewer-section">
        <div className="file-upload">
          <input
            type="file"
            accept=".pdf"
            id="file-input"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input">Upload PDF</label>
        </div>
        {pdfFile ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        ) : (
          <div className="placeholder">
            <p>Choose a PDF file to view its content.</p>
          </div>
        )}
      </div>

      {/* Sidebar Section */}
      <div className="sidebar-section">
        <h3>AI Assistant</h3>
        <p>Use AI to analyze or summarize your document.</p>
        <button className="action-button" onClick={() => alert("Creating a summary...")}>
          Summarize PDF
        </button>
        <button className="action-button" onClick={() => alert("Expanding topic...")}>
          Expand Topic
        </button>
        <div className="insights">
          <h4>Discover More</h4>
          <p>Insights and analysis will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Result;
