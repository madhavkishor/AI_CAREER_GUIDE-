import React, { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(null);
  const [resumeText, setResumeText] = useState("");

  return (
    <ResumeContext.Provider
      value={{ resumeData, setResumeData, resumeText, setResumeText }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
export const useResume = () => useContext(ResumeContext);
