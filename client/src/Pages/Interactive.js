import React from 'react';

import Terminal from '../Components/Terminal';
import "./Interactive.scss"


function InteractiveApp() {
    return (
        <div className="interactive-page">
            <div className="interactive-terminal">
                <Terminal />
            </div>
        </div>
    );
}

export default InteractiveApp;