import { useState, useRef, useEffect } from 'react';
import {
  Upload,
  FileText,
  Volume2,
  CheckCircle,
  AlertCircle,
  Loader2,
  Languages,
  Calendar,
  Users,
  ArrowRight,
  Heart
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [file, setFile] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [languages, setLanguages] = useState({});
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const fileInputRef = useRef(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/documents/languages`);
        setLanguages(response.data?.languages || {});
      } catch (err) {
        setLanguages({ en: 'English', hi: 'Hindi' });
      }
    };

    fetchLanguages();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile || null);
    setError('');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile || null);
    setError('');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError('');
    setIsPlayingAudio(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const playAudioWithBrowser = (text, voiceCode) => {
    if (!window.speechSynthesis) {
      setError('Browser text-to-speech is not supported.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceCode || 'hi-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setError('Unable to play audio.');
    };

    utteranceRef.current = utterance;
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlayingAudio(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please upload a document first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('targetLanguage', targetLanguage);

      const response = await axios.post(`${API_URL}/api/documents/process`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 text-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold gradient-text">Nyaya-Mitra न्याय-मित्र</h1>
            <p className="text-slate-600 mt-2">Your Legal Friend — Simplifying Justice for Rural India</p>
          </div>
          <span className="badge-info flex items-center gap-2">
            <Heart className="w-4 h-4" /> 100% FREE MODE
          </span>
        </div>

        <div className="card p-6 mb-6 animate-fade-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Upload Document</label>
              <div
                className="upload-zone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-10 h-10 text-primary-500" />
                <div>
                  <p className="font-medium">Drag & drop your file here</p>
                  <p className="text-sm text-slate-500">PDF, JPG, PNG, TXT — max 10MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.txt"
                />
              </div>
              {file && (
                <div className="flex items-center gap-2 mt-3 text-sm text-slate-600">
                  <FileText className="w-4 h-4" /> {file.name}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Target Language</label>
              <div className="relative">
                <Languages className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                <select
                  value={targetLanguage}
                  onChange={(event) => setTargetLanguage(event.target.value)}
                  className="input-field pl-10"
                >
                  {Object.entries(languages).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" /> {error}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Analyze Document <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Reset
              </button>
            </div>
          </form>
        </div>

        {result?.success && (
          <div className="card p-6 space-y-6 animate-slide-up">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" /> Document processed successfully
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Summary</h2>
                <p className="text-slate-700">{result.translatedSummary || result.analysis.summary}</p>
              </div>
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Document Type</h2>
                <span className="badge-warning">{result.analysis.documentType}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <details className="card p-4 bg-slate-50">
                <summary className="font-semibold cursor-pointer">Main Purpose (click to read)</summary>
                <p className="mt-2 text-slate-700">{result.analysis.mainPurpose}</p>
              </details>
              <div className="space-y-2">
                <h3 className="font-semibold">Action Required</h3>
                <p>{result.analysis.actionRequired}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Deadline
                </h3>
                <p>{result.analysis.deadline}</p>
              </div>
              <details className="card p-4 bg-slate-50">
                <summary className="font-semibold cursor-pointer flex items-center gap-2">
                  <Users className="w-4 h-4" /> Parties (click to read)
                </summary>
                <div className="mt-2 text-slate-700">
                  <p>Sender: {result.analysis.parties?.sender}</p>
                  <p>Recipient: {result.analysis.parties?.recipient}</p>
                </div>
              </details>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Key Points</h3>
              <ul className="list-disc pl-6 space-y-1">
                {result.analysis.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={() => playAudioWithBrowser(result.voiceSummary, result.audio?.voiceCode)}
                disabled={isPlayingAudio}
              >
                <Volume2 className="w-4 h-4" /> Play Audio Summary
              </button>
              {isPlayingAudio && (
                <button type="button" className="btn-secondary" onClick={stopAudio}>
                  Stop Audio
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
