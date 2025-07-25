import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/home";
import Hw from "./pages/Home";
import Log from "./pages/register";
import Login from "./pages/login";
import ProjectsPage from "./pages/projects";
import JobsPage from "./pages/jobs";
import Profile from "./pages/profile";
import Admin from "./pages/admin";
import Connect from "./pages/connect"
import AdminLogin from "./pages/verifyAdmin";
import AddProject from "./pages/addProject";
function App() {
  return (
    <Router>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<Hw />} />
        <Route path="/register" element={<Log/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/projects" element={<ProjectsPage/>}/>
        <Route path="/jobs" element={<JobsPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/connect" element={<Connect/>}/>
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/profile/:email" element={<Profile />} />
        <Route path="/addProject" element={<AddProject />} />
      </Routes>
    </Router>
  );
}

export default App;
