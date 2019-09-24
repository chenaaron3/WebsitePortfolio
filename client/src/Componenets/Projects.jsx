import React, {Component} from "react";
import "./Projects.scss";
import Project from "./Project";

class Projects extends Component {
    render() {
        const flappyDirections = (
            <p>
                Play Mode:<br/>
                - Press Space or Click to jump<br/>
                <br/>
                Train Mode:<br/>
                - Using Left/Right arrow buttons to slow/speed up training<br/>
                - Enter your bot's name under the "Write To" label<br/>
                <br/>
                Test Mode:<br/>
                - Select your bot under the "Read From" label
            </p>
        )

        const steeringDirections = (
            <p>
                Play Mode:<br/>
                - Press A/D to steer left/right<br/>
                - Press W/S to accelerate/decelerate<br/>
                <br/>
                Train Mode:<br/>
                - Using Left/Right arrow buttons to slow/speed up training<br/>
                - Enter your bot's name under the "Write To" label<br/>
                <br/>
                Test Mode:<br/>
                - Select your bot under the "Read From" label
            </p>
        )

        const mtlDirections = (
            <p>
                - Use WASD to move around<br/>
                - Press Space while playing to clear all enemies (1 charge)
            </p>
        )

        const hashsetDirections = (
            <p>
                - Add nodes to the hashset<br/>
                - Delete nodes from the hashset<br/>
                - Choose a different collision resolution (chaining or probing)<br/>
                - When Load Capacity is full, the hashset will rehash all its nodes
            </p>
        )

        const todoDirections = (
            <p>
                - Create an account to keep a personalized todo list
            </p>
        )

        return (
            <div className="section" id="projects">
                <h1 className="title">3. Projects</h1>
                <h1 className="project-section">Machine Learning</h1>
                <div className="projects">
                    <Project title="Flappy Bird AI"
                             url="https://i.simmer.io/@apkirito/flappyai"
                             description="Train your own birds to play Flappy Bird."
                             directions={flappyDirections}
                             tools={["Neural Network", "Matrices", "Neuro-evolution", "Unity"]}/>
                    <Project title="Steering AI"
                             url="https://i.simmer.io/@apkirito/steeringai"
                             description="Train your own cars to drive around tracks."
                             directions={steeringDirections}
                             tools={["Neural Network", "Matrices", "Neuro-evolution", "Unity"]}/>
                </div>
                <h1 className="project-section">Unity Development</h1>
                <div className="projects">
                    <Project title="Hashset"
                             url="https://i.simmer.io/@apkirito/hashset"
                             description="Vizualise how a hashset stores its data."
                             directions={hashsetDirections}
                             tools={["Hashset", "Unity"]}/>
                    <Project title="Move To Live"
                             url="https://i.simmer.io/@apkirito/movetolive"
                             description="Survive by activating weapons and avoiding enemies."
                             directions={mtlDirections}
                             tools={["Unity"]}/>
                </div>
                <h1 className="project-section">Web Development</h1>
                <div className="projects">
                    <Project title="Todo List"
                             url="https://achenexpresslogin.herokuapp.com/"
                             description="Full stack todo list that organizes personalized tasks."
                             directions={todoDirections}
                             tools={["HTML", "CSS", "Javascript", "NodeJS", "Express", "Webpack"]}/>
                </div>
                <hr/>
            </div>
        );
    }
}

export default Projects;
