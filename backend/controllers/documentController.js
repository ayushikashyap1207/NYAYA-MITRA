import ocrService from '../services/ocrService.js';
import freeAIService from '../services/freeAIService.js';
import freeTranslationService from '../services/freeTranslationService.js';
import { logger } from '../utils/logger.js';
import fs from 'fs/promises';

export const processDocument = async (req, res, next) => {
  const file = req.file;
  const targetLanguage = req.body?.targetLanguage || 'en';

  if (!file) {
    return res.status(400).json({ success: false, error: 'No document uploaded.' });
  }

  try {
    const extractedText = await ocrService.extractText(file.path, file.mimetype);
    const cleanedText = ocrService.cleanText(extractedText);

    const analysis = freeAIService.simplifyDocument(cleanedText, 'en');
    const voiceSummary = freeAIService.generateVoiceSummary(analysis, targetLanguage);

    let translatedSummary = null;
    if (targetLanguage && targetLanguage !== 'en') {
      translatedSummary = await freeTranslationService.translateText(analysis.summary, 'en', targetLanguage);
    }

    const audioMetadata = freeTranslationService.textToSpeech(
      translatedSummary || analysis.summary,
      targetLanguage
    );

    await fs.unlink(file.path).catch(() => {});

    return res.json({
      success: true,
      analysis,
      translatedSummary,
      voiceSummary,
      audio: audioMetadata
    });
  } catch (error) {
    logger.error('Document processing failed', { error: error.message });
    await fs.unlink(file.path).catch(() => {});
    return next(error);
  }
};

export const getSupportedLanguages = async (req, res) => {
  return res.json({
    success: true,
    languages: freeTranslationService.getSupportedLanguages()
  });
};

export const healthCheck = async (req, res) => {
  return res.json({ status: 'ok', service: 'nyaya-mitra-document-api' });
};
