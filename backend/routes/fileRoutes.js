const express = require('express');
const multer = require('multer');
const { getFiles, uploadFile, downloadFile, deleteFile } = require('../controllers/fileController');

const router = express.Router();
const upload = multer({ dest: 'src/uploads/' });

router.get('/', getFiles);
router.post('/upload', upload.single('file'), uploadFile);
router.get('/download/:filename', downloadFile);
router.delete('/delete/:filename', deleteFile);

module.exports = router;

