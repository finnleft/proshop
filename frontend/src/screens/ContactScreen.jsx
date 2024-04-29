import React, { useRef } from "react";
import {Row, Col, Form, Button} from "react-bootstrap"
import FormContainer from "../components/FormContainer";
import emailjs from '@emailjs/browser';

const ContactScreen = () => {

    const form = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        
        emailjs.sendForm(
            'service_hp6sism',
            'contact_form',
            form.current,
            {publicKey: 'rQrxb9FGN4kRh2SyB',
        }).then(
            () => {
            console.log('Sent');
        }, (error) => {
            console.log('Failed');
        },
        );

    };

  return (
    <FormContainer>
        <h1>Contact</h1>
        <Form ref={form} onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="user_name">
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="user_email">
                    </Form.Control>
            </Form.Group>
            <Form.Group controlId="message" className="my-3"> 
                <Form.Label>Message</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Enter message"
                    name="message"
                    style={{ height: "100px" }}>
                    </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">
                Send
            </Button>
        </Form>
  </FormContainer>
  )
}

export default ContactScreen