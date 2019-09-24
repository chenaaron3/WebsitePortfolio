import React, {Component} from "react";
import profile from "../Profile.jpg";
import "./About.scss";

class About extends Component {
    render() {
        return (
            <div className="section" id="about">
                <h1 className="title">1. About Me</h1>
                <div id="about-body">
                    <h3>
                        Hello World! My name is Aaron Chen and I am currently a Junior Computer Scientist major at the
                        University of California, Irvine. Technology is a rapidly growing field in the 21st century, so
                        the world of computers is becoming more vast and complex. I find it quite daunting to think
                        that I will have to lock in on a specific topic to study for a whole career.
                        <br/><br/>
                        To remedy this fear, I try to be a generalist and poke my interests in as many subjects as possible to see
                        what resonates with me the most. My hunger for knowledge is never satiated, so I am always looking
                        to learn new technologies. Join me in reviewing my journey to explore the world of computers
                        and software!
                    </h3>
                    <div>
                        <img src={profile} alt="profile"/>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default About;
