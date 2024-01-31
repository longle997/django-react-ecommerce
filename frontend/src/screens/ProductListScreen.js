import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image, Row, Col } from "react-bootstrap";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Table from "react-bootstrap/Table";
import { listProducts } from "../actions/productActions";
import axios from "axios";
import Paginate from "../components/Paginate";

function ProductListScreen() {
    const productListState = useSelector((state) => state.productList);
    const { products, error, loading, page, pages } = productListState;

    const userInfoState = useSelector((state) => state.userInfo);
    const { userInfo } = userInfoState;

    const [deleteProductSuccessed, setdeleteProductSuccessed] = useState(false);
    const [addProductSuccessed, setAddProductSuccessed] = useState(false);
    const location = useLocation();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts(location.search));
    }, [addProductSuccessed, deleteProductSuccessed]);

    const handleDelete = async (productId) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        // receive 403 error because missing / at the beginning
        const { data } = await axios.delete(
            `/api/products/delete-product/${productId}`,
            config
        );
        if (data) {
            setdeleteProductSuccessed(true);
        }
    };

    const handleAddProduct = async () => {
        navigate("/admin/products/create");
    };

    return (
        <div>
            <Row style={{ marginBottom: "20px" }}>
                <Col>
                    <h2>Product list</h2>
                </Col>
                <Col className="text-end">
                    <Button onClick={handleAddProduct}>
                        <i className="fa-solid fa-circle-plus"></i> ADD PRODUCT
                    </Button>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger" text={error}></Message>
            ) : (
                <div>
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Brand</th>
                                <th>Category</th>
                                <th>Update/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td style={{ width: "12%" }}>
                                        <Image src={product.image} fluid />
                                    </td>
                                    <td>${product.price}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <Button className="btn-light">
                                            <Link
                                                to={`/admin/products/${product._id}/edit`}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                        </Button>
                                        <Button
                                            className="btn-light"
                                            style={{ marginLeft: "5px" }}
                                        >
                                            <Link
                                                to={`#`}
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            "Are you sure to delete this record?"
                                                        )
                                                    ) {
                                                        handleDelete(
                                                            product.id
                                                        );
                                                    }
                                                }}
                                            >
                                                <i
                                                    style={{ color: "red" }}
                                                    className="fa-solid fa-trash"
                                                ></i>
                                            </Link>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate
                        page={page}
                        pages={pages}
                        keyWord={location.search}
                        isAdmin={true}
                    />
                </div>
            )}
        </div>
    );
}

export default ProductListScreen;
