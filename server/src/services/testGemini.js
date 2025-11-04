
import { extractResumeInsights } from "./geminiService.js";
import dotenv from "dotenv";
dotenv.config();
;

(async () => {
    try {
        const sampleResume = `
      Aditya Joshi
      Full Stack Developer with 3 years of experience in React.js, Node.js, MongoDB.
      Interested in building scalable web apps and exploring cloud technologies.
    `;

        const insights = await extractResumeInsights(sampleResume);
        console.log("Parsed insights:", insights);
    } catch (err) {
        console.error("Test failed:", err);
    }
})();

