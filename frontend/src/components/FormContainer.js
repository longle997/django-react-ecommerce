import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// we have to parse children object in order to use it in this component
function FormContainer({ children }) {
    return (
        <div>
            <Container>
                <Row className="justify-content-center">
                    <Col className="text-center py-3 border" sm={12} md={6}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default FormContainer;
