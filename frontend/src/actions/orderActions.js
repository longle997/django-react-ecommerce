import {
    ADD_ORDER_REQUEST,
    ADD_ORDER_SUCCESS,
    ADD_ORDER_FAIL,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    PAY_ORDER_REQUEST,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_FAIL,
    PAY_ORDER_RESET,
} from "../constants/orderConstants";
import {
    CART_CLEAR_ITEMS,
    CLEAR_PAYMENT_METHOD,
    CLEAR_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import axios from "axios";

export const addOrderAction =
    (
        user,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalCost,
        shippingAddress,
        orderItems,
        token
    ) =>
    async (dispatch) => {
        try {
            dispatch({ type: ADD_ORDER_REQUEST });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.post(
                "/api/order/post-order",
                {
                    user: user,
                    paymentMethod: paymentMethod,
                    taxPrice: taxPrice,
                    shippingPrice: shippingPrice,
                    totalCost: totalCost,
                    shippingAddress: shippingAddress,
                    orderItems: orderItems,
                },
                config
            );

            dispatch({
                type: ADD_ORDER_SUCCESS,
                payload: data,
            });

            dispatch({
                type: CART_CLEAR_ITEMS,
            });

            localStorage.setItem("cartItems", JSON.stringify([]));

            dispatch({
                type: CLEAR_SHIPPING_ADDRESS,
            });

            localStorage.setItem("shippingAddress", JSON.stringify(""));

            dispatch({
                type: CLEAR_PAYMENT_METHOD,
            });

            localStorage.setItem("paymentMethod", JSON.stringify(""));
        } catch (error) {
            dispatch({
                type: ADD_ORDER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const getOrderAction = (orderId, token) => async (dispatch) => {
    try {
        dispatch({ type: GET_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(
            `/api/order/get-order/${orderId}`,
            config
        );

        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const payOrderAction = (orderId, token) => async (dispatch) => {
    try {
        dispatch({ type: PAY_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(
            `/api/order/get-order/${orderId}/pay`,
            {},
            config
        );

        dispatch({
            type: PAY_ORDER_SUCCESS,
            payload: data,
        });

        dispatch({
            type: PAY_ORDER_RESET,
        });
    } catch (error) {
        dispatch({
            type: PAY_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
