import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { processDocument, getSupportedLanguages, healthCheck } from '../controllers/documentController.js';

const router = express.Router();
const uploadDir = path.resolve('backend/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  }
});

const allowedExts = new Set(['.pdf', '.jpg', '.jpeg', '.png', '.txt']);
const allowedMime = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'text/plain'
]);

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExts.has(ext) && allowedMime.has(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPG, PNG, and TXT are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: Number(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024 }
});

router.post('/process', upload.single('document'), processDocument);
router.get('/languages', getSupportedLanguages);
router.get('/health', healthCheck);

export default router;
