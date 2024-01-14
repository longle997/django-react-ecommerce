import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
    productListReducer,
    productDetailsReducer,
} from "./reducers/productReducers";
import {
    cartReducer,
    addShippingAddressReducer,
    addPaymentMethodReducer,
} from "./reducers/cartReducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
} from "./reducers/userReducers";
import { orderReducer, orderDetailsReducer } from "./reducers/orderReducers";
import { orderPayReducer } from "./reducers/orderReducers";
import { userListReducer } from "./reducers/userReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailsReducer,
    cartItems: cartReducer,
    userInfo: userLoginReducer,
    userRegisterInfo: userRegisterReducer,
    userDetails: userDetailsReducer,
    shippingAddress: addShippingAddressReducer,
    paymentMethod: addPaymentMethodReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    userList: userListReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : null;

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : null;

const initialState = {
    cartItems: { cartItems: cartItemsFromLocalStorage },
    userInfo: { userInfo: userInfoFromLocalStorage },
    shippingAddress: { shippingAddress: shippingAddressFromLocalStorage },
    paymentMethod: { paymentMethod: paymentMethodFromLocalStorage },
};

const middleware = [thunk];

// store is place to store data, we can use/update this data among the app
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
