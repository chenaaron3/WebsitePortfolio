import React, { Component } from "react";
import "./Contact.scss";
import axios from 'axios';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            senderEmail: "",
            subject: "",
            message: "",
            email: "",
            phone: ""
        }
        let endpoints = ["/contact/basics"]
        endpoints.forEach(endpoint => {
            axios.get(endpoint)
                .then(res => this.setState(res.data));
        })
    }

    handleSubmit = (event) => {
        const msg = {
            to: 'chenaaron3@gmail.com',
            from: 'chenaaron3@gmail.com',
            subject: this.state.subject,
            text: `Email from: ${this.state.senderEmail}\n` + this.state.message
        };

        const comp = this;

        axios.post("/contact/email", msg)
            .then(response => {
                if (response.status === 200) {
                    comp.setState({
                        senderEmail: "",
                        subject: "",
                        message: ""
                    });
                }
                alert(response.data);
            })

        event.preventDefault();
    }

    handleChange = (event) => {
        const target = event.target.name;
        const value = event.target.value;
        if (target === 'sender-email') {
            this.setState({ senderEmail: value });
        } else if (target === 'subject') {
            this.setState({ subject: value });
        } else if (target === 'message') {
            this.setState({ message: value });
        }
    }

    render() {
        return (
            < div className="section" id="contact">
                <div data-aos="fade-up">
                    <h1 className="title">4. Contact</h1>
                </div>
                <div id="contact-body">
                    <div id="contact-immediate">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-field" data-aos="fade-up">
                                <input value={this.state.senderEmail} type="text" name="sender-email"
                                    onChange={this.handleChange} required />
                                <label>Your Email</label>
                            </div>
                            <div className="input-field" data-aos="fade-up">
                                <input value={this.state.subject} type="text" name="subject"
                                    onChange={this.handleChange} required />
                                <label>Subject</label>
                            </div>
                            <div className="input-field" id="message" data-aos="fade-up">
                                <textarea value={this.state.message} name="message" onChange={this.handleChange}
                                    required />
                                <label>Message</label>
                            </div>
                            <div className="input-submit" data-aos="fade-up">
                                <input type="submit" className="flashy-link" id="contact-send" value="Send!" />
                            </div>
                        </form>
                    </div>
                    <div id="contact-information" data-aos="fade-up">
                        <p>
                            Feel free to contact me at anytime. I will try to respond as timely as possible!<br />
                            Email: <a href={`mailto: ${this.state.email}`}>{this.state.email}</a><br />
                            Phone: <a href={`tel:${this.state.phone}`}>{this.state.phone}</a><br />
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
