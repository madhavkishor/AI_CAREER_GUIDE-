import React, { useState } from "react";

import { MapPin, BriefcaseBusiness } from "lucide-react";

const JobCard = ({
  title,
  company,
  location,
  description,
  applyLink,
  fullDescription,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #818cf8, #6366f1);
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #6366f1, #4f46e5);
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #818cf8 #f1f5f9;
        }
      `}</style>

      {/* Job Card */}
      <div className="bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1 rounded-xl p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-indigo-700 mb-1 tracking-tight">
            {title}
          </h3>
          <p className="text-gray-800 font-medium">{company}</p>
          <p className="text-sm text-gray-500 mb-3">{location}</p>

          {description && (
            <p className="text-gray-600 text-sm leading-relaxed">
              {description.slice(0, 100)}
              {description.length > 100 ? "..." : ""}
            </p>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={openModal}
            className="inline-flex items-center justify-center text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-5 py-2 rounded-lg transition-all duration-200"
          >
            View Details
          </button>

          <a
            href={applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 px-5 py-2 rounded-lg shadow-sm transition-all duration-200"
          >
            Apply Now
            <span className="ml-2 text-lg">→</span>
          </a>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-6"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="border-b border-gray-200 px-8 py-6 flex-shrink-0">
              <button
                onClick={closeModal}
                className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-2xl font-light transition-all duration-200 focus:outline-none"
              >
                ×
              </button>

              <h2 className="text-3xl font-bold text-indigo-700 mb-3 pr-8">
                {title}
              </h2>
              <div className="flex items-center gap-4 text-gray-600">
                <span>
                  <BriefcaseBusiness size={20} />
                </span>

                <p className="font-semibold text-gray-800">{company}</p>
                <span className="text-gray-300">•</span>
                <p className="text-sm flex items-center gap-1">
                  <span>
                    <MapPin size={20} />
                  </span>
                  {location}
                </p>
              </div>
            </div>

            {/* Scrollable Content with Custom Scrollbar */}
            <div className="overflow-y-auto flex-1 px-8 py-6 custom-scrollbar">
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Job Description
                </h3>
                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                  {fullDescription ||
                    description ||
                    "Detailed job information not available."}
                </p>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="border-t border-gray-200 px-8 py-5 flex justify-end gap-3 flex-shrink-0 bg-gray-50 rounded-b-2xl">
              <button
                onClick={closeModal}
                className="text-sm font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 px-6 py-2.5 rounded-lg transition-all duration-200"
              >
                Close
              </button>
              <a
                href={applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 px-6 py-2.5 rounded-lg shadow-md transition-all duration-200 inline-flex items-center gap-2"
              >
                Apply Now
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;
