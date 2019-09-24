import React, {Component} from "react";
import "./Navigation.scss";
import Resume from "../Resume.pdf";

class Navigation extends Component{
    render() {
        return (
            <div className="nav-bar">
                <a href="#introduction" id="home"/>
                <ol className="nav-links">
                    <li><a className="nav-link" href="#about">About</a></li>
                    <li><a className="nav-link" href="#experience">Experience</a></li>
                    <li><a className="nav-link" href="#projects">Projects</a></li>
                    <li><a className="nav-link" href="#contact">Contact</a></li>
                </ol>
                <a href={Resume} target="_blank" rel="noopener noreferrer" className="flashy-link">Resume</a>
            </div>
        );
    }
}

export default Navigation;
