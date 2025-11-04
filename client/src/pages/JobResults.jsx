import React, { useEffect, useState } from "react";
import { searchJobs } from "../api/resumeApi";
import { mapJobArray } from "../utils/responseMapper";
import { useResume } from "../context/ResumeContext";
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import NoJobs from "../components/NoJobs";

const JobResults = () => {
  const { resumeData } = useResume();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resumeData) return;

    const fetchJobs = async () => {
      try {
        const rawJobs = await searchJobs({
          role: resumeData.role,
          skills: resumeData.skills,
          location: "Remote",
        });
        console.log("Raw Jobs from JSearch:", rawJobs);
        setJobs(mapJobArray(rawJobs));
      } catch (error) {
        console.error("Job search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [resumeData]);

  if (!resumeData) {
    return <NoJobs/>
  }

  if (loading) {
    return <Loader/>
  }

  if (jobs.length === 0) {
    return <NoJobs/>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-9">
      {jobs.map((job, idx) => (
        <JobCard
          key={idx}
          title={job.title}
          company={job.company}
          location={job.location}
          description={job.description}
          applyLink={job.applyLink}
        />
      ))}
    </div>
  );
};

export default JobResults;
