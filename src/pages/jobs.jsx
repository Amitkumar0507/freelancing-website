import React, { useEffect, useState } from "react";
import JobCard from "./jobCard";
import "./jobs.css";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:3000/user/getJobs");
        const data = await res.json();
        setJobs(data.jobs);
      } catch (error) {
        setError("Failed to fetch Jobs...");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loadingJobs) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="job-container">
      <h1 className="job-name">Jobs</h1>
      <div className="job-grid">
        {jobs.map((job, index) => (
          <JobCard 
            key={index}
            title={job.title}
            company={job.company}
            location={job.location}
            job_type={job.job_type}
            exp={job.exp}
            skills={job.skills}
            link={job.link}
          />
        ))}
      </div>
    </div>
  );
}

export default JobsPage;
