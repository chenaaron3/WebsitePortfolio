import React, { Component } from "react";
import "./Projects.scss";
import Project from "./Project";
import axios from 'axios';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            webDev: [],
            systems: []
        }
        let endpoints = ["/projects/webDev/syft", "/projects/webDev/stocks", "/projects/webDev/peterPortal", "/projects/webDev/portfolio", "/projects/webDev/allergize",
            "/projects/systems/allocator", "/projects/systems/shell", "/projects/systems/pintos"];
        endpoints.forEach(endpoint => {
            axios.get(endpoint)
                .then(res => {
                    let split = endpoint.split("/")
                    // project
                    split.pop();
                    let category = split.pop();
                    let dic = {}
                    dic[category] = [...this.state[category], res.data]
                    this.setState(dic);
                });
        })
    }

    render() {
        return (
            <div className="section" id="projects">
                <div data-aos="fade-up">
                    <h1 className="title">3. Projects</h1>
                </div>
                <div data-aos="fade-up">
                    <h1 className="project-section">System Design</h1>
                </div>
                <div className="projects" data-aos="fade-up">
                    {
                        this.state.systems.map((value, index) =>
                            <Project title={value.title}
                                description={value.description}
                                tags={value.tags}
                                extLink={value.extLink}
                                key={`systems-${index}`} />
                        )
                    }
                </div>
                <div data-aos="fade-up">
                    <h1 className="project-section">Web Development</h1>
                </div>
                <div className="projects" data-aos="fade-up">
                    {
                        this.state.webDev.map((value, index) =>
                            <Project title={value.title}
                                description={value.description}
                                tags={value.tags}
                                extLink={value.extLink} 
                                github={value.github}
                                pictures={value.pictures}
                                picpos={index % 2 ? "left" : "right"}
                                key={`webDev-${index}`} />
                        )
                    }
                </div>
                <hr />
            </div>
        );
    }
}

export default Projects;
