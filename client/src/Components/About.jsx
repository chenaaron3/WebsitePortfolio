import React, {Component} from "react";
import "./About.scss";

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            standing: "",
            major: "",
            school: "",
            goal: ""
        }
        let endpoints = ["/about/basics", "/about/goal"]
        endpoints.forEach(endpoint => {
            fetch(endpoint)
            .then(res => res.json())
            .then(json => this.setState(json));
        })
    }

    render() {
        return (
            <div className="section" id="about">
                <div data-aos="fade-up">
                    <h1 className="title">1. About Me</h1>
                </div>
                <div id="about-body">
                    <div className="about-txt" data-aos="fade-up">
                        <h3>
                            Hello World! My name is {this.state.name} and I am a {this.state.position} at {this.state.company}. 
                            <br/><br/>
                            As a computer scientist, my goal is {this.state.goal}
                            <br/><br/>
                            To achieve this goal, I follow the principles of 'Learn By Doing'. The majority of my 
                            learning process involves hands-on projects. This portfolio showcases some 
                            of those projects. 
                        </h3>
                    </div>
                    <div className="about-pic" data-aos="fade-up">
                        <img src="/profile.jpg" alt="profile"/>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default About;
