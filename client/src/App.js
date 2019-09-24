import React from 'react';
import "./App.scss";
import Navigation from "./Componenets/Navigation";
import Introduction from "./Componenets/Introduction";
import About from "./Componenets/About";
import Experience from "./Componenets/Experience";
import Projects from "./Componenets/Projects";
import Contact from "./Componenets/Contact";

function App() {
  return (
    <div className="app">
        <Navigation/>

        <div className="content">
            <Introduction/>
            <About/>
            <Experience/>
            <Projects/>
            <Contact/>
        </div>

        <footer>
            <hr/>
            <small>Copyright &copy; {new Date().getFullYear()}, Aaron Chen</small>
        </footer>
    </div>
  );
}

export default App;
