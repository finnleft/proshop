import {Row, Col, Form, Button} from "react-bootstrap"
import FormContainer from "../components/FormContainer";

const ContactScreen = () => {
  return (
    <FormContainer>
        <h1>Contact</h1>
        <Form>
            <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"></Form.Control>
            </Form.Group>
            <Form.Group controlId="message" className="my-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Enter message"
                    style={{ height: "100px" }}></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">
                Send
            </Button>
        </Form>
    </FormContainer>
  )
}