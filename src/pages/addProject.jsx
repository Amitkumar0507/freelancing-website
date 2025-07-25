import React from "react";
import { useState } from "react";
import "./addProject.css";

function AddProject()
{
    const [project, setProject] = useState({
        title: "",
        description: "",
        skills: "",
        duration: "",
        githubLink: "",
        liveLink: "",
        username:"",
      });

      const handleProjectChange = (e) => {
        const { name, value } = e.target;
        setProject((prev) => ({
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
      </div>
    );
}

export default AddProject;