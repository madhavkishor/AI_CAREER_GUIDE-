

export const mapJobCard = (job) => {
    return {
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        applyLink: job.applyLink,
        salary: job.salary || job.job_salary || "Not specified",
        postedAt: job.postedAt || job.posted_at || "Unknown"
    };
}

export const mapJobArray = (response) => {
    // if response is an array
    if (Array.isArray(response)) return response.map(mapJobCard);

    // if response is wrapped in { data: [...] }
    if (response?.data) return response.data.map(mapJobCard);

    return [];
};
