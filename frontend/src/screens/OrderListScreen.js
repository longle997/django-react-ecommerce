import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Message from "../components/Message";
import Table from "react-bootstrap/Table";
import axios from "axios";

function OrderListScreen() {
    const userInfoState = useSelector((state) => state.userInfo);
    const { userInfo } = userInfoState;
    const [orders, setOrders] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    async function fetchOrders() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get("/api/order/get-all-orders", config);
        console.log("=================data: ", data);
        setOrders(data);
    }

    useEffect(() => {
        try {
            fetchOrders();
            console.log("=================orders: ", orders);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }, []);

    return (
        <div>
            <Row style={{ marginBottom: "20px" }}>
                <Col>
                    <h2>Order list</h2>
                </Col>
            </Row>
            {errorMessage ? (
                <Message variant="danger" text={errorMessage}></Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Bought at</th>
                            <th>Total price</th>
                            <th>Is Paid</th>
                            <th>Is Delivered</th>
                            <th>Order detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.first_name}</td>
                                <td>{order.createAt}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        <i
                                            className="fa-solid fa-check"
                                            style={{ color: "green" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fa-solid fa-check"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        <i
                                            className="fa-solid fa-check"
                                            style={{ color: "green" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fa-solid fa-check"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td className="text-center">
                                    <Button className="btn-light">
                                        <Link to={`/order/${order._id}`}>
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default OrderListScreen;
