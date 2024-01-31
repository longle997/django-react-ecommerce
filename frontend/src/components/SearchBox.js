import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

function SearchBox() {
    const [keyWord, setKeyword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    function submitHandler(e) {
        e.preventDefault();
        if (keyWord) {
            navigate(`/?keyWord=${keyWord}`);
        } else {
            navigate(location.pathname);
        }
    }
    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control
                type="text"
                value={keyWord}
                placeholder="search by product's name"
                onChange={(e) => setKeyword(e.target.value)}
                className="mr-sm-2 ml-sm-5"
            ></Form.Control>
            <Button
                type="submit"
                variant="primary"
                style={{ marginLeft: "5px" }}
            >
                Search
            </Button>
        </Form>
    );
}

export default SearchBox;
