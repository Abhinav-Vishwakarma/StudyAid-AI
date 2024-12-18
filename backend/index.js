import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import fs from "fs";
import path from "path";
import mysql from "mysql";
import { PDFDocument } from 'pdf-lib';
dotenv.config({ path: "../.env" });
import * as pdfjsLib from 'pdfjs-dist';


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

const connection = mysql.createConnection({
  host: 'localhost',      // Database host
  user: 'root',  // Your database username
  password: '', // Your database password
  database: 'topic_metadata'  // The name of the database
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// // Example query
// connection.query('SELECT * FROM tc', (err, results) => {
//   if (err) {
//     console.error('Error executing query:', err.message);
//     return;
//   }
//   console.log('Query results:', results);
// });

// // Close the connection when done
// connection.end((err) => {
//   if (err) {
//     console.error('Error closing the connection:', err.message);
//     return;
//   }
//   console.log('Database connection closed.');
// });


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
            'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-32B-Instruct/v1/chat/completions',
            { 
              "model": "Qwen/Qwen2.5-Coder-32B-Instruct",
              "messages": [
              {
                "role": "user",
                "content": {topic}
              }
            ],
              "max_tokens": 500,
              "stream": false
          },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                },
            }
        );
        console.log(summary)
        // Return the generated description/summary
        // res.json({ description: summary.data[0].generated_text });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating description.');
    }
});
// Route to preview a specific page of the PDF
app.get('/api/files/preview/page', async (req, res) => {
  try {
    const { dir, page } = req.query;

    if (!dir) {
      return res.status(400).json({ error: "Directory path is required" });
    }

    if (!page || isNaN(page) || page < 1) {
      return res.status(400).json({ error: "Valid page number is required" });
    }

    const previewIndex = dir.indexOf('/preview/');
    if (previewIndex === -1) {
      return res.status(400).json({ error: "Invalid directory format in 'dir' field" });
    }

    const filePathbuf = decodeURIComponent(dir.substring(previewIndex + '/preview/'.length)).replace(/\//g, '\\');
    const pdfPath = `${BASE_DIR}\\${filePathbuf}`;

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: "PDF file not found" });
    }

    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    if (page > pdfDoc.getPageCount()) {
      return res.status(400).json({ error: `Page number exceeds total pages (${pdfDoc.getPageCount()}) in the PDF` });
    }

    // Extract the specific page
    const extractedPage = pdfDoc.getPage(Number(page) - 1); // Page indices start from 0
    const newPdfDoc = await PDFDocument.create();
    const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [Number(page) - 1]);
    newPdfDoc.addPage(copiedPage);

    const newPdfBytes = await newPdfDoc.save();

    // Serve the extracted page as a downloadable PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=page-${page}.pdf`);
    res.send(Buffer.from(newPdfBytes));
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({ error: 'Failed to process PDF page' });
  }
});





// Route to handle PDF upload and text extraction

app.post('/summarise', async (req, res) => {
  try {
    const { dir, page } = req.body; // Access 'dir' and 'page' from the request body
    console.log(page)
    if (!dir) {
      return res.status(400).json({ error: "Directory path is required" });
    }

    const previewIndex = dir.indexOf('/preview/');
    if (previewIndex === -1) {
      return res.status(400).json({ error: "Invalid directory format in 'dir' field" });
    }

    const filePathbuf = decodeURIComponent(dir.substring(previewIndex + '/preview/'.length)).replace(/\//g, '\\');
    const pdfPath = `${BASE_DIR}\\${filePathbuf}`;

    console.log(`Processing PDF file at: ${pdfPath}`);

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: "PDF file not found" });
    }

    const pdfBuffer = fs.readFileSync(pdfPath);

    // Parse the PDF
    const pdfData = await pdfParse(pdfBuffer);

    // if (page) {
    //   // Validate the page number
    //   if (isNaN(page) || page < 1 || page > pdfData.numpages) {
    //     return res.status(400).json({ error: `Invalid page number. Please provide a page between 1 and ${pdfData.numpages}` });
    //   }

    //   // Extract text from the specified page
    //   const pageText = pdfData.text
    //     .split(/\f/) // Pages in pdf-parse are separated by form feed ("\f")
    //     .map((pageText) => pageText.trim())[page - 1];

    //   if (!pageText) {
    //     return res.status(404).json({ error: `No text found on page ${page}` });
    //   }

    //   res.json({ page, text: pageText });
    // } else {
    //   // Extract the entire PDF text if no page is specified
    //   res.json({ text: pdfData.text });
    // }
    res.json({ text: pdfData.text });
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).send({ error: 'Failed to process PDF' });
  }
});


// ---------------------Summarise-----------------------------

// app.post('/summarise', async (req, res) => {
//   try {
//     const dir = req.body.dir; // Access 'dir' from the request body
//     const previewIndex = dir.indexOf('/preview/');
//     if (previewIndex !== -1) {
//       const filePathbuf = decodeURIComponent(dir.substring(previewIndex + '/preview/'.length)).replace(/\//g, '\\');
//       const pdfPath = `${BASE_DIR}\\${filePathbuf}`;
      
//       console.log(`Processing PDF file at: ${pdfPath}`);

//       // Ensure the file exists
//       if (!fs.existsSync(pdfPath)) {
//         return res.status(404).json({ error: "PDF file not found" });
//       }

//       // Read the PDF file and extract text
//       const pdfBuffer = fs.readFileSync(pdfPath);
//       const data = await pdfParse(pdfBuffer);
//       // console.log(data.text)
//       // Return the extracted text
//       // res.json({ text: data.text });
//       // const data_for_summary=JSON.stringify(data.text)
//       // const response = await fetch(
//       //   "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
//       //   {
//       //     headers: {
//       //       Authorization: "Bearer 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",
//       //       "Content-Type": "application/json",
//       //     },
//       //     method: "POST",
//       //     body: JSON.stringify(data.text),
//       //   }
//       // );
//       // const result = await response.json();
//       res.json({ text: data.text });
//       // return result;
//       console.log(result)
//     } else {
//       res.status(400).json({ error: "Invalid directory format in 'dir' field" });
//     }
//   } catch (error) {
//     console.error('Error processing PDF:', error);
//     res.status(500).send({ error: 'Failed to process PDF' });
//   }
// });

// Helper function to split text into chunks
// const chunkText = (text, maxLength) => {
//   const chunks = [];
//   let start = 0;
//   while (start < text.length) {
//     chunks.push(text.slice(start, start + maxLength));
//     start += maxLength;
//   }
//   return chunks;
// };

// // Endpoint to summarise PDF content
// app.post('/summarise', async (req, res) => {
//   try {
//     const dir = req.body.dir; // Access 'dir' from the request body
//     const previewIndex = dir.indexOf('/preview/');
//     if (previewIndex === -1) {
//       return res.status(400).json({ error: "Invalid directory format in 'dir' field" });
//     }

//     // Extract and decode the PDF path
//     const filePathbuf = decodeURIComponent(dir.substring(previewIndex + '/preview/'.length)).replace(/\//g, '\\');
//     const pdfPath = `${BASE_DIR}\\${filePathbuf}`;

//     console.log(`Processing PDF file at: ${pdfPath}`);

//     // Ensure the file exists
//     if (!fs.existsSync(pdfPath)) {
//       return res.status(404).json({ error: "PDF file not found" });
//     }

//     // Read the PDF file and extract text
//     const pdfBuffer = fs.readFileSync(pdfPath);
//     const data = await pdfParse(pdfBuffer);
//     const text = data.text;

//     // Split text into chunks
//     const chunks = chunkText(text, CHUNK_SIZE);

//     const summaries = [];
//     for (const chunk of chunks) {
//       console.log(`Sending chunk to summarization API: ${chunk.substring(0, 100)}...`);
//       const response = await fetch(
//         "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
//         {
//           headers: {
//             Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//           method: "POST",
//           body: JSON.stringify({
//             inputs: chunk,
//             parameters: {
//               min_length: 50,
//               max_length: 200,
//             },
//           }),
//         }
//       );

//       if (response.status !== 200) {
//         console.error(`Error from API: ${await response.text()}`);
//         return res.status(response.status).json({ error: 'Failed to summarize part of the text' });
//       }

//       const result = await response.json();
//       summaries.push(result[0].summary_text); // Append the summarized text
//     }

//     // Combine summaries and return
//     const combinedSummary = summaries.join(' ');
//     res.json({ text: combinedSummary });
//   } catch (error) {
//     console.error('Error processing PDF:', error);
//     res.status(500).send({ error: 'Failed to process PDF' });
//   }
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

app.get('/suggestions', (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.json([]);
  }

  // Query database for suggestions
  const sql = `SELECT topics,pdfPath,pageNumber FROM tc WHERE topics LIKE ? LIMIT 10`;
  const searchQuery = `%${query}%`;

  connection.query(sql, [searchQuery], (err, results) => {
    if (err) {
      console.error('Error fetching suggestions:', err);
      return res.status(500).json({ error: 'Database query error' });
    }
    // Return results
    console.log(results)
    // console.log(results.rows)
    res.json(results.map(row => row));
    // res.json(results)
  });
});





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
