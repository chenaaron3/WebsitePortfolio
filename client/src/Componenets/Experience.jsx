import React, {Component} from "react";
import "./Experience.scss";
import Work from "./Work";

class Experience extends Component {
    render() {
        return (
            <div className="section" id="experience">
                <div data-aos="fade-up">
                    <h1 className="title">2. Experience</h1>
                </div>
                <div data-aos="fade-up">
                    <h2>Here are some of the skills I possess:</h2>
                </div>
                <div id="experience-list" data-aos="fade-up">
                    <div data-aos="fade-right">
                        <ul>
                            <h1>Languages</h1>
                            <li>Python</li>
                            <li>Java</li>
                            <li>C++</li>
                            <li>C#</li>
                            <li>JavaScript</li>
                            <li>HTML</li>
                            <li>(S)CSS</li>
                            <li>x86 Assembly</li>
                        </ul>
                    </div>
                    <div data-aos="fade-left">
                        <ul>
                            <h1>Technologies</h1>
                            <li>TensorFlow</li>
                            <li>Neural Networks</li>
                            <li>Unity</li>
                            <li>NodeJS</li>
                            <li>React</li>
                            <li>Express</li>
                        </ul>
                    </div>
                </div>
                <div data-aos="fade-up">
                    <h2>I have worked in the following positions:</h2>
                </div>
                <div id="work-cards" data-aos="fade-up">
                    <Work pos="Java Instructor"
                          company="My Learning Square"
                          companyLink="http://mylearningsquare.net/index.html"
                          fromto="June 2018 - July 2018"
                          responsibilities={
                              ["Taught middle and high school students the basics of Java programming language.",
                                  "Assembled a curriculum and conducted two hour lectures twice a week for six weeks.",
                                  "Communicated one-on-one with students to help debug or clarify programming concepts."]}
                    />
                    <Work pos="Java Instructor"
                          company="Green Apples Education"
                          companyLink="https://greenappleseducation.org/"
                          fromto="July 2019 - August 2019"
                          responsibilities={
                              ["Taught high school students advanced Java concepts including data structures and sorting algorithms.",
                                  "Followed a curriculum and conducted four hour lectures five times a week for three weeks."]}
                    />
                </div>
                <hr/>
            </div>
        );
    }
}

export default Experience;
