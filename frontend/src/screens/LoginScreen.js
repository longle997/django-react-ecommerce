import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { login } from "../actions/userActions";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userInfo);
    const { error, loading, userInfo } = userLogin;

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div>
            <FormContainer>
                <h1>Sign in</h1>
                {error && <Message variant="danger" text={error}></Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Button type="submit" variant="primary">
                        Sign in
                    </Button>
                    <br />
                    <br />
                    <Link to={`/register`}>
                        Don't have an account, click here!
                    </Link>
                </Form>
            </FormContainer>
        </div>
    );
}

export default LoginScreen;
