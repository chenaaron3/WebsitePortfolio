import React, {Component} from "react";
import "./Navigation.scss";
import Resume from "../Resume.pdf";

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
                <a href={Resume} target="_blank" rel="noopener noreferrer" className="flashy-link">Resume</a>
            </div>
        );
    }
}

export default Navigation;
