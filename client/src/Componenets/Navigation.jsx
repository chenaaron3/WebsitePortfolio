import React, {Component} from "react";
import "./Navigation.scss";
import Resume from "../Resume.pdf";

class Navigation extends Component {
    render() {
        return (
            <div className="nav-bar" data-aos="fade-down">
                <a href="#introduction" id="home"/>
                <ol className="nav-links">
                    <div data-aos="fade-down" data-aos-delay="50">
                        <li>
                            <a className="nav-link" href="#about">About</a>
                        </li>
                    </div>
                    <div data-aos="fade-down" data-aos-delay="100">
                        <li>
                            <a className="nav-link" href="#experience">Experience</a>
                        </li>
                    </div>
                    <div data-aos="fade-down" data-aos-delay="150">
                        <li>
                            <a className="nav-link" href="#projects">Projects</a>
                        </li>
                    </div>
                    <div data-aos="fade-down" data-aos-delay="200">
                        <li>
                            <a className="nav-link" href="#contact">Contact</a>
                        </li>
                    </div>

                </ol>
                <a href={Resume} target="_blank" rel="noopener noreferrer" className="flashy-link">Resume</a>
            </div>
        );
    }
}

export default Navigation;
