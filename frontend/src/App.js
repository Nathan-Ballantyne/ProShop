import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomeScreen from './components/Screens/HomeScreen/HomeScreen';

const App = () => {
    return (
        <>
            <Header />
            <main className='py-3'>
                <Container>
                    <HomeScreen />
                </Container>
            </main>
            <Footer />
        </>
    );
};

export default App;
