import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { register } from "../actions/userActions";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userInfo);
    const { userInfo } = userLogin;

    const userRegister = useSelector((state) => state.userRegisterInfo);
    const { error, loading, userRegisterInfo } = userRegister;

    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Confirm Password is not match!");
        } else {
            dispatch(register(userName, email, password));
            navigate("/login");
        }
    };
    return (
        <div>
            <FormContainer>
                <h1>Register</h1>
                {message && <Message variant="danger" text={message}></Message>}
                {error && <Message variant="danger" text={error}></Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="User Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
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
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Button type="submit" variant="primary">
                        Register
                    </Button>
                    <br />
                    <br />
                    <Link to={`/login`}>
                        Already have an account, click here!
                    </Link>
                </Form>
            </FormContainer>
        </div>
    );
}

export default RegisterScreen;
