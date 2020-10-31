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

const App = () => {
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/' component={HomeScreen} exact />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
