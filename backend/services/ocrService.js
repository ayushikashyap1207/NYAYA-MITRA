import Tesseract from 'tesseract.js';
import pdfParse from 'pdf-parse';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '../utils/logger.js';

class OCRService {
  async extractFromPDF(filePath) {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text || '';
    } catch (error) {
      logger.error('PDF extraction failed', { error: error.message });
      throw error;
    }
  }

  async extractFromImage(filePath, language = 'eng+hin') {
    try {
      const result = await Tesseract.recognize(filePath, language, {
        logger: () => {}
      });
      return result.data?.text || '';
    } catch (error) {
      logger.error('Image OCR failed', { error: error.message });
      throw error;
    }
  }

  async extractText(filePath, mimeType) {
    const ext = path.extname(filePath).toLowerCase();

    if (mimeType === 'application/pdf' || ext === '.pdf') {
      return this.extractFromPDF(filePath);
    }

    if (mimeType === 'text/plain' || ext === '.txt') {
      return fs.readFile(filePath, 'utf-8');
    }

    return this.extractFromImage(filePath);
  }

  cleanText(text) {
    if (!text) return '';
    return text
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();
  }
}

export default new OCRService();
