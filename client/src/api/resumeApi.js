import axios from "axios"

const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const parseResume = async (resumeText) => {
    const res = await axios.post(`${BASE}/resume/parse`, { resumeText })
    return res.data;
}


export const analyzeResume = async (resumeText) => {
    const res = await axios.post(`${BASE}/jobs/analyze`, { resumeText })
    return res.data;
}


export const searchJobs = async ({ skills, role, location }) => {
    const res = await axios.post(`${BASE}/jobs/search`, { skills, role, location })
    return res.data.jobs;
}