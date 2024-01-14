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

export const orderReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ADD_ORDER_REQUEST:
            return { loading: true, order: {} };
        case ADD_ORDER_SUCCESS:
            return { loading: true, success: true, order: action.payload };
        case ADD_ORDER_FAIL:
            return { loading: true, success: false, error: action.payload };
        default:
            return state;
    }
};

export const orderDetailsReducer = (
    state = { order: { orderItems: [], shippingAddress: {}, user: {} } },
    action
) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return { loading: true, order: {} };
        case GET_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case GET_ORDER_FAIL:
            return { loading: false, success: false, error: action.payload };
        default:
            return state;
    }
};

export const orderPayReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case PAY_ORDER_REQUEST:
            return { loading: true };
        case PAY_ORDER_SUCCESS:
            return { loading: false, success: true };
        case PAY_ORDER_FAIL:
            return { loading: false, success: false };
        case PAY_ORDER_RESET:
            return {};
        default:
            return state;
    }
};
