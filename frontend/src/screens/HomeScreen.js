import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

function HomeScreen() {
    // useDispatch is used to dispatch an action from component
    const dispatch = useDispatch();
    // use selector is use to get data from redux state
    const productList = useSelector((state) => state.productList);
    const { error, loading, products, page, pages } = productList;
    const location = useLocation();

    // useEffect is called whenever a component is called
    useEffect(() => {
        dispatch(listProducts(location.search));
    }, [dispatch, location]);

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger" text={error}></Message>
            ) : (
                <div>
                    <ProductCarousel />
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        page={page}
                        pages={pages}
                        keyWord={location.search}
                    />
                </div>
            )}
        </div>
    );
}

export default HomeScreen;
