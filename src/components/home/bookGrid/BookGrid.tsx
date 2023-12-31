// BookGrid.tsx

import React, { useEffect, useState } from 'react';
import { Card } from '../../ui/card';
import { format } from 'date-fns';
import { useGetBooksQuery } from '../../../redux/features/book/bookApi';
import GridItem from './GridItem';


export interface IBook {
  _id: number;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}


const BookGrid = () => {
    const [sortedBooks, setSortedBooks] = useState<IBook[]>([]);
  const { data, isLoading } = useGetBooksQuery(undefined, {
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (!isLoading && data.data.length !== 0) {
      const sortedList = [...data.data].sort((a: IBook, b: IBook) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
      setSortedBooks(sortedList);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='py-16 px-12'>
    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
    New Arrivals
    </h2>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-10">
      {data.data
      .slice(0, 10)
      .map((book: IBook) => (
        <GridItem book={book} />
      ))}
    </div>
  </div>
  );
};

export default BookGrid;