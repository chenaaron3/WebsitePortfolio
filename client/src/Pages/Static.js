import React from 'react';

// components
import Sidebar from "../Components/Sidebar";
import Navigation from "../Components/Navigation";
import Introduction from "../Components/Introduction";
import About from "../Components/About";
import Experience from "../Components/Experience";
import Projects from "../Components/Projects";
import Contact from "../Components/Contact";

function StaticApp() {
  return (
    <div>
        <Navigation/>
        <div className="content">
            <Introduction/>
            <About/>
            <Experience/>
            <Projects/>
            <Contact/>
        </div>
        <hr/>
        <Sidebar/>
        <footer>
            <a href="https://github.com/chenaaron3/WebsitePortfolio" target="_blank" rel="noopener noreferrer"><h3>Created by Aaron Chen</h3></a>
        </footer>
    </div>
  );
}

export default StaticApp;
