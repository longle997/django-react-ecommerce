import React from "react";
import { Row, Col, Card, ListGroup, Button, Image } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { addOrderAction } from "../actions/orderActions";

function PlaceOrderScreen() {
    const shippingAddressState = useSelector((state) => state.shippingAddress);
    const { shippingAddress } = shippingAddressState;

    const paymentMethodState = useSelector((state) => state.paymentMethod);
    const { paymentMethod } = paymentMethodState;

    const cartItemsState = useSelector((state) => state.cartItems);
    const { cartItems } = cartItemsState;

    const userInfoState = useSelector((state) => state.userInfo);
    const { userInfo } = userInfoState;

    const orderState = useSelector((state) => state.order);
    const { order, success, error } = orderState;

    const [shippingAddressStr, setShippingAddressStr] = useState("");
    const [orderCost, setOrderCost] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
        }
        setShippingAddressStr(
            shippingAddress.address +
                ", " +
                shippingAddress.city +
                ", " +
                shippingAddress.country
        );
        let itemsCostTemp = 0;
        cartItems.map((item) => {
            itemsCostTemp += item.qty * item.price;
        });

        itemsCostTemp = Number(itemsCostTemp.toFixed(2));
        let shippingCostTemp = Number((itemsCostTemp * 0.2).toFixed(2));
        let taxCostTemp = Number((itemsCostTemp * 0.1).toFixed(2));
        setOrderCost({
            itemsCost: Number(itemsCostTemp.toFixed(2)),
            shippingCost: shippingCostTemp,
            taxCost: taxCostTemp,
            totalCost: itemsCostTemp + shippingCostTemp + taxCostTemp,
        });
    }, [shippingAddress]);

    async function placeOrder() {
        dispatch(
            addOrderAction(
                userInfo.id,
                paymentMethod,
                orderCost.taxCost,
                orderCost.shippingCost,
                orderCost.totalCost,
                shippingAddress,
                cartItems,
                userInfo.token
            )
        );
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            {error ? (
                <Message variant="danger" text={error} />
            ) : (
                <Row>
                    <Col md={8}>
                        <Row>
                            <Row>
                                <h4>SHIPPING</h4>
                            </Row>
                            <Row>{shippingAddressStr}</Row>
                        </Row>
                        <hr />
                        <Row>
                            <Row>
                                <h4>PAYMENT METHOD</h4>
                            </Row>
                            <Row>Method: {paymentMethod}</Row>
                        </Row>
                        <hr />
                        <Row>
                            <Row>
                                <h4>ORDER ITEMS</h4>
                            </Row>
                            <Row>
                                <ListGroup>
                                    {cartItems.map((item) => (
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
                                        <Col>${orderCost.itemsCost}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping:</Col>
                                        <Col>${orderCost.shippingCost}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax:</Col>
                                        <Col>${orderCost.taxCost}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total:</Col>
                                        <Col>${orderCost.totalCost}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="summary-btn">
                                        <Button
                                            className="btn btn-block"
                                            type="button"
                                            onClick={placeOrder}
                                        >
                                            PLACE ORDER
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
}

export default PlaceOrderScreen;
