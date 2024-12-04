const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve(__dirname, '../uploads');

// List files and directories
exports.getFiles = (req, res) => {
    const dir = req.query.dir || BASE_DIR;
    fs.readdir(dir, { withFileTypes: true }, (err, items) => {
        if (err) return res.status(500).json({ error: 'Unable to list files' });
        const result = items.map((item) => ({
            name: item.name,
            type: item.isDirectory() ? 'directory' : 'file',
        }));
        res.json(result);
    });
};

// Upload file
exports.uploadFile = (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ message: 'File uploaded successfully', file: req.file.filename });
};

// Download file
exports.downloadFile = (req, res) => {
    const filePath = path.join(BASE_DIR, req.params.filename);
    res.download(filePath);
};

// Delete file
exports.deleteFile = (req, res) => {
    const filePath = path.join(BASE_DIR, req.params.filename);
    fs.unlink(filePath, (err) => {
        if (err) return res.status(500).json({ error: 'Unable to delete file' });
        res.json({ message: 'File deleted successfully' });
    });
};
