import React, {Component} from "react";
import "./Contact.scss";
import axios from 'axios';

class Contact extends Component {
    state = {
        senderEmail: "",
        subject: "",
        message: ""
    }

    handleSubmit = (event) => {
        const msg = {
            to: 'chenaaron3@gmail.com',
            from: this.state.senderEmail,
            subject: this.state.subject,
            text: this.state.message
        };

        const comp = this;

        fetch("/email", {
            method: 'post', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(msg) // body data type must match "Content-Type" header
        }).then(function(response) {
            if(response.status === 200)
            {
                comp.setState({
                    senderEmail: "",
                    subject: "",
                    message: ""
                });
            }
            return response.text();
        }).then(function(data) {
            alert(data);
        })

        event.preventDefault();
    }

    handleChange = (event) => {
        const target = event.target.name;
        const value = event.target.value;
        if (target === 'sender-email') {
            this.setState({senderEmail: value});
        } else if (target === 'subject') {
            this.setState({subject: value});
        } else if (target === 'message') {
            this.setState({message: value});
        }
    }

    render() {
        return (
            < div className="section" id="contact">
                <h1 className="title">4. Contact</h1>
                <div id="contact-body">
                    <div id="contact-immediate">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-field">
                                <input value={this.state.senderEmail} type="text" name="sender-email"
                                       onChange={this.handleChange} required/>
                                <label>Your Email</label>
                            </div>
                            <div className="input-field">
                                <input value={this.state.subject} type="text" name="subject"
                                       onChange={this.handleChange} required/>
                                <label>Subject</label>
                            </div>
                            <div className="input-field" id="message">
                                <textarea value={this.state.message} name="message" onChange={this.handleChange}
                                          required/>
                                <label>Message</label>
                            </div>
                            <input type="submit" className="flashy-link" id="contact-send" value="Send!"/>
                        </form>
                    </div>
                    <div id="contact-information">
                        <p>
                            Feel free to contact me at anytime. I will try to respond as timely as possible!<br/>
                            Email: <a href="mailto: chenaaron3@gmail.com">chenaaron3@gmail.com</a><br/>
                            Phone: <a href="tel:408-455-7370">1(408)455-7370</a><br/>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
