import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form, Image, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";

function ProductCreateScreen() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");

    const userInfoState = useSelector((state) => state.userInfo);
    const { userInfo } = userInfoState;

    function submitUpdateProduct(e) {
        e.preventDefault();
        const data = AddProductInfo(
            category,
            name,
            price,
            brand,
            countInStock,
            description,
            rating
        );
        if (data) {
            setMessage("The product is updated successfully!");
        }
    }

    async function AddProductInfo(
        category,
        name,
        price,
        brand,
        countInStock,
        description,
        rating
    ) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post(
            `/api/products/update-product/add-product`,
            {
                name: name,
                price: price,
                brand: brand,
                category: category,
                countInStock: countInStock,
                description: description,
                rating: rating,
            },
            config
        );

        return data;
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Product Create Screen</h1>
            <FormContainer>
                <Form onSubmit={submitUpdateProduct}>
                    <Form.Group>
                        <Form.Label>
                            <b>Name</b>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>
                            <b>Shipping price</b>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>
                            <b>Brand</b>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>
                            <b>Category</b>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>
                            <b>Count in stock</b>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="10"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>
                            <b>Description</b>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            as="textarea"
                            rows="5"
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>
                            <b>Rating</b>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="3.5"
                            step="0.5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Button type="submit" variant="primary">
                        Submit Product
                    </Button>
                </Form>
                <br />
                {message && (
                    <Message
                        variant="success"
                        text={message}
                        dismissible={true}
                    ></Message>
                )}
            </FormContainer>
        </div>
    );
}

export default ProductCreateScreen;
