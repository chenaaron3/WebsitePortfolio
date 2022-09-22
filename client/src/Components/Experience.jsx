import React, { Component } from "react";
import "./Experience.scss";
import Work from "./Work";

class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: [],
            technologies: [],
            companies: []
        }
        let endpoints = ["/experience/techStack", "/experience/lockheed", "/experience/l3harris", "/experience/rubrik"]
        this.companies = ["rubrik", "lockheed", "l3harris"]
        endpoints.forEach(endpoint => {
            fetch(endpoint)
                .then(res => res.json())
                .then(json => {
                    let end = endpoint.split("/").pop();
                    if (this.companies.includes(end)) {
                        this.setState({ companies: [...this.state.companies, json] });
                    }
                    else {
                        this.setState(json);
                    }
                });
        })
    }

    render() {
        return (
            <div className="section" id="experience">
                <div data-aos="fade-up">
                    <h1 className="title">2. Experience</h1>
                </div>
                <div data-aos="fade-up">
                    <h2>Here are some of the skills I possess:</h2>
                </div>
                <div id="experience-lists" data-aos="fade-up">
                    <div className="experience-list" data-aos="fade-right">
                        <h1>Languages</h1>
                        <ul>
                            {
                                this.state.languages.map((value, index) =>
                                    <li key={index}>{value}</li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="experience-list" data-aos="fade-left">
                        <h1>Technologies</h1>
                        <ul>
                            {
                                this.state.technologies.map((value, index) =>
                                    <li key={index}>{value}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div data-aos="fade-up">
                    <h2>I have worked in the following positions:</h2>
                </div>
                <div id="work-cards" data-aos="fade-up">
                    {
                        this.state.companies.map((value, index) =>
                            <Work pos={value.position}
                                company={value.company}
                                companyLink={value.companyLink}
                                fromto={value.dates}
                                responsibilities={value.responsibilities}
                                key={index}
                            />
                        )
                    }
                </div>
                <hr />
            </div>
        );
    }
}

export default Experience;
