import React from "react";
import "./jobCard.css";
function JobCard({title,company,location,job_type,exp,skills,link}) {
    return(
        <>
            <div className="job-card">
                <h2 className="job-title">{title}</h2>
                <h2 className="company-name">{company}</h2>
                <h2 className="location">{location}</h2>
                <h2 className="job_type">{job_type}</h2>
                <h2 className="exp">{exp}</h2>
                <div className="job-skills">
                    {
                        skills.map((skill,index)=>(
                            <span key={index} className="skill-badge">{skill}</span>
                        ))
                    }
                </div>
                <div className="job-link">
                <a href={link} target="_blank" rel="noopener noreferrer">Apply Link</a>
                </div>
            </div>
        </>
    )
}
export default JobCard;