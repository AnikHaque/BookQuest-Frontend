import React from 'react';
import { useAppSelector } from '../../redux/hook';
import Footer from '../../layouts/Footer';
import { IBook } from '../home/bookGrid/BookGrid';
import { Link } from 'react-router-dom';
import { useGetBooksQuery } from '../../redux/features/book/bookApi';
import Loader from '../ui/Loader';
import { format } from 'date-fns';

const BookList = () => {
    const filter = useAppSelector( state => state.filter)

  const truthyFilter = {
    ...(filter.searchTerm && { searchTerm: filter.searchTerm }),
    ...(filter.genre && { genre: filter.genre }),
    ...(filter.publicationDate && { publicationDate: filter.publicationDate }),
  };

    const {data, isLoading} = useGetBooksQuery(truthyFilter,{
      refetchOnMountOrArgChange: true
    });

    if(isLoading){
        return <Loader />
    }

    return (
        <div className="flex flex-col  overflow-auto px-10">
        <table className="min-w-full divide-y divide-gray-200 flex-grow">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thumbnail
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Genre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publication Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
            {data.data.map((book:IBook) => (
              <tr key={book._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={book.thumbnail} alt={book.title} className="h-full w-10" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900"><Link to={`/books/${book._id}`}>{book.title.length > 75 ? `${book.title.slice(0,75)}...`: book.title }</Link></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{book.author}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{book.genre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{format(new Date(book.publicationDate), "MMMM d, yyyy")}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='sticky bottom-0 w-full'>
        <Footer />
        </div>
      </div>
    );
};

export default BookList;