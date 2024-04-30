import React, { useRef, useState } from "react";
import {Row, Col, Form, Button} from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import emailjs from '@emailjs/browser';

const ContactScreen = () => {

    const form = useRef();
    const navigate = useNavigate();

    const [name, setName] = useState(''); {/* store important variables in state */}
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        
        emailjs.sendForm(
            'service_hp6sism', /* service ID for email.js*/
            'contact_form', /* template ID for email.js */
            form.current,
            {publicKey: 'rQrxb9FGN4kRh2SyB', /* user ID for email.js */
        }).then(
            () => {
            console.log('Sent');
            navigate("/")
        }, (error) => {
            console.log('Failed');
        },
        );

    };

  return (
    <FormContainer>
        <h1>Contact</h1>
        <Form ref={form} onSubmit={submitHandler}> {/* form for user to input their name, email, subject, and message, sends to submit handler on button press */}
            <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="user_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="user_email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
            </Form.Group>
            <Form.Group controlId="Subject" className="my-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                    type="subject"
                    placeholder="Enter subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}>
                    </Form.Control>
            </Form.Group>
            <Form.Group controlId="message" className="my-3"> 
                <Form.Label>Message</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Enter message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ height: "100px" }}>
                    </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3" disabled={!name || !email || !message}>
                Send
            </Button>
        </Form>
  </FormContainer>
  )
}

export default ContactScreen