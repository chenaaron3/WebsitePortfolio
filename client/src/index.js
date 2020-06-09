import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";

<<<<<<< HEAD
ReactDOM.render(<App />, document.getElementById('root'));

const http = require("http");

=======
ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);
>>>>>>> 227a125745fde8eb41247e30f96aa71762250aa3
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
