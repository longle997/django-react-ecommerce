import React from "react";
import { useEffect, useState } from "react";
import { getOrderAction, payOrderAction } from "../actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, ListGroup, Button, Image } from "react-bootstrap";
import { useParams } from "react-router";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import { PAY_ORDER_RESET } from "../constants/orderConstants";
import axios from "axios";

function OrderDetailsScreen() {
    const orderDetailsState = useSelector((state) => state.orderDetails);
    const { order, success, error, loading } = orderDetailsState;

    const orderPayState = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPayState;

    const userInfoState = useSelector((state) => state.userInfo);
    const { userInfo } = userInfoState;

    const [sdkReady, setSdkReady] = useState(false);
    const [successDelivered, setSuccessDelivered] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();

    const addPayPalScript = () => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
            "https://www.paypal.com/sdk/js?client-id=ASr8ntDqUk0DSYT--rDucs-mSrBJAG7hEpjQcjLS_9LP0puKGqIIxbtTLoL58kKFgBFY2Ub5R_Vr8SDI&currency=VND";
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    // the useEffect will run whenever the component is onMounted
    // The sequence of render this component => render => onMounted => render
    // So at the first render => this component will use the default value
    useEffect(() => {
        dispatch(getOrderAction(id, userInfo.token));
        if (successPay) {
            dispatch({ type: PAY_ORDER_RESET });
        }
        if (!order.isPaid) {
            if (window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
        // the infinity loop occur when useEffect is run without dependence
        // https://stackoverflow.com/questions/53070970/infinite-loop-in-useeffect
    }, [successPay, successDelivered]);

    const successPaymentHanlder = () => {
        dispatch(payOrderAction(id, userInfo.token));
    };

    async function maskOrderDeliver(orderId) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/order/get-order/${orderId}/delivered`,
            {},
            config
        );
        setSuccessDelivered(true);
    }

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger" text={error}></Message>
            ) : (
                <Row>
                    <Col md={8}>
                        <Row>
                            <Row>
                                <h4>SHIPPING</h4>
                            </Row>
                            <Row>
                                <p>
                                    <b>Client name</b>: {order.user.first_name}
                                </p>
                            </Row>
                            <Row>
                                <p>
                                    <b>Client email</b>: {order.user.email}
                                </p>
                            </Row>
                            <Row>
                                <p>
                                    <b>Shipping address: </b>
                                    {order.shippingAddress.address +
                                        ", " +
                                        order.shippingAddress.city +
                                        ", " +
                                        order.shippingAddress.country}
                                </p>
                            </Row>
                            <Row>
                                {order.isDelivered ? (
                                    <Message
                                        variant="success"
                                        text={`Order is delivered at ${order.deliveredAt}`}
                                    />
                                ) : (
                                    <Message
                                        variant="warning"
                                        text="Order is not delivered!"
                                    />
                                )}
                            </Row>
                            {!order.isDelivered && userInfo.isAdmin && (
                                <Row>
                                    <Col>
                                        <Button
                                            onClick={() => {
                                                maskOrderDeliver(order._id);
                                            }}
                                        >
                                            Mask as deliver
                                        </Button>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            )}
                        </Row>
                        <hr />
                        <Row>
                            <Row>
                                <h4>PAYMENT METHOD</h4>
                            </Row>
                            <Row>
                                <p>
                                    <b>Method</b>: {order.paymentMethod}
                                </p>
                            </Row>
                            <Row>
                                {order.isPaid ? (
                                    <Message
                                        variant="success"
                                        text={`Order is paid at ${order.paidAt}`}
                                    />
                                ) : (
                                    <Message
                                        variant="warning"
                                        text="Order is not paid!"
                                    />
                                )}
                            </Row>
                        </Row>
                        <hr />
                        <Row>
                            <Row>
                                <h4>ORDER ITEMS</h4>
                            </Row>
                            <Row>
                                <ListGroup>
                                    {order.orderItems.map((item) => (
                                        <ListGroup.Item key={item.name}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image
                                                        src={item.image}
                                                        fluid
                                                        rounded
                                                    ></Image>
                                                </Col>
                                                <Col md={5}>{item.name}</Col>
                                                <Col md={5}>
                                                    {item.qty} * ${item.price} =
                                                    ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Row>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>Order Summary</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items cost:</Col>
                                        <Col>
                                            $
                                            {Number(order.totalPrice) -
                                                (Number(order.shippingPrice) +
                                                    Number(order.taxPrice))}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping:</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax:</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total:</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? (
                                            <Loader />
                                        ) : (
                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={
                                                    successPaymentHanlder
                                                }
                                            />
                                        )}
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default OrderDetailsScreen;
