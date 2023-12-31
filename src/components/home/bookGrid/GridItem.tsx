import React from 'react';
import { Card } from '../../ui/card';
import { format } from 'date-fns';
import { IBook } from './BookGrid';
import { Link } from 'react-router-dom';

interface GridItemProps {
    book: IBook
  }

const GridItem: React.FC<GridItemProps> = ({book}) => {
    return (
        <Link to={`/books/${book._id}`} >    
        <Card key={book._id} className="h-[220px] flex hover:scale-105 transition-all">
          <div className="w-1/3 p-4">
            <img
              src={book.thumbnail}
              alt={book.title}
              className="w-full h-[100%] object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="w-2/3 p-4 flex flex-col">
            <h2 className="text-lg font-semibold mb-2">{book.title.length > 75 ? `${book.title.slice(0, 70)}...`: book.title}</h2>
            <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
            <p className="text-sm text-gray-600 mb-2">Genre: {book.genre}</p>
            <p className="text-sm text-gray-600">Publication Date: {format(new Date(book.publicationDate), "MMMM d, yyyy")}</p>
          </div>
        </Card>
        </Link>
    );
};

export default GridItem;