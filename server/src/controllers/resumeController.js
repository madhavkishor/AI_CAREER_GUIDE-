
const { extractResumeInsights } = require("../services/geminiService")

const parseResume = async (req, res) => {
    try {
        
        const { resumeText } = req.body;
        if (!resumeText) {
            return res.status(400).json({ status: "error", message: "Missing resumeText " })
        }
        const insights = await extractResumeInsights(resumeText);
        res.json({ status: "success", ...insights });

    } catch (error) {
        console.error("Resume parsing error :", error.message)
        res.status(500).json({ status: "error", message: "Resume parsing failed" })
    }
}

module.exports = { parseResume }