




import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({path:"../.env"});

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

// Route to handle topic and description
app.post('/generate-description', async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic) {
            return res.status(400).send('Topic is required');
        }

        // Summarize the topic using Hugging Face model
        const summary = await axios.post(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            { inputs: topic },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                },
            }
        );

        // Return the generated description/summary
        res.json({ description: summary.data[0].summary_text });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating description.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
