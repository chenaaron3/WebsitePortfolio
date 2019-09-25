import React, {Component} from "react";
import "./Project.scss";
import Iframe from 'react-iframe';

class Project extends Component {
    state = {opened: false}

    handleClick = (ev) => {
        this.setState({opened: !this.state.opened});
        this.target = ev.target.parentElement;
        setTimeout(this.scrollTo, 250);
    }

    scrollTo = () => {
        this.target.scrollIntoView(true);
    }

    render() {
        const activeVal = this.state.opened ? "active" : "";
        const showVal = this.state.opened ? "less" : "more";

        return (
            <div className={`project ${activeVal}`} data-aos={this.state.opened ? "" : "zoom-in-up"}>
                <svg className="project-external-link">
                    <path fill="#000000" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                </svg>git
                <h1 className="project-title">{this.props.title}</h1>
                {
                    this.state.opened &&
                    <div className="project-page">
                        <Iframe url={this.props.url} className="page"/>
                    </div>
                }
                <h3 className="project-description">{this.props.description}</h3>
                {
                    this.state.opened &&
                    <div className="project-information">
                        <div className="project-about">
                            <h1>About</h1>
                            {this.props.directions}
                        </div>
                        <div className="project-tools">
                            <h1>Tools</h1>
                            <ul>
                                {this.props.tools.map((tool, index) =>
                                    <li key={index}>{tool}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                }
                <a className="flashy-link project-expand" onClick={this.handleClick}>Show {showVal}</a>
            </div>
        );
    }
}

export default Project;
