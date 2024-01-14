import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";
import OrderListScreen from "./screens/OrderListScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Router>
                <Header />
                <main className="py-3">
                    <Container>
                        <Routes>
                            <Route path="/" element={<HomeScreen />} exact />
                            <Route
                                path="/login"
                                element={<LoginScreen />}
                                exact
                            />
                            <Route
                                path="/register"
                                element={<RegisterScreen />}
                                exact
                            />
                            <Route
                                path="/profile"
                                element={<ProfileScreen />}
                                exact
                            />
                            <Route
                                path="/product/:id"
                                element={<ProductScreen />}
                            />
                            <Route
                                path="/checkout"
                                element={<ShippingAddressScreen />}
                            />
                            <Route
                                path="/payment"
                                element={<PaymentScreen />}
                            />
                            <Route
                                path="/place-order"
                                element={<PlaceOrderScreen />}
                            />
                            <Route
                                path="/order/:id"
                                element={<OrderDetailsScreen />}
                            />
                            <Route
                                path="/admin/users"
                                element={<UserListScreen />}
                            />
                            <Route
                                path="/admin/users/:id/edit"
                                element={<UserEditScreen />}
                            />
                            <Route
                                path="/admin/products"
                                element={<ProductListScreen />}
                            />
                            <Route
                                path="/admin/products/:id/edit"
                                element={<ProductEditScreen />}
                            />
                            <Route
                                path="/admin/products/create"
                                element={<ProductCreateScreen />}
                            />
                            <Route
                                path="/admin/orders"
                                element={<OrderListScreen />}
                            />
                            <Route path="/cart/:id?" element={<CartScreen />} />
                        </Routes>
                    </Container>
                </main>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
