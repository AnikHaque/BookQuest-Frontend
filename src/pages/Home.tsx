import React from 'react';
import Header from '../components/home/Header';
import BookGrid from '../components/home/bookGrid/BookGrid';
import Footer from '../layouts/Footer';

const Home = () => {
    return (
        <>
            <Header />
            <BookGrid />
            <Footer />
        </>
    );
};

export default Home;