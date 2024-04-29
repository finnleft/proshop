import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token" + response.credential)
    var userObject = jwtDecode(response.credential);
    console.log(userObject);

    setEmail(userObject.email);
    setPassword("google123");

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
    try {
        const res = await login({ email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
    } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
    }
  };

  

  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>
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

            <Button type="submit" variant="primary" className="mt-2" disabled={ isLoading }>
                Sign In
            </Button>

            <br/>
            <br/>
            

            <div id="gSignIn"></div>


            { isLoading && <Loader /> }
        </Form>


        <Row className="py-3">
            <Col>
                New Customer? <Link to={ redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen