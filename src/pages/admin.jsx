import React, { useState } from "react";
import "./admin.css";
function Admin() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    skills: "",
    duration: "",
    githubLink: "",
    liveLink: "",
    username:"",
  });

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "",
    exp: "",
    skills: "",
    link: "",
  });

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formattedProject = {
      ...project,
      skills: project.skills.split(",").map((skill) => skill.trim()),
      user_email:"mithunan600@gmail.com",
    };
    console.log("Submitting Project:", formattedProject);
    try {
      const response = await fetch("http://localhost:3000/user/projects",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(formattedProject),
      });
       const result =await response.json();
      if(response.ok)
      {
        alert("Form submitted succesfully");
      }
      else
      {
        alert( result.message || "failed in uploading project");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong!");
    }
    setProject({
      title: "",
      description: "",
      skills: "",
      duration: "",
      githubLink: "",
      liveLink: "",
      username:"",
    });
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const formattedJob = {
      ...job,
      skills: job.skills.split(",").map((skill) => skill.trim()),
    };
    console.log("Submitting Job:", formattedJob);
    try {
      const response = await fetch("http://localhost:3000/user/jobs",{
        method:"POST",
        headers:
        {
          "content-type":"application/json"
        },
        body:JSON.stringify(formattedJob)
      }); 
      const result = await response.json();
      if(response.ok)
      {
        alert("job Submitted successfully..!!")
      }
      else{
        alert(result.message || "Error is submittiing form")
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong!");
    }

    setJob({
      title: "",
      company: "",
      location: "",
      job_type: "",
      exp: "",
      skills: "",
      link: "",
    });
  };

  return (
    <div className="admin_page">
      <div className="post_projects">
        <h2>Post New Project</h2>
        <form onSubmit={handleProjectSubmit} className="project-form">
          <input type="text" name="title" placeholder="Project Title" value={project.title} onChange={handleProjectChange} required />
          <input type="text" name="duration" placeholder="Duration (e.g. Jan 2024 - Mar 2024)" value={project.duration} onChange={handleProjectChange} required />
          <textarea name="description" placeholder="Project Description" value={project.description} onChange={handleProjectChange} required />
          <input type="text" name="skills" placeholder="Skills (comma separated)" value={project.skills} onChange={handleProjectChange} required />
          <input type="url" name="githubLink" placeholder="GitHub Repository Link" value={project.githubLink} onChange={handleProjectChange} />
          <input type="url" name="liveLink" placeholder="Live Demo Link" value={project.liveLink} onChange={handleProjectChange} />
          <input type="text" name="username" placeholder="Enter your name" value={project.username} onChange={handleProjectChange}/>
          <button type="submit">Post Project</button>
        </form>
      </div>

      <div className="post_projects">
        <h2>Post New Job</h2>
        <form onSubmit={handleJobSubmit} className="project-form">
          <input type="text" name="title" placeholder="Job Title" value={job.title} onChange={handleJobChange} required />
          <input type="text" name="company" placeholder="Company Name" value={job.company} onChange={handleJobChange} required />
          <input type="text" name="location" placeholder="Location" value={job.location} onChange={handleJobChange} required />
          <input type="text" name="job_type" placeholder="Job Type (e.g. Full-time, Intern)" value={job.job_type} onChange={handleJobChange} required />
          <input type="text" name="exp" placeholder="Experience Required (e.g. 0-2 years)" value={job.exp} onChange={handleJobChange} required />
          <input type="text" name="skills" placeholder="Skills (comma separated)" value={job.skills} onChange={handleJobChange} required />
          <input type="url" name="link" placeholder="Apply Link" value={job.link} onChange={handleJobChange} required />
          <button type="submit">Post Job</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
