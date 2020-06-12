import React, { Component } from "react";
import "./Project.scss";
import Iframe from 'react-iframe';

class Project extends Component {

    render() {
        let mobile = window.matchMedia("(max-width: 480px)").matches;
        let connectorComponent = <hr className="project-connector" type="connection" />;
        let pictureComponent = this.props.pictures ? (<>
            {this.props.picpos === "right" && !mobile && connectorComponent}
            {this.props.pictures.map((url, index) => {
                if (mobile && index > 0) return <></>;
                return (<a className="project-image" href={this.props.extLink} target="_blank" rel="noopener noreferrer">
                    <img data-aos="zoom-in-up" src={url} key={index} height="300"></img>
                </a>)
            })}
            {this.props.picpos === "left" && !mobile && connectorComponent}
        </>) : <></>;
        return (
            <div className={this.props.pictures ? "project-block" : "project-card"}>
                {this.props.pictures && this.props.picpos == "left" && !mobile && pictureComponent}
                <div data-aos="zoom-in-up">
                    <div className={`project ${this.props.pictures ? "block" : "card"}`}>
                        <div className="project-header">
                            {this.props.github &&
                                <a href={this.props.github} target="_blank" className="project-external-link">
                                    <svg className="project-external-link">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                </a>
                            }
                            {this.props.extLink &&
                                <a href={this.props.extLink} target="_blank" className="project-external-link">
                                    <svg>
                                        <path fill="#000000" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                                    </svg>
                                </a>
                            }
                            <h1 className="project-title">{this.props.title}</h1>
                        </div>
                        <h3 className="project-description">{this.props.description}</h3>
                        <div className="project-information">
                            {this.props.tags.map((value, index) => {
                                return <span key={index}>{value}</span>
                            })}
                        </div>
                    </div>
                </div>
                {this.props.pictures && (this.props.picpos == "right" || mobile) && pictureComponent}
            </div>
        );
    }
}

export default Project;
