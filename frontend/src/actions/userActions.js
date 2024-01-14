import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch, getState) => {
    try {
        // use dispatch to interact with reducer
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/token/",
            {
                username: email,
                password: password,
            },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem(
            "userInfo",
            JSON.stringify(getState().userInfo.userInfo)
        );
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT, payload: null });
};

export const register =
    (userName, email, password) => async (dispatch, getState) => {
        try {
            // use dispatch to interact with reducer
            dispatch({ type: USER_REGISTER_REQUEST });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/register-user",
                {
                    first_name: userName,
                    username: email,
                    email: email,
                    password: password,
                },
                config
            );

            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };

export const getDetails = (id, token) => async (dispatch, getState) => {
    try {
        // use dispatch to interact with reducer
        dispatch({ type: USER_DETAILS_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`/api/user/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updateUserProfile =
    (firstName, email, password, token) => async (dispatch, getState) => {
        try {
            // use dispatch to interact with reducer
            dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.put(
                `/api/user/update-user-profile`,
                {
                    first_name: firstName,
                    email: email,
                    password: password,
                },
                config
            );

            dispatch({
                type: USER_UPDATE_PROFILE_SUCCESS,
                payload: data,
            });

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
            });

            localStorage.setItem(
                "userInfo",
                JSON.stringify(getState().userInfo.userInfo)
            );

            dispatch({
                type: USER_UPDATE_PROFILE_RESET,
            });
        } catch (error) {
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };

export const getUserList = (token) => async (dispatch, getState) => {
    try {
        // use dispatch to interact with reducer
        dispatch({ type: USER_LIST_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`/api/user/get-users`, config);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
