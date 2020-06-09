import React, {Component} from "react";
import "./Work.scss";

class Work extends Component {
    render() {
        return (
            <div className="work-card" data-aos="zoom-in-up">
                <h1 className="work-position">{this.props.pos}</h1>
                <a href={this.props.companyLink} className="work-company" target="_blank" rel="noopener noreferrer">
                    @ {this.props.company}
                </a>
                <h3 className="work-duration">{this.props.fromto}</h3>
                <ul>
                    {
                        this.props.responsibilities.map((responsibility, index) =>
                            <li key={index}>
                                {responsibility}
                            </li>)
                    }
                </ul>
            </div>
        );
    }
}

export default Work;
