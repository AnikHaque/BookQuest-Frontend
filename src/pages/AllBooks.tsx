import React from 'react';
import SearchBar from '../components/allBooks/SearchBar';
import BookList from '../components/allBooks/BookList';
import Footer from '../layouts/Footer';

const AllBooks = () => {
    return (
        <div className='flex flex-col overflow-hidden' style={{ height: `calc(100vh - ${78}px)` }}>
            <SearchBar />
            <BookList />
        </div>
    );
};

export default AllBooks;