import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { addShippingAddress } from "../actions/cartActions";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingAddressScreen() {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const dispatch = useDispatch();
    const shippingAddressState = useSelector((state) => state.shippingAddress);
    const { shippingAddress } = shippingAddressState;
    const navigate = useNavigate();

    useEffect(() => {
        if (shippingAddress) {
            setAddress(shippingAddress.address);
            setCity(shippingAddress.city);
            setPostalCode(shippingAddress.postalCode);
            setCountry(shippingAddress.country);
        }
    }, [shippingAddress]);

    function submitHandler(e) {
        e.preventDefault();
        dispatch(addShippingAddress(address, city, postalCode, country));
        navigate("/payment");
    }
    return (
        <div>
            <CheckoutSteps step1 step2 />
            <FormContainer>
                <h1 className="title">Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="165 Hau Giang"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ho Chi Minh"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="123456"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Viet Nam"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />

                    <Button type="submit">Continue</Button>
                </Form>
            </FormContainer>
        </div>
    );
}

export default ShippingAddressScreen;
