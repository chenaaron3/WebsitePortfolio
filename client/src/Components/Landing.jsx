import React from 'react';
import "./Landing.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import {
    Link
} from "react-router-dom";

function LandingApp() {
    return (
        <>
            <div id="landing">
                <h1 className="landing-welcome">
                    Welcome to my Portfolio!
                </h1>
                <div className="landing-panel">
                    <h2 className="landing-question">
                        Select a version you want to see:
                    </h2>
                    <div className="landing-actions">
                        <Link to='/interactive' className="landing-action">
                            {/* <FontAwesomeIcon icon={faAngleDoubleLeft} size="2x"/> */}
                            <span> Creative <br/> Terminal</span>
                        </Link>
                        <Link to='/static' className="landing-action">
                            <span> Standard <br/> Website</span>
                            {/* <FontAwesomeIcon icon={faAngleDoubleRight} size="2x"/> */}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
  }
  
  export default LandingApp;