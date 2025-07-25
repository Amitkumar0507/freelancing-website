import React, { useState } from "react";
import { useUser } from "./UserContext";
import "./userForm.css";
import "./profile.css";
import Profile from "./profile";

const ProfileForm = () => {
  const { currentUser } = useUser(); // Get logged-in user info (e.g. email or id)
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    tag_line: "",
    bio: "",
    skills: "",
    projects: [{ title: "", description: "", techStack: "", link: "" }]
  });

  const handleTopLevelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProjectChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.projects];
    updatedProjects[index][name] = value;

    setFormData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));
  };

  const handleAddProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", techStack: "", link: "" }],
    }));
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      projects: updatedProjects,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      email: currentUser.email, // assuming you have email in context
      name: formData.name,
      tag_line: formData.tag_line,
      bio: formData.bio,
      skills: formData.skills.split(",").map((s) => s.trim()),
      projects: formData.projects.map((p) => ({
        title: p.title.trim(),
        description: p.description.trim(),
        techStack: p.techStack.split(",").map((s) => s.trim()),
        link: p.link.trim(),
      })),
    };

    try {
      const response = await fetch("http://localhost:3000/user/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true); // show profile after successful save
      } else {
        alert(result.message || "Failed to submit profile.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong!");
    }
  };

  if (submitted) return <Profile />;

  return (
    <div className="profile-form">
      <h2>Fill Your Profile Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Top-level form fields */}
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleTopLevelChange} required />
        </div>

        <div className="form-group">
          <label>Tag Line</label>
          <input name="tag_line" value={formData.tag_line} onChange={handleTopLevelChange} required />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleTopLevelChange} required />
        </div>

        <div className="form-group">
          <label>Skills (comma separated)</label>
          <input name="skills" value={formData.skills} onChange={handleTopLevelChange} required />
        </div>

        {/* Projects section */}
        <div className="form-group">
          <h3>Projects</h3>
          {formData.projects.map((project, index) => (
            <div key={index} className="project-input-group">
              <input name="title" value={project.title} onChange={(e) => handleProjectChange(e, index)} placeholder="Title" required />
              <textarea name="description" value={project.description} onChange={(e) => handleProjectChange(e, index)} placeholder="Description" required />
              <input name="techStack" value={project.techStack} onChange={(e) => handleProjectChange(e, index)} placeholder="Tech Stack" required />
              <input name="link" type="url" value={project.link} onChange={(e) => handleProjectChange(e, index)} placeholder="Project Link" />
              <button type="button" onClick={() => handleRemoveProject(index)}>Remove Project</button>
            </div>
          ))}
          <button type="button" onClick={handleAddProject}>+ Add Project</button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProfileForm;
