import React, {Component} from "react";
import "./Navigation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

class Navigation extends Component {
    render() {
        return (
            <div className="nav-bar" data-aos="fade-down">
                <a href="#introduction" id="home"/>
                <ol className="nav-links">
                    <li>
                        <div data-aos="fade-down" data-aos-delay="50">
                            <a className="nav-link" href="#about">About</a>
                        </div>
                    </li>
                    <li>
                        <div data-aos="fade-down" data-aos-delay="100">
                            <a className="nav-link" href="#experience">Experience</a>
                        </div>
                    </li>
                    <li>
                        <div data-aos="fade-down" data-aos-delay="150">
                            <a className="nav-link" href="#projects">Projects</a>
                        </div>
                    </li>
                    <li>
                        <div data-aos="fade-down" data-aos-delay="200">
                            <a className="nav-link" href="#contact">Contact</a>
                        </div>
                    </li>
                </ol>
                <div className="nav-resume">
                    <span className="nav-resume-header">Resumes <FontAwesomeIcon icon={faCaretDown}/></span>
                    <div className="nav-resume-content">
                        <a href="/systems.pdf" target="_blank" rel="noopener noreferrer">Systems</a>
                        <hr/>
                        <a href="/webDev.pdf" target="_blank" rel="noopener noreferrer">Web Dev</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
