import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Button,
    Card,
    Form,
} from "react-bootstrap";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { addToCartAction, deleteFromCart } from "../actions/cartActions";

function CartScreen() {
    const cartItemsState = useSelector((state) => state.cartItems);
    const { cartItems } = cartItemsState;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function RemoveCartItem(productId) {
        dispatch(deleteFromCart(productId));
    }

    function checkoutProcess() {
        navigate("/checkout");
    }

    return (
        <div>
            <h3>Welcome to Cart Screen</h3>
            <Row>
                <Col md={8}>
                    <h1>Shopping cart</h1>
                    {cartItems.length == 0 ? (
                        <Message
                            text="Your cart is empty"
                            variant="info"
                        ></Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.name}>
                                    <Row>
                                        <Col md={2}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <Link
                                                to={`/product/${item.product}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <Row>
                                                <p>Qty</p>
                                            </Row>
                                            <Row>
                                                <Form.Select
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        dispatch(
                                                            addToCartAction(
                                                                item.product,
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            item.countInStock
                                                        ).keys(),
                                                    ].map((x) => (
                                                        <option
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Row>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                className="btn btn-block"
                                                onClick={() =>
                                                    RemoveCartItem(item.product)
                                                }
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <h3>
                            Subtotal for{" "}
                            {cartItems.reduce((accumulator, item) => {
                                return accumulator + Number(item.qty);
                            }, 0)}{" "}
                            items
                        </h3>
                        <p>
                            Total price:{" $"}
                            {cartItems.reduce((accumulator, item) => {
                                return (
                                    accumulator +
                                    Number(
                                        (
                                            Number(item.qty) *
                                            Number(item.price)
                                        ).toFixed()
                                    )
                                );
                            }, 0)}
                        </p>
                        <div className="summary-btn">
                            <Button
                                className="btn btn-block"
                                disabled={cartItems.length === 0}
                                type="button"
                                onClick={checkoutProcess}
                            >
                                Process to checkout
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default CartScreen;
