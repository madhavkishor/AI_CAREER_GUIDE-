const { fetchJobsFromJsearch } = require("../services/jsearchService")
const { mapJSearchArray } = require("../utils/responseMapper")
const { mapResumeDomains } = require("../services/geminiService")


const searchJobs = async (req, res) => {
    try {
        const { skills, role, location } = req.body;

        const query = `${role || skills.join(" ")} in ${location}`

        const rawJobs = await fetchJobsFromJsearch(query)

        const jobs = mapJSearchArray(rawJobs)

        res.json({ status: "success", jobs })
    } catch (error) {
        console.error("Job search error :", error.message)
        res.status(500).json({ status: "error", message: "Job search failed" })
    }
}

const analyzeDomains = async (req, res) => {
    try {
        const { resumeText } = req.body;
        const analyzeResume = await mapResumeDomains(resumeText);
        console.log(analyzeResume)
        res.json({ status: "success", analyzeResume })
    } catch (error) {
        console.error("Resume analysis  error :", error.message)
        res.status(500).json({ status: "error", message: "Resume analysis falied" })

    }
}

module.exports = { searchJobs, analyzeDomains };