import React from "react";
import { Alert } from "react-bootstrap";

function Message({ variant, text, dismissible = false }) {
    return (
        <Alert variant={variant} dismissible={dismissible}>
            {text}
        </Alert>
    );
}

export default Message;
