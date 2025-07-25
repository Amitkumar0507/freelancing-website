import { Link } from "react-router-dom";
import "./nav.css";
import { useUser } from '../pages/UserContext'; 

function NavBar() {
  const { currentUser } = useUser();

  return (
    <nav className="navigation-bar">
      <div className="logo">
        <Link to="/">SkillConnect</Link>
      </div>
      <div className="nav-links">
      {currentUser && (
        <>
          <Link to="/projects">Projects</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/connect">Connect</Link>
          <Link to="/profile">Profile</Link>
        </>
      )}
      </div>

      <div className="login">
        {!currentUser && <Link to="/register">Register</Link>}
      </div>
    </nav>
  );
}

export default NavBar;
