const mapJSearchResponse = (job) => {
    return {
        title: job.job_title,
        company: job.employer_name,
        location: `${job.job_city}, ${job.job_country}`,
        description: job.job_description,
        applyLink: job.job_apply_link,
        salary: job.job_salary
            ? `${job.job_salary} ${job.job_salary_currency}/${job.job_salary_period}`
            : "Not Specified",
        type: job.job_employment_type,
        postedAt: job.job_posted_at
    };
}

function mapJSearchArray(response) {
    return response.data.map(mapJSearchResponse);
}

module.exports = { mapJSearchResponse, mapJSearchArray }