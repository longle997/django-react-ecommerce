import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form, Image, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";

function ProductEditScreen() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [productId, setProductId] = useState("");
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");

    const userInfoState = useSelector((state) => state.userInfo);
    const { userInfo } = userInfoState;

    function submitUpdateProduct(e) {
        e.preventDefault();
        const data = PutProductInfo(
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

    async function PutProductInfo(
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
        const { data } = await axios.put(
            `/api/products/update-product-by-id/${productId}`,
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

    async function getProductInfo(productId) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/products/get-product/${productId}`,
            config
        );
        setName(data.name);
        setPrice(data.price);
        setBrand(data.brand);
        setCategory(data.category);
        setImage(data.image);
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setRating(data.rating);
    }

    async function uploadHandler(e) {
        const file = e.target.files[0];

        let formData = new FormData();

        formData.append("image", file);
        formData.append("product_id", productId);

        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };

            const { data } = await axios.post(
                "/api/products/update-product/image-upload",
                formData,
                config
            );

            setImage(data);

            setUploading(false);
        } catch {
            setUploading(false);
        }
    }

    useEffect(() => {
        const pathname = window.location.pathname;
        const pathnameList = pathname.split("/");
        const urlProductId = pathnameList[3];
        setProductId(urlProductId);
        getProductInfo(urlProductId);
    }, [axios]);

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Product Edit Screen</h1>
            <FormContainer>
                <Form onSubmit={submitUpdateProduct}>
                    <Form.Group>
                        <Form.Label>
                            <b>Name</b>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Name"
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
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>
                            <Row>
                                <Col>
                                    <b>Image</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {uploading && <Loader />}
                                    <Image
                                        src={image}
                                        fluid
                                        style={{ width: "30%" }}
                                    />
                                </Col>
                            </Row>
                        </Form.Label>
                        <Form.Control
                            type="file"
                            onChange={uploadHandler}
                            custom
                        />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>
                            <b>Brand</b>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Brand"
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
                            placeholder="Category"
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
                            placeholder="Count in stock"
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
                            placeholder="Description"
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
                            placeholder="Rating"
                            step="0.5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Button type="submit" variant="primary">
                        Update Product
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

export default ProductEditScreen;
