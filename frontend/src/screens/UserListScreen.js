import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Table from "react-bootstrap/Table";
import { getUserList } from "../actions/userActions";
import axios from "axios";

function UserListScreen() {
    const userListState = useSelector((state) => state.userList);
    const { userList, error, loading } = userListState;

    const userInfoState = useSelector((state) => state.userInfo);
    const { userInfo } = userInfoState;

    const [deleteUserSuccessed, setdeleteUserSuccessed] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserList(userInfo.token));
        if (!userInfo.isAdmin) {
            navigate("/login");
        }
    }, [deleteUserSuccessed]);

    const handleDelete = async (userId) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        console.log("config: ", config);
        // receive 403 error because missing / at the beginning
        const { data } = await axios.delete(
            `/api/user/delete-user/${userId}`,
            config
        );
        if (data) {
            setdeleteUserSuccessed(true);
        }
    };

    return (
        <div>
            <h2 style={{ marginBottom: "20px" }}>User list</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger" text={error}></Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                            <th>Update/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? (
                                        <i
                                            className="fa-solid fa-check"
                                            style={{ color: "green" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fa-solid fa-check"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    <Button className="btn-light">
                                        <Link
                                            to={`/admin/users/${user.id}/edit`}
                                        >
                                            <i className="fa-solid fa-user-pen"></i>
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
                                                    handleDelete(user.id);
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
            )}
        </div>
    );
}

export default UserListScreen;
