const tests = [
  {
    name: 'Upload PDF document',
    steps: ['Click upload area', 'Select sample-legal-notice.pdf', 'Click Analyze'],
    expected: 'Text extracted, analysis shown',
    actual: ''
  },
  {
    name: 'Upload image document',
    steps: ['Click upload area', 'Select scanned_notice.jpg', 'Click Analyze'],
    expected: 'OCR extracts text, analysis shown',
    actual: ''
  },
  {
    name: 'Upload text file',
    steps: ['Click upload area', 'Select sample-legal-notice.txt', 'Click Analyze'],
    expected: 'Direct processing without OCR',
    actual: ''
  },
  {
    name: 'Hindi translation',
    steps: ['Select Hindi language', 'Analyze document'],
    expected: 'Summary translated to Hindi',
    actual: ''
  },
  {
    name: 'Play audio summary',
    steps: ['Click Play Audio Summary'],
    expected: 'Browser reads summary out loud',
    actual: ''
  },
  {
    name: 'Invalid file type',
    steps: ['Upload .exe file'],
    expected: 'Error message about invalid file type',
    actual: ''
  },
  {
    name: 'File too large',
    steps: ['Upload file > 10MB'],
    expected: 'Error message about file size limit',
    actual: ''
  },
  {
    name: 'Empty file',
    steps: ['Upload empty .txt'],
    expected: 'Validation error',
    actual: ''
  },
  {
    name: 'Deadline detection',
    steps: ['Upload sample notice'],
    expected: 'Deadline field contains date',
    actual: ''
  },
  {
    name: 'Action item extraction',
    steps: ['Upload sample notice'],
    expected: 'ActionRequired includes appear/submit',
    actual: ''
  }
];

export default tests;
