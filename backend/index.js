import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import multer from 'multer';
import pdfParse from 'pdf-parse';

dotenv.config({ path: "../.env" });

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

// Set up multer for file uploads (in-memory storage for PDFs)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle topic and description generation
app.post('/generate-description', async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic) {
            return res.status(400).send('Topic is required');
        }
        // console.log(topic)
        // Summarize the topic using Hugging Face model
        const summary = await axios.post(
            'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B',
            { inputs: topic },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                },
            }
        );
        // console.log(summary)
        // Return the generated description/summary
        res.json({ description: summary.data[0].generated_text });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating description.');
    }
});

// Route to handle PDF upload and text extraction
app.post('/upload-pdf', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }

        // Extract text from the uploaded PDF file
        const pdfBuffer = req.file.buffer;
        const data = await pdfParse(pdfBuffer);

        // Return the extracted text
        res.json({ text: data.text });
    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).send({ error: 'Failed to process PDF' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
