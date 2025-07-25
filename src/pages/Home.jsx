import React from "react";
import job from '../homeimg.png';
import "./home.css";
import { Link } from "react-router-dom";
function Hw() {
    return (
        <div className="home-container">
            <div className="home-left">
                <h1 style={{ color: "black" }}>Skill Connect...!</h1>
                <p>
                    Discover meaningful projects that match your passion.
                    Collaborate with people who value your skills and vision.
                </p>
                <Link to="/register">
                <button>Let's Connect</button>
                </Link>
            </div>
            <div className="home-right">
                <img src={job} alt="illustration" />
            </div>
        </div>
    );
}

export default Hw;
