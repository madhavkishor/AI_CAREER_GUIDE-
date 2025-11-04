import React, { useState, useEffect } from "react";

const Loader = () => {
  const messages = [
    "Loading jobs",
    "Finding opportunities",
    "Searching positions",
    "Fetching listings",
    "Looking for matches"
  ];
  
  const [currentMessage, setCurrentMessage] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="flex items-center gap-1">
            <p className="text-indigo-600 text-lg font-medium">{messages[currentMessage]}</p>
            <div className="flex gap-1 text-indigo-600">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;