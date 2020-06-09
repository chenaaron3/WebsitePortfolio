import React, {Component} from "react";
import "./Introduction.scss";

class Introduction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            standing: "",
            major: "",
            school: ""
        }
        let endpoints = ["/about/basics"]
        endpoints.forEach(endpoint => {
            fetch(endpoint)
            .then(res => res.json())
            .then(json => this.setState(json));
        })
    }

    render() {
        return (
            <div className="section" id="introduction">
                <div data-aos="fade-down" data-aos-delay="250">
                    <h1 id="intro-greeting">Hi there! My name is</h1>
                </div>
                <div data-aos="fade-down" data-aos-delay="300">
                    <h1 id="intro-name">{this.state.name}.</h1>
                </div>
                <div data-aos="fade-down" data-aos-delay="350">
                    <h1 id='intro-statement'>I build things on computers.</h1>
                </div>
                <div data-aos="fade-down" data-aos-delay="400">
                    <h1 id='intro-description'>
                        I am a {this.state.standing} {this.state.major} student at {this.state.school}<br/>
                        and my interests are System Design and Web Development.<br/>
                    </h1>
                </div>
                <div data-aos="fade-down" data-aos-delay="400">
                    <a href="#contact" className="flashy-link" id="intro-contact-me">Contact Me</a>
                </div>
                <hr/>
            </div>
        );
    }
}

export default Introduction;
