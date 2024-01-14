import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function UserEditScreen() {
    const [userName, setuserName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setuserId] = useState("");

    const userInfoState = useSelector((state) => state.userInfo);
    const { userInfo } = userInfoState;

    function submitUpdateUser(e) {
        e.preventDefault();
        PutUserInfo(userId, userName, email, isAdmin);
    }

    async function PutUserInfo(userId, userName, email, isAdmin) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            `/api/user/update-user-by-id/${userId}`,
            {
                userName: userName,
                email: email,
                isAdmin: isAdmin,
            },
            config
        );

        return data;
    }

    async function setUserInfo(userId) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/user/get-user/${userId}`,
            config
        );
        setuserName(data.first_name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
    }

    useEffect(() => {
        const pathname = window.location.pathname;
        const pathnameList = pathname.split("/");
        const urlUserId = pathnameList[3];
        setuserId(urlUserId);
        setUserInfo(urlUserId);
    }, []);

    return (
        <div>
            <FormContainer>
                <h1>User Edit Screen</h1>
                <Form onSubmit={submitUpdateUser}>
                    <Form.Group>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="User Name"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Is Admin</Form.Label>
                        <Form.Check
                            type="switch"
                            placeholder="Is Admin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    <br />
                    <Button type="submit" variant="primary">
                        Update User
                    </Button>
                </Form>
            </FormContainer>
        </div>
    );
}

export default UserEditScreen;
