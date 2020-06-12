import React, { Component } from "react";
import "./Projects.scss";
import Project from "./Project";

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            webDev: [],
            systems: []
        }
        let endpoints = ["/projects/webDev/peterPortal", "/projects/webDev/portfolio", "/projects/webDev/allergize",
            "/projects/systems/allocator", "/projects/systems/shell", "/projects/systems/pintos"];
        endpoints.forEach(endpoint => {
            fetch(endpoint)
                .then(res => res.json())
                .then(json => {
                    let split = endpoint.split("/")
                    let project = split.pop();
                    let category = split.pop();
                    let dic = {}
                    dic[category] = [...this.state[category], json]
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
