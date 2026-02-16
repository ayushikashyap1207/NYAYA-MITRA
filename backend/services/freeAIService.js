class FreeAIService {
  simplifyDocument(text, language = 'en') {
    const documentType = this.detectDocumentType(text);
    const mainPurpose = this.extractMainPurpose(text);
    const keyPoints = this.extractKeyPoints(text);
    const actionRequired = this.extractAction(text);
    const deadline = this.extractDeadline(text);
    const parties = this.extractParties(text);
    const summary = this.createSimpleSummary(text);

    return {
      documentType,
      mainPurpose,
      keyPoints,
      actionRequired,
      deadline,
      parties,
      summary,
      language
    };
  }

  detectDocumentType(text) {
    const lower = text.toLowerCase();
    if (lower.includes('court') && lower.includes('notice')) return 'Court Notice';
    if (lower.includes('legal notice')) return 'Legal Notice';
    if (lower.includes('agreement') || lower.includes('contract')) return 'Contract';
    if (lower.includes('summons')) return 'Summons';
    if (lower.includes('order')) return 'Court Order';
    return 'Legal Document';
  }

  extractMainPurpose(text) {
    const lines = text.split(/\n|\r/).map((line) => line.trim()).filter(Boolean);
    const subjectLine = lines.find((line) => /subject|regarding|re:/i.test(line));
    if (subjectLine) return subjectLine;
    return lines[0] || 'Purpose not clearly stated.';
  }

  extractKeyPoints(text) {
    const points = [];
    const lines = text.split(/\n|\r/).map((line) => line.trim()).filter(Boolean);

    for (const line of lines) {
      if (/(\bmust\b|\bshall\b|\brequired\b|\bwithin\b|\bdeadline\b|\bnotice\b)/i.test(line)) {
        points.push(line);
      }
      if (points.length >= 5) break;
    }

    return points.length ? points : ['Key points could not be reliably extracted.'];
  }

  extractAction(text) {
    const actionRegex = /(appear in court|submit|pay|respond|reply|provide|file|produce)\b[^.\n]*/i;
    const match = text.match(actionRegex);
    return match ? match[0].trim() : 'No explicit action detected.';
  }

  extractDeadline(text) {
    const dateRegex = /\b\d{2}\/\d{2}\/\d{4}\b/;
    const deadlineRegex = /(on or before|by|before|within)\s+([^.\n]+)/i;

    const dateMatch = text.match(dateRegex);
    const deadlineMatch = text.match(deadlineRegex);

    if (dateMatch) return dateMatch[0].trim();
    if (deadlineMatch) {
      const strictDate = deadlineMatch[0].match(dateRegex);
      return strictDate ? strictDate[0].trim() : 'Deadline not detected.';
    }
    return 'Deadline not detected.';
  }

  extractParties(text) {
    const parties = { sender: null, recipient: null };

    const plaintiffMatch = text.match(/plaintiff\s*[:\-]\s*(.+)/i);
    const defendantMatch = text.match(/defendant\s*[:\-]\s*(.+)/i);
    const fromMatch = text.match(/from\s*[:\-]\s*(.+)/i);
    const toMatch = text.match(/to\s*[:\-]\s*(.+)/i);

    parties.sender = plaintiffMatch?.[1]?.trim() || fromMatch?.[1]?.trim() || 'Not specified';
    parties.recipient = defendantMatch?.[1]?.trim() || toMatch?.[1]?.trim() || 'Not specified';

    return parties;
  }

  createSimpleSummary(text) {
    const sentences = text
      .replace(/\s+/g, ' ')
      .split('.')
      .map((s) => s.trim())
      .filter(Boolean);

    const summaryParts = sentences.slice(0, 2);
    return summaryParts.length ? summaryParts.join('. ') + '.' : 'Summary not available.';
  }

  generateVoiceSummary(analysis, language = 'en') {
    return `Document type: ${analysis.documentType}. Main purpose: ${analysis.mainPurpose}. Action required: ${analysis.actionRequired}. Deadline: ${analysis.deadline}.`;
  }
}

export default new FreeAIService();
