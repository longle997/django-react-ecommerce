import {
    CART_ADD_ITEM,
    CART_DELETE_ITEM,
    CART_CLEAR_ITEMS,
    ADD_SHIPPING_ADDRESS,
    CLEAR_SHIPPING_ADDRESS,
    ADD_PAYMENT_METHOD,
    CLEAR_PAYMENT_METHOD,
} from "../constants/cartConstants";

// reducer is the only place we can modify data in store
export const cartReducer = (state = { cartItems: [] }, action) => {
    let existItems = null;
    switch (action.type) {
        case CART_ADD_ITEM:
            // get item from payload
            const item = action.payload;
            // find above item in current state
            existItems = state.cartItems.find(
                (x) => x.product === item.product
            );
            if (existItems) {
                // return state => update cartItems key after loop through all elements and replace element which match with existItems (in this case is update qty)
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItems.product ? item : x
                    ),
                };
            } else {
                // return state => update cartItems key by adding new item to the list
                // the reason for return ...state is what we return here will overide the entire state value
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case CART_DELETE_ITEM:
            // get item from payload
            const id = action.payload;
            // find above item in current state
            existItems = state.cartItems.find((x) => x.product === id);
            if (existItems) {
                // return state => update cartItems key after loop through all elements and replace element which match with existItems (in this case is update qty)
                return {
                    ...state,
                    cartItems: state.cartItems.filter(
                        (x) => x.product !== existItems.product
                    ),
                };
            }
        case CART_CLEAR_ITEMS:
            return { ...state, cartItems: [] };
        default:
            return state;
    }
};

export const addShippingAddressReducer = (
    state = { shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case ADD_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload };

        case CLEAR_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: {} };

        default:
            return state;
    }
};

export const addPaymentMethodReducer = (
    state = { paymentMethod: {} },
    action
) => {
    switch (action.type) {
        case ADD_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };

        case CLEAR_PAYMENT_METHOD:
            return { ...state, paymentMethod: "" };

        default:
            return state;
    }
};
