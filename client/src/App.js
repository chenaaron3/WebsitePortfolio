import React from 'react';
// css
import "./PageTransitions/slideTransition.scss";
import "./App.scss";
import AOS from "aos";
import 'aos/dist/aos.css';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  withRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// pages
import StaticApp from "./Pages/Static";
import LandingApp from "./Pages/Landing";
import InteractiveApp from './Pages/Interactive';

AOS.init({
  once: true
});

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/static" />
          </Route>
          <Route exact path="/static" component={StaticApp} />
          <Route exact path="/interactive" component={InteractiveApp} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
