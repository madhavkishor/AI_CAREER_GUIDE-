import { useState } from "react";
import { parseResume } from "../api/resumeApi";
import { useNavigate } from "react-router-dom";
import pdfToText from "react-pdftotext";
import { useResume } from "../context/ResumeContext";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";

export const ResumeForm = () => {
  const { setResumeData } = useResume();
  const { setResumeText } = useResume();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    const maxSize = 10 * 1024 * 1024;
    const allowedTypes = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload a PDF, TXT, DOC, or DOCX file");
      setFile(null);
      return;
    }

    if (selectedFile.size > maxSize) {
      setError("File size must be less than 10MB");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const text = await pdfToText(file);
      setResumeText(text);
      const parsed = await parseResume(text);
      console.log("Parsed resume:", parsed);
      setResumeData(parsed);

      navigate("/results");
    } catch (err) {
      console.error("Resume parsing failed:", err.message);
      setError(
        "Failed to parse resume. Please try again or use a different file."
      );
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  return (
    <div className="w-full">
      {/* Main Form Card with Enhanced Design */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-500/10 border border-indigo-100/50 overflow-hidden relative">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500"></div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enhanced Upload Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
                dragActive
                  ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 scale-[1.02] shadow-lg"
                  : "border-indigo-200 bg-gradient-to-br from-gray-50 to-slate-50 hover:border-indigo-400 hover:shadow-md"
              }`}
            >
              <input
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="file-upload"
              />

              {/* Animated Cloud Icon with Glow */}
              <div className="relative mb-4">
                <div
                  className={`absolute inset-0 blur-xl opacity-30 ${
                    dragActive ? "bg-indigo-400" : "bg-gray-300"
                  }`}
                ></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-16 w-16 relative transition-all duration-300 ${
                    dragActive ? "text-indigo-600 scale-110" : "text-indigo-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01.88-7.906A5.002 5.002 0 0117 9h1a4 4 0 010 8H7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 12v9m0 0l-3-3m3 3l3-3"
                  />
                </svg>
              </div>

              {!file ? (
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold text-gray-900">
                    Drag & drop your resume here
                  </p>
                  <p className="text-sm text-gray-600">or click to browse</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 border border-gray-200 shadow-sm">
                      PDF
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 border border-gray-200 shadow-sm">
                      DOC
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 border border-gray-200 shadow-sm">
                      DOCX
                    </span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-600 border border-gray-200 shadow-sm">
                      TXT
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Max 10MB</p>
                </div>
              ) : (
                <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="px-4 py-2 text-xs text-red-600 hover:text-white hover:bg-red-600 font-medium rounded-lg border border-red-200 hover:border-red-600 transition-all duration-200"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Error Message with Enhanced Design */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl shadow-sm">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                </div>
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            )}

            {/* Enhanced Submit Button */}
            <button
              type="submit"
              disabled={!file || loading}
              className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white py-4 rounded-xl font-semibold text-base shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Analyzing Resume...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Find My Perfect Jobs
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-indigo-50/50 to-blue-50/50 px-8 py-5 border-t border-indigo-100/50">
          <div className="flex items-start gap-3 text-sm">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-sm">
              <Shield className="h-4 w-4 text-white flex-shrink-0" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">
                Your privacy is protected
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your resume is securely processed and never shared without
                consent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Benefits Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "AI-Powered Matching",
            description: "Advanced algorithms find your best job matches",
            gradient: "from-indigo-500 to-blue-600",
          },
          {
            title: "Instant Results",
            description: "Get personalized job recommendations in seconds",
            gradient: "from-blue-500 to-cyan-600",
          },
          {
            title: "100% Free",
            description: "No hidden fees or charges, ever",
            gradient: "from-purple-500 to-indigo-600",
          },
        ].map((benefit, index) => (
          <div
            key={index}
            className="group relative overflow-hidden text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-indigo-100/50 hover:scale-[1.03] hover:-translate-y-1"
          >
            {/* Gradient overlay on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            ></div>

            <div className="relative">
              <h3 className="font-bold text-gray-900 mb-2 text-base">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
