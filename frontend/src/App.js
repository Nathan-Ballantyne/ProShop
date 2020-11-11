import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomeScreen from './components/Screens/HomeScreen/HomeScreen';
import ProductScreen from './components/Screens/ProductScreen/ProductScreen';
import CartScreen from './components/Screens/CartScreen/CartScreen';
import LoginScreen from './components/Screens/LoginScreen/LoginScreen';
import RegisterScreen from './components/Screens/RegisterScreen/RegisterScreen';
import ProfileScreen from './components/Screens/ProfileScreen/ProfileScreen';
import ShippingScreen from './components/Screens/ShippingScreen/ShippingScreen';
import PaymentScreen from './components/Screens/PaymentScreen/PaymentScreen';
import PlaceOrderScreen from './components/Screens/PlaceOrderScreen/PlaceOrderScreen';
import OrderScreen from './components/Screens/OrderScreen/OrderScreen';
import UserListScreen from './components/Screens/UserListScreen/UserListScreen';
import UserEditScreen from './components/Screens/UserEditScreen/UserEditScreen';

const App = () => {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route path='/order/:id' component={OrderScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/payment' component={PaymentScreen} />
                    <Route path='/placeorder' component={PlaceOrderScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/admin/userlist' component={UserListScreen} />
                    <Route
                        path='/admin/user/:id/edit'
                        component={UserEditScreen}
                    />
                    <Route path='/' component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
