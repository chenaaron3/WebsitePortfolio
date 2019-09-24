import React, {Component} from "react";
import "./Introduction.scss";

class Introduction extends Component{
    render() {
        return(
            <div className="section" id="introduction">
                <h1 id="intro-greeting">Hello, my name is</h1>
                <h1 id="intro-name">Aaron Chen.</h1>
                <h1 id='intro-statement'>I build things on computers.</h1>
                <h1 id='intro-description'>
                    I am currently a Junior Computer Scientist student at the University of California,<br/>
                    Irvine, and I am currently exploring the many branches of Computer Science<br/>
                    including Machine Learning, Game Development, and Web Development.
                </h1>
                <a href="#contact" className="flashy-link" id="intro-contact-me">Contact Me</a>
                <hr/>
            </div>
        );
    }
}

export default Introduction;
