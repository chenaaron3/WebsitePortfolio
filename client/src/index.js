import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

// redirect relative paths to server url
axios.defaults.baseURL = 'https://s2mka2jkrj.execute-api.us-east-1.amazonaws.com/prod';

ReactDOM.render(
    <Router basename={process.env.PUBLIC_URL}>
        <App />
    </Router>,
    document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
