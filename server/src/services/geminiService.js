const axios = require("axios");

// Extract role, skills, interests
const extractResumeInsights = async (resumeText) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = "gemini-2.0-flash"; // You can switch this to gemini-pro or others
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const prompt = `
You are an expert career assistant. Given the following resume text, extract three things:
1. The candidate's most relevant job role (e.g., Frontend Developer, Data Analyst)
2. A list of key technical skills (max 10)
3. A few interests or domains they seem passionate about

Respond in this JSON format:
{
  "role": "...",
  "skills": ["...", "..."],
  "interests": ["...", "..."]
}

Remember: no extra text, markdown, or symbols — only the JSON format above.

Resume:
${resumeText}
`;

    const response = await axios.post(
        url,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { "Content-Type": "application/json" } }
    );

    let raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) throw new Error("No response from Gemini");

    raw = raw.trim().replace(/^```json\s*|\s*```$/g, "");
    console.log("AI response (insights):", raw);

    try {
        return JSON.parse(raw);
    } catch (err) {
        console.error("Failed to parse Gemini response:", raw);
        throw new Error("Gemini returned invalid JSON");
    }
};

// Map domains to related skills
const mapResumeDomains = async (resumeText) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = "gemini-2.0-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    // Validate resumeText
    if (!resumeText || typeof resumeText !== 'string') {
        console.error("❌ Invalid resumeText:", typeof resumeText, resumeText);
        return [];
    }

    const prompt = `You are a precise resume skill extractor. Your job is to analyze the resume and extract ONLY the actual skills, competencies, and expertise explicitly mentioned.

CRITICAL RULES:
1. Extract ONLY skills that are explicitly written in the resume text
2. Do NOT generate, assume, or infer any skills not present in the resume
3. Do NOT add example or sample skills
4. If a skill is not mentioned in the resume, DO NOT include it
5. Work with ANY type of resume: technical, non-technical, sales, telecaller, HR, etc.
6. Categorize extracted skills into appropriate domains based on the industry/role
7. If no clear skills are found, return an empty array []

DOMAIN EXAMPLES (use only if skills exist):
- For Tech: Web Development, Programming Languages, Databases, Cloud, DevOps, etc.
- For Sales/Telecaller: Communication, Customer Service, Sales Tools, CRM Software, etc.
- For HR: Recruitment, Employee Relations, HRIS, Talent Management, etc.
- For Finance: Accounting, Financial Analysis, Tax Planning, Auditing, etc.
- For Marketing: Digital Marketing, SEO, Content Creation, Social Media, etc.
- For General: Microsoft Office, Data Entry, Project Management, Leadership, etc.

Respond ONLY in this JSON format:
[
  {
    "domain": "Domain Name",
    "skills": ["skill1", "skill2", "skill3"],
    "count": 3
  },
  {
    "domain": "Another Domain",
    "skills": ["skillA", "skillB"],
    "count": 2
  }
]

If NO skills found in the resume, respond with: []

No extra text, markdown, code blocks, or symbols. Just the JSON array.

Resume Text:
${resumeText}
`;

    try {
        const response = await axios.post(
            url,
            {
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.1,
                    topK: 1,
                    topP: 0.8,
                    maxOutputTokens: 2048,
                }
            },
            { headers: { "Content-Type": "application/json" } }
        );

        let raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!raw) {
            console.error("❌ No response from Gemini");
            return [];
        }

        // Clean the response - handle all markdown code block variations
        raw = raw.trim();

        // Remove markdown code blocks (```json, ```javascript, ``` etc.)
        raw = raw.replace(/^```[a-z]*\n?/gi, '');
        raw = raw.replace(/\n?```$/g, '');

        // Remove any remaining backticks at start/end
        raw = raw.replace(/^`+|`+$/g, '');

        // Remove any leading/trailing whitespace again
        raw = raw.trim();

        console.log("✅ Cleaned AI response:", raw);

        // Parse JSON
        let parsedData;
        try {
            parsedData = JSON.parse(raw);
        } catch (parseError) {
            console.error("❌ JSON parse error:", parseError.message);
            console.error("❌ Raw response was:", raw);
            return [];
        }

        // Validate parsedData is an array
        if (!Array.isArray(parsedData)) {
            console.error("❌ Parsed data is not an array:", parsedData);
            return [];
        }

        // If empty array returned by AI, return it as is
        if (parsedData.length === 0) {
            console.log("ℹ️ No skills found in resume");
            return [];
        }

        // Convert resumeText to lowercase for case-insensitive matching
        const resumeLower = String(resumeText).toLowerCase();

        // Validate and filter domains
        const validatedData = parsedData
            .map(domain => {
                // Ensure domain object has required properties
                if (!domain || typeof domain !== 'object') {
                    return null;
                }

                // Ensure domain.skills is an array
                if (!Array.isArray(domain.skills)) {
                    return null;
                }

                // Filter skills that actually exist in the resume
                const validSkills = domain.skills.filter(skill => {
                    // Ensure skill is a string
                    if (typeof skill !== 'string' || skill.trim() === '') {
                        return false;
                    }

                    // Check if skill exists in resume (case-insensitive)
                    return resumeLower.includes(skill.toLowerCase().trim());
                });

                // Return domain with validated skills
                return {
                    domain: domain.domain || 'Uncategorized',
                    skills: validSkills,
                    count: validSkills.length
                };
            })
            .filter(domain => domain !== null && domain.count > 0); // Only keep domains with valid skills

        console.log("✅ Validated Data:", JSON.stringify(validatedData, null, 2));
        return validatedData;

    } catch (err) {
        console.error("❌ Error in mapResumeDomains:", err.message);
        if (err.response) {
            console.error("❌ API Error Response:", err.response.data);
        }
        return [];
    }
};


module.exports = {
    extractResumeInsights,
    mapResumeDomains
};