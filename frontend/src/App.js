import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfText, setPdfText] = useState('');

    // Handle topic description generation
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!topic) {
            alert('Please enter a topic.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/generate-description',
                { topic }
            );
            setDescription(response.data.description);
        } catch (error) {
            console.error(error);
            alert('An error occurred while generating the description.');
        } finally {
            setLoading(false);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);
    };

    // Handle PDF file upload and text extraction
    const handlePdfUpload = async () => {
        if (!pdfFile) return;

        const formData = new FormData();
        formData.append('file', pdfFile);

        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/upload-pdf',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setPdfText(response.data.text); // Extracted text from the PDF
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading the PDF.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Topic Description Generator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Enter Topic:</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />
                </div>
                <button type="submit">Generate Description</button>
            </form>
            {loading && <p>Loading...</p>}
            {description && (
                <div>
                    <h2>Description</h2>
                    <p>{description}</p>
                </div>
            )}

            <hr />
            <h1>Upload PDF for Text Extraction</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handlePdfUpload}>Upload and Extract Text</button>

            {loading && <p>Loading...</p>}
            {pdfText && (
                <div>
                    <h2>Extracted Text</h2>
                    <p>{pdfText}</p>
                </div>
            )}
        </div>
    );
};

export default App;
