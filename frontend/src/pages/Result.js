import React, { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useLocation } from "react-router-dom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "../styles/result.css"; 
import axios from "axios";

const API_URL = "http://localhost:5000";

const Result = () => {
  const location = useLocation();
  const { state } = location;
  const [pdfFile, setPdfFile] = useState(null);
  const [summary, setSummary] = useState(""); // To hold the summarized text
  const [displayText, setDisplayText] = useState(""); // For typewriter effect
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Load file from state if available
  useEffect(() => {
    if (state?.fileUrl && state?.fileType === "pdf") {
      setPdfFile(state.fileUrl);
    }
  }, [state]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(URL.createObjectURL(file));
    }
  };

  const handleSummarise = async () => {
    try {
      setIsLoading(true); // Set loading state
      const response = await axios.post(`${API_URL}/summarise`, {
        dir: state.fileUrl, // Send in the request body
      });
      const text = response.data.text; // Extract the summarized text
      setSummary(text); // Store full text
      setDisplayText(""); // Reset display text for typewriter effect
      typeWriterEffect(text); // Start the typewriter effect
    } catch (error) {
      console.error("Error during summarise:", error);
      setSummary("Failed to fetch summary. Please try again."); // Error message
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  const typeWriterEffect = (text) => {
    let index = 0;
    const speed = 10; // Faster typing speed (ms per character)
  
    const type = () => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text[index]);
        index++;
        setTimeout(type, speed);
      }
    };
    type();
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
        <button
          className="action-button"
          onClick={handleSummarise}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Summarizing..." : "Summarize PDF"}
        </button>
        <button
          className="action-button"
          onClick={() => alert("Expanding topic...")}
        >
          Expand Topic
        </button>
        <div className="insights">
          <h4>Discover More</h4>
          <div className="summary-container">
            <p className="summary-text">{displayText || "Insights and analysis will appear here."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
