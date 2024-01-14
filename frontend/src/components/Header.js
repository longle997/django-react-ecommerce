import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

function Header() {
    const userLogin = useSelector((state) => state.userInfo);
    const { error, loading, userInfo } = userLogin;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logoutHanlder() {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <header>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Proshop</Navbar.Brand>
                    </LinkContainer>
                    <Nav className="me-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i>Cart
                            </Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown
                                title={userInfo.first_name}
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="/profile">
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={logoutHanlder}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user"></i>Login
                                </Nav.Link>
                            </LinkContainer>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown
                                title="Admin Site"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="/admin/users">
                                    User List
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/admin/products">
                                    Product List
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/admin/orders">
                                    Order List
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
