import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Facebook from '../assets/facebook.png';

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential)
    var userObject = jwtDecode(response.credential);
    console.log(userObject);

    setName(userObject.name);
    setEmail(userObject.email);
    setPassword("google123");
    setConfirmPassword("google123");
  }

  useEffect(() => {

      /* global google */
  google.accounts.id.initialize({
    client_id: "1089007710098-p3tbv4ds0pnvdn8jotfs9pun062badl6.apps.googleusercontent.com",
    callback: handleCallbackResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("gSignIn"),
    { theme: "outline", size: "large "}
  );

    if (userInfo) {
        navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
    } else {
        try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    }
  };

  return (
    <FormContainer>
        <h1>Sign Up</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="conformPassword" className="my-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>


            <Button type="submit" variant="primary" className="mt-2" disabled={ isLoading }>
                Sign Up
            </Button>

            <br/>
            <br/>
            <div id="gSignIn"></div>

            <br/>
            <Button href="https://www.facebook.com/login/" className="fbButton">
                <img src={Facebook} alt="" classname="icon"/>
                Continue with Facebook
            </Button>

            { isLoading && <Loader /> }
        </Form>

        <Row className="py-3">
            <Col>
                Already have an account? <Link to={ redirect ? `/login?redirect=${redirect}` : "/login"}>Log In</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen;