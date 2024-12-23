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

import { GoogleGenerativeAI } from "@google/generative-ai";




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


// app.get('/api/files/preview/page', async (req, res) => {
//   try {
//     const { dir, page } = req.query;

//     if (!dir) {
//       return res.status(400).json({ error: "Directory path is required" });
//     }

//     if (!page || isNaN(page) || page < 1) {
//       return res.status(400).json({ error: "Valid page number is required" });
//     }

//     const previewIndex = dir.indexOf('/preview/');
//     if (previewIndex === -1) {
//       return res.status(400).json({ error: "Invalid directory format in 'dir' field" });
//     }

//     const filePathbuf = decodeURIComponent(dir.substring(previewIndex + '/preview/'.length)).replace(/\//g, '\\');
//     const pdfPath = `${BASE_DIR}\\${filePathbuf}`;

//     if (!fs.existsSync(pdfPath)) {
//       return res.status(404).json({ error: "PDF file not found" });
//     }

//     const pdfBuffer = fs.readFileSync(pdfPath);
//     const pdfDoc = await PDFDocument.load(pdfBuffer);

//     if (page > pdfDoc.getPageCount()) {
//       return res.status(400).json({ error: `Page number exceeds total pages (${pdfDoc.getPageCount()}) in the PDF` });
//     }

//     // Extract the specific page
//     const extractedPage = pdfDoc.getPage(Number(page) - 1); // Page indices start from 0
//     const newPdfDoc = await PDFDocument.create();
//     const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [Number(page) - 1]);
//     newPdfDoc.addPage(copiedPage);

//     const newPdfBytes = await newPdfDoc.save();

//     // Serve the extracted page as a downloadable PDF
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `inline; filename=page-${page}.pdf`);
//     res.send(Buffer.from(newPdfBytes));
//   } catch (error) {
//     console.error('Error processing PDF:', error);
//     res.status(500).json({ error: 'Failed to process PDF page' });
//   }
// });





// Route to handle PDF upload and text extraction

async function extractPageRangeAndText(pdfPath, startPage, endPage) {
  const outputPath = 'output.pdf';

  // Read the existing PDF
  const pdfBytes = fs.readFileSync(pdfPath);

  // Load the PDFDocument
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Create a new PDFDocument
  const newPdf = await PDFDocument.create();

  // Ensure the page range is valid
  if (startPage < 1 || endPage > pdfDoc.getPageCount()) {
    throw new Error('Invalid page range');
  }

  // Extract the specified range of pages
  for (let i = startPage - 1; i < endPage; i++) {
    const [page] = await newPdf.copyPages(pdfDoc, [i]);
    newPdf.addPage(page);
  }

  // Serialize the new PDF and write it to a file
  const newPdfBytes = await newPdf.save();
  fs.writeFileSync(outputPath, newPdfBytes);

  console.log(`Pages ${startPage} to ${endPage} extracted to ${outputPath}`);

  // Use pdf-parse to extract text
  const pdfBuffer = fs.readFileSync(outputPath);
  const pdfData = await pdfParse(pdfBuffer);

  // Delete the newly created file
  fs.unlink(outputPath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err.message}`);
    } else {
      console.log(`Temporary file ${outputPath} deleted.`);
    }
  });

  return pdfData.text;
}

app.post('/prompt',async(req,res)=>{
  const genAI = new GoogleGenerativeAI(process.env.GEM_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const {prompt}=req.body;
  // console.log(req.body)
  try{
    const result = await model.generateContent(prompt);
    const markdownResult = result.response.text();
    const plainText = markdownResult.replace(/[#_*`]/g, "");
    res.json({ text: plainText});
  }catch(err){
    console.log(err)
  }
})

app.post('/summarise', async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEM_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  
  try {
    const { dir, pageRange } = req.body; // Access 'dir' and 'page' from the request body
    console.log(pageRange);
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
    if(pageRange[0]==pageRange[1]){
      const textData=await extractPageRangeAndText(pdfPath,pageRange[0],pageRange[0]);
      // res.json({text:textData});
      const prompt = `Summarize the following text in brief also expand the topic:\n\n${textData}`;
      const result = await model.generateContent(prompt);
      const markdownResult = result.response.text();
      const plainText = markdownResult.replace(/[#_*`]/g, "");
      res.json({ text: plainText});
    }else{
      const textData=await extractPageRangeAndText(pdfPath,pageRange[0],pageRange[1]);
      // res.json({text:textData});
      const prompt = `Summarize the following text in brief also expand the topic:\n\n${textData}`;
      const result = await model.generateContent(prompt);
      
      const markdownResult = result.response.text();
      const plainText = markdownResult.replace(/[#_*`]/g, "");
      res.json({ text: plainText});
    }
    // const textData=await extractPageRangeAndText(pdfPath,1,2);
    // console.log(textData)
    // res.json({text:textData});
    
    // const pdfBuffer = fs.readFileSync(pdfPath);

    // Parse the PDF
    // const pdfData = await pdfParse(pdfBuffer);
    // res.json({text:pdfData.text});
    // const prompt = `Summarize the following text in brief:\n\n${pdfData.text}`;
    // const result = await model.generateContent(prompt);
    
    // const markdownResult = result.response.text();
    // const plainText = markdownResult.replace(/[#_*`]/g, "");
    // res.json({ text: plainText});
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).send({ error: 'Failed to process PDF' });
  }
});


// ---------------------Summarise-----------------------------


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

// // 2. Upload file
// app.post("/api/files/upload", upload.single("file"), (req, res) => {
// if (!req.file) {
//   return res.status(400).json({ error: "No file uploaded" });
// }
// res.json({ message: "File uploaded successfully", file: req.file.originalname });
// });

// 3. Download file
app.get("/api/files/download/:filename", (req, res) => {
const filePath = path.join(BASE_DIR, req.params.filename);

if (!fs.existsSync(filePath)) {
  return res.status(404).json({ error: "File not found" });
}

res.download(filePath);
});

// 4. Delete file
// app.delete("/api/files/delete/:filename", async (req, res) => {
// const filePath = path.join(BASE_DIR, req.params.filename);

// try {
//   await fs.promises.unlink(filePath);
//   res.json({ message: "File deleted successfully" });
// } catch (err) {
//   res.status(500).json({ error: "Unable to delete file" });
// }
// });

// Serve file for preview
app.get("/api/files/preview/:filename", (req, res) => {
  
  const filePath = path.join(BASE_DIR, req.params.filename);
  console.log(filePath)
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
