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
import axios from "axios";
import FormContainer from "../components/FormContainer";

function ProductScreen() {
    // The React useState Hook allows us to track state in a function component.
    // State generally refers to data or properties that need to be tracking in an application.
    const [qty, setQty] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isReview, setIsReview] = useState(false);
    // useParams method is used to get param from parent component
    const { id } = useParams();
    // useDispatch is used to dispatch an action from component
    const dispatch = useDispatch();
    // use selector is use to get data from redux state
    const productDetail = useSelector((state) => state.productDetail);
    const { error, loading, product } = productDetail;

    const userInfoState = useSelector((state) => state.userInfo);
    const { userInfo } = userInfoState;

    const navigate = useNavigate();

    function addToCart() {
        navigate(`/cart/${id}?qty=${qty}`);
        dispatch(addToCartAction(id, qty));
    }

    async function getReviews(id) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/products/get-product-review/${id}`,
            config
        );
        setReviews(data);
        for (let index in data) {
            if (data[index].name === userInfo.first_name) {
                setIsReview(true);
            }
        }
    }

    async function submitHandler() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/products/update-product/${id}/review`,
            {
                rating: rating,
                comment: comment,
            },
            config
        );
        setIsReview(true);
    }

    useEffect(() => {
        dispatch(productDetails(id));
        getReviews(id);
    }, [axios]);

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
                    <Row>
                        <Col md={6} sm={12}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fluid
                            />
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
                    <Row style={{ marginTop: "1rem" }}>
                        <h3>Reviews</h3>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Row>
                                        <Col>
                                            <b>Reviewer's Name</b>
                                        </Col>
                                        <Col>
                                            <b>Rating</b>
                                        </Col>
                                        <Col>
                                            <b>Comnent</b>
                                        </Col>
                                    </Row>
                                    <hr />
                                    {reviews.map((item) => (
                                        <Row key={item._id}>
                                            <Col>{item.name}</Col>
                                            <Col>
                                                <Rating
                                                    value={item.rating}
                                                    text={""}
                                                    color={"#f8e825"}
                                                />
                                            </Col>
                                            <Col>{item.comment}</Col>
                                            <hr></hr>
                                            <br></br>
                                        </Row>
                                    ))}
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        {!isReview && (
                            <FormContainer>
                                <h4 className="title">
                                    Write your review here
                                </h4>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group>
                                        <Form.Label>
                                            <b>Rating</b>
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            step="0.5"
                                            value={rating}
                                            onChange={(e) =>
                                                setRating(e.target.value)
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <Form.Label>
                                            <b>Comment</b>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Comment"
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                    <br />
                                    <Button type="submit" variant="primary">
                                        Submit
                                    </Button>
                                </Form>
                            </FormContainer>
                        )}
                    </Row>
                </Row>
            )}
        </div>
    );
}

export default ProductScreen;
