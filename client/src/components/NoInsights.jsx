import React from "react";

const NoInsights = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-50 rounded-full mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m-4.244-3.03a4 4 0 1 1 8.488 0 5.421 5.421 0 0 0-8.488 0zM7.5 12a4.5 4.5 0 1 1 9 0c0 1.5-1.5 3-1.5 3H9s-1.5-1.5-1.5-3z"
            />
          </svg>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          No Insights Found
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          We couldn't find any insights for now
        </p>

        {/* Suggestions */}
        <div className="bg-indigo-50 rounded-lg p-4 text-left">
          <p className="text-sm font-semibold text-indigo-900 mb-2">Tips:</p>
          <ul className="text-sm text-indigo-700 space-y-1">
            <li>• Try uploading the resume first</li>
            <li>• The file must be a RESUME only</li>
            <li>• Must have some resume related data in your file</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoInsights;
