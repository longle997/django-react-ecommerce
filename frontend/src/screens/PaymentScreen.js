import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addPaymentMethodAction } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

function PaymentScreen() {
    const paymentMethodSelector = useSelector((state) => state.paymentMethod);
    const { paymentMethod } = paymentMethodSelector;

    const [paymentMethodState, changePaymentMethodState] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        changePaymentMethodState(paymentMethod);
    }, [paymentMethod]);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(addPaymentMethodAction(paymentMethodState));
        navigate("/place-order");
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <Row>
                <Col></Col>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <h1 className="title text-center">Payment Method</h1>
                        <Form.Group>
                            <Form.Check
                                value="payPal"
                                type="radio"
                                label="Credit card or paypal"
                                onChange={(e) =>
                                    changePaymentMethodState(e.target.value)
                                }
                                checked={paymentMethodState == "payPal"}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                value="momo"
                                type="radio"
                                label="Momo"
                                onChange={(e) =>
                                    changePaymentMethodState(e.target.value)
                                }
                                checked={paymentMethodState == "momo"}
                            />
                        </Form.Group>
                        <br />
                        <div className="summary-btn">
                            <Button
                                variant="primary"
                                type="submit"
                                className="btn-block"
                            >
                                Continue
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </div>
    );
}

export default PaymentScreen;
