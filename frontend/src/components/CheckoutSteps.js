import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <div>
            <Nav className="justify-content-center mb-4">
                {step1 ? (
                    <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Login</Nav.Link>
                )}

                {step2 ? (
                    <LinkContainer to="/cart">
                        <Nav.Link>Cart</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Cart</Nav.Link>
                )}

                {step3 ? (
                    <LinkContainer to="/checkout">
                        <Nav.Link>Add shipping address</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Add shipping address</Nav.Link>
                )}

                {step4 ? (
                    <LinkContainer to="/payment">
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav>
        </div>
    );
}

export default CheckoutSteps;
