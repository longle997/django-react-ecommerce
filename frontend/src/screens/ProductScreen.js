import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useParams } from "react-router";
import Rating from "../components/Rating";
import { productDetails } from "../actions/productActions";
import { addToCartAction } from "../actions/cartActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductScreen() {
    // The React useState Hook allows us to track state in a function component.
    // State generally refers to data or properties that need to be tracking in an application.
    const [qty, setQty] = useState(1);
    // useParams method is used to get param from parent component
    const { id } = useParams();
    // useDispatch is used to dispatch an action from component
    const dispatch = useDispatch();
    // use selector is use to get data from redux state
    const productDetail = useSelector((state) => state.productDetail);
    const { error, loading, product } = productDetail;
    const navigate = useNavigate();

    function addToCart() {
        navigate(`/cart/${id}?qty=${qty}`);
        dispatch(addToCartAction(id, qty));
    }

    useEffect(() => {
        dispatch(productDetails(id));
    }, []);

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger" text={error}></Message>
            ) : (
                <Row>
                    <Col md={6} sm={12}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4} sm={12}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReview} reviews`}
                                    color={"#f8e825"}
                                />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={2} sm={12}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>Item Summary</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price: </Col>
                                        <Col>${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status: </Col>
                                        <Col>
                                            {product.countInStock > 0
                                                ? "In stock"
                                                : "Out of stock"}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Select
                                                value={qty}
                                                onChange={(e) =>
                                                    setQty(e.target.value)
                                                }
                                            >
                                                {[
                                                    ...Array(
                                                        product.countInStock
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
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <div className="summary-btn">
                                        <Button
                                            className="btn btn-block"
                                            disabled={
                                                product.countInStock === 0
                                            }
                                            type="button"
                                            onClick={addToCart}
                                        >
                                            Add to cart
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

export default ProductScreen;
