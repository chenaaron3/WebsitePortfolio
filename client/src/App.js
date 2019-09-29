import React from 'react';
import "./App.scss";
import AOS from "aos";
import 'aos/dist/aos.css';

// components
import Sidebar from "./Componenets/Sidebar";
import Navigation from "./Componenets/Navigation";
import Introduction from "./Componenets/Introduction";
import About from "./Componenets/About";
import Experience from "./Componenets/Experience";
import Projects from "./Componenets/Projects";
import Contact from "./Componenets/Contact";

AOS.init();

function App() {
  return (
    <div className="app">
        <Sidebar/>
        <Navigation/>
        <div className="content">
            <Introduction/>
            <About/>
            <Experience/>
            <Projects/>
            <Contact/>
        </div>
        <hr/>
        <footer>
            <a href="https://github.com/chenaaron3/WebsitePortfolio" target="_blank"><h3>Created by Aaron Chen</h3></a>
        </footer>
    </div>
  );
}

export default App;
