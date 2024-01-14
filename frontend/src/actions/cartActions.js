import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_DELETE_ITEM,
    ADD_SHIPPING_ADDRESS,
    ADD_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/get-product/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartItems.cartItems)
    );
};

export const deleteFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_DELETE_ITEM,
        payload: id,
    });

    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartItems.cartItems)
    );
};

export const addShippingAddress =
    (address, city, postalCode, country) => async (dispatch, getState) => {
        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // };

        // const { data } = await axios.post(
        //     "/api/order/post-shipping-address",
        //     {
        //         address: address,
        //         city: city,
        //         postalCode: postalCode,
        //         country: country,
        //     },
        //     config
        // );

        dispatch({
            type: ADD_SHIPPING_ADDRESS,
            payload: {
                address: address,
                city: city,
                postalCode: postalCode,
                country: country,
            },
        });

        localStorage.setItem(
            "shippingAddress",
            JSON.stringify(getState().shippingAddress.shippingAddress)
        );
    };

export const addPaymentMethodAction =
    (paymentMethod) => async (dispatch, getState) => {
        dispatch({
            type: ADD_PAYMENT_METHOD,
            payload: paymentMethod,
        });

        localStorage.setItem(
            "paymentMethod",
            JSON.stringify(getState().paymentMethod.paymentMethod)
        );
    };
