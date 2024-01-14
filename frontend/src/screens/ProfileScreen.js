import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row, Col, Button, Form, ListGroup, Card } from "react-bootstrap";
import { getDetails, updateUserProfile } from "../actions/userActions";
import axios from "axios";

function ProfileScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [orders, setOrders] = useState([]);

    const userDetailsState = useSelector((state) => state.userDetails);
    const { error, loading, userDetails } = userDetailsState;

    const userInfoState = useSelector((state) => state.userInfo);
    const { userInfo } = userInfoState;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function fetchOrders() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get("/api/order/get-orders", config);
        setOrders(data);
    }

    useEffect(() => {
        if (!userInfo) {
            console.log("navigate");
            navigate("/login");
        } else {
            if (!userDetails || !userDetails.username) {
                dispatch(getDetails("get-user-profile", userInfo.token));
            } else {
                setUserName(userDetails.first_name);
                setEmail(userDetails.email);
            }
            try {
                fetchOrders();
            } catch (error) {
                setMessage(error.message);
            }
        }
    }, [dispatch, userInfo, userDetails]);

    function submitHandler(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Confirm Password is not match!");
        } else {
            dispatch(
                updateUserProfile(userName, email, password, userInfo.token)
            );
            setMessage("");
        }
    }

    return (
        <div>
            {loading ? (
                <Loader />
            ) : message ? (
                <Message variant="danger" text={message}></Message>
            ) : error ? (
                <Message variant="danger" text={error}></Message>
            ) : (
                <Row>
                    <Col md={6} className="text-center">
                        <h2>User Profile</h2>
                        <FormContainer>
                            <Form onSubmit={submitHandler}>
                                <Form.Group>
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="User Name"
                                        value={userName}
                                        onChange={(e) =>
                                            setUserName(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                                <br />
                                <Form.Group>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                                <br />
                                <Button type="submit" variant="primary">
                                    Update User Profile
                                </Button>
                            </Form>
                        </FormContainer>
                    </Col>
                    <Col md={6} className="text-center">
                        <h2>My Orders</h2>
                        <Card>
                            {orders.length == 0 ? (
                                <Message
                                    variant="info"
                                    text="You don't have any order"
                                ></Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {orders.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <Row>
                                                <Col md={6}>
                                                    <p>
                                                        <b>Bought at: </b>
                                                        {item.createAt}
                                                    </p>
                                                </Col>
                                                <Col md={6}>
                                                    <p>
                                                        <b>Total price: </b>$
                                                        {item.totalPrice}
                                                    </p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6}>
                                                    {item.isPaid ? (
                                                        <Message
                                                            variant="success"
                                                            text={`Order is paid at ${item.paidAt}`}
                                                        />
                                                    ) : (
                                                        <Message
                                                            variant="warning"
                                                            text="Order is not paid!"
                                                        />
                                                    )}
                                                </Col>
                                                <Col md={6}>
                                                    {item.isDelivered ? (
                                                        <Message
                                                            variant="success"
                                                            text={`Order is delivered at ${item.deliveredAt}`}
                                                        />
                                                    ) : (
                                                        <Message
                                                            variant="warning"
                                                            text="Order is not delivered!"
                                                        />
                                                    )}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Link to={`/order/${item._id}`}>
                                                    Click here for more detail
                                                </Link>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default ProfileScreen;
