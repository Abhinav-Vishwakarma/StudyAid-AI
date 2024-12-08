import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import fs from "fs";
import path from "path";

dotenv.config({ path: "../.env" });

const app = express();
const PORT = 5000;
// Base directory setup
const BASE_DIR = path.resolve("uploads");
if (!fs.existsSync(BASE_DIR)) {
  fs.mkdirSync(BASE_DIR, { recursive: true });
}

// Enable CORS
app.use(cors());

// Middleware to parse JSON body
app.use(express.json());

// Set up multer for file uploads (in-memory storage for PDFs)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

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
// app.post('/upload-pdf', upload.single('file'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).send({ error: 'No file uploaded' });
//         }

//         // Extract text from the uploaded PDF file
//         const pdfBuffer = req.file.buffer;
//         const data = await pdfParse(pdfBuffer);

//         // Return the extracted text
//         res.json({ text: data.text });
//     } catch (error) {
//         console.error('Error processing PDF:', error);
//         res.status(500).send({ error: 'Failed to process PDF' });
//     }
// });

// Set up Multer storage to preserve original filenames and dynamic directories
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const targetDir = req.query.dir
      ? path.join(BASE_DIR, req.query.dir)
      : BASE_DIR;

    // Ensure the target directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Preserve the original file name
  },
});

const upload = multer({ storage });


// Routes

// 1. List files and directories
app.get("/api/files", async (req, res) => {
const dir = req.query.dir ? path.join(BASE_DIR, req.query.dir) : BASE_DIR;

try {
  const items = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = items.map((item) => ({
    name: item.name,
    type: item.isDirectory() ? "directory" : "file",
  }));
  res.json(files);
} catch (err) {
  res.status(500).json({ error: "Unable to list files" });
}
});

// 2. Upload file
app.post("/api/files/upload", upload.single("file"), (req, res) => {
if (!req.file) {
  return res.status(400).json({ error: "No file uploaded" });
}
res.json({ message: "File uploaded successfully", file: req.file.originalname });
});

// 3. Download file
app.get("/api/files/download/:filename", (req, res) => {
const filePath = path.join(BASE_DIR, req.params.filename);

if (!fs.existsSync(filePath)) {
  return res.status(404).json({ error: "File not found" });
}

res.download(filePath);
});

// 4. Delete file
app.delete("/api/files/delete/:filename", async (req, res) => {
const filePath = path.join(BASE_DIR, req.params.filename);

try {
  await fs.promises.unlink(filePath);
  res.json({ message: "File deleted successfully" });
} catch (err) {
  res.status(500).json({ error: "Unable to delete file" });
}
});

// Serve file for preview
app.get("/api/files/preview/:filename", (req, res) => {
  const filePath = path.join(BASE_DIR, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  const fileExtension = path.extname(filePath).toLowerCase();

  // Set appropriate content type based on file extension
  if (fileExtension === ".jpg" || fileExtension === ".jpeg" || fileExtension === ".png" || fileExtension === ".gif") {
    res.sendFile(filePath, { headers: { "Content-Type": "image/jpeg" } });
  } else if (fileExtension === ".mp4") {
    res.sendFile(filePath, { headers: { "Content-Type": "video/mp4" } });
  } else if (fileExtension === ".webm") {
    res.sendFile(filePath, { headers: { "Content-Type": "video/webm" } });
  } else if (fileExtension === ".ogg") {
    res.sendFile(filePath, { headers: { "Content-Type": "video/ogg" } });
  } else if (fileExtension === ".pdf") {
    res.sendFile(filePath, { headers: { "Content-Type": "application/pdf" } });
  } else {
    res.sendFile(filePath);
  }
});


app.get("/notes",(req,res)=>{
  res.sendFile("frontend\src\pages\Note.js")
})


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
