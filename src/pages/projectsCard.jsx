import React from 'react';
import './ProjectCard.css';
import { Link } from 'react-router-dom';

function ProjectCard({ title, description, skills, duration, githubLink, liveLink, username, user_email }) {
  return (
    <div className="project-card">
      <h2 className="project-title">{title}</h2>
      <p className="project-duration">{duration}</p>
      <p className="project-description">{description}</p>

      <div className="project-skills">
        {skills.map((skill, index) => (
          <span key={index} className="skill-badge">{skill}</span>
        ))}
      </div>

      <div className="project-links">
        <a href={githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={liveLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
      </div>

      <div className="host-user">
        <Link to={`/profile/${encodeURIComponent(user_email)}`} className="user-link">
          Hosted by <span className="user-name">{username}</span>
        </Link>
      </div>
    </div>
  );
}

export default ProjectCard;
