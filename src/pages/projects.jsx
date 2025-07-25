import React, { useEffect, useState } from 'react';
import ProjectCard from './projectsCard';
import "./projects.css";
import { Link } from 'react-router-dom';
function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:3000/user/getProjects");
        const data = await res.json();
        setProjects(data.projects);
      } catch (err) {
        setError("Failed to fetch projects.");
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  if (loadingProjects) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="projects-container">
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            skills={project.skills}
            duration={project.duration}
            githubLink={project.githubLink}
            liveLink={project.liveLink}
            username={project.username}
            user_email={project.user_email}
          />
        ))}
      </div>
      <div className="add-project-button-container">
        <Link to="/addProject">Add project</Link>
        </div>
    </div>
  );
}

export default ProjectsPage;
