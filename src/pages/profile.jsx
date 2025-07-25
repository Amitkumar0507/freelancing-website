import React, { useEffect, useState } from "react";
import './profile.css';
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from './UserContext';
import ProfileForm from "./userForm";

const Profile = () => {
  const { email } = useParams(); // <- new
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const targetEmail = email || currentUser?.email;
      if (!targetEmail) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/user/userDetails?email=${targetEmail}`);
        const data = await res.json();
        if (data) {
          setProfile(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email, currentUser]);

  if (loading) return <p>Loading profile...</p>;

  if (!profile) {
    return (
      <>
        <ProfileForm />
        {currentUser && <button onClick={handleLogout}>Log Out</button>}
      </>
    );
  }

  return (
    <div className="profile-body">
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-name">{profile.name}</h1>
          <h2 className="tag-line">{profile.tag_line}</h2>
          <p className="profile-bio">{profile.bio}</p>
        </div>

        <div className="section">
          <h3>Skills</h3>
          <ul className="skills-list">
            {profile.skills?.map((skill, index) => (
              <li key={index} className="skill">{skill}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Projects</h3>
          <div className="projects">
            {profile.projects?.map((project, index) => (
              <div key={index} className="project-card">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <p><strong>Tech Stack:</strong> {project.techStack?.join(", ")}</p>
                <a href={project.link} target="_blank" rel="noreferrer">View Project</a>
              </div>
            ))}
          </div>
        </div>
        {currentUser && (currentUser.email === profile.email ? (
        <button onClick={handleLogout}>Log Out</button>
      ) : (
        <button onClick={() => alert("Let's connect feature coming soon!")}>Let's Connect</button>
      ))}

      </div>
    </div>
  );
};

export default Profile;
