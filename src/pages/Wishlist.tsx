import React from 'react';
import { useAppSelector } from '../redux/hook';
import { useGetUserWishlistQuery } from '../redux/features/user/userApi';
import { IBook } from '../components/home/bookGrid/BookGrid';
import Footer from '../layouts/Footer';
import { Link } from 'react-router-dom';
import Loader from '../components/ui/Loader';
import empty_svg from "../assets/empty.svg"
import { format } from 'date-fns';

const Wishlist = () => {
    const {user} = useAppSelector( state => state.user);
    const { data, isLoading} = useGetUserWishlistQuery(user.userId, {
        refetchOnMountOrArgChange: true,
    }) 

    if(isLoading){
        return <Loader />
    }

    return (
          <div>
      <div className='py-10'>
        <h1 className='text-3xl text-center font-bold text-gray-700'>My Wishlist</h1>
      </div>
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
            {data.data.wishlist.map((book:IBook) => (
              <tr key={book._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={book.thumbnail} alt={book.title} className="h-full w-10" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900"><Link to={`/books/${book._id}`}>{book.title}</Link></div>
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
        {data.data.wishlist.length === 0 && (
          <div>
            <div className="flex items-center justify-center pt-12">
              <div className="">
                <img src={empty_svg} alt="Loading" className="h-60 w-60" />
                <p className="text-center text-2xl py-3">List is empty</p>
              </div>
            </div>
          </div>
        )}
        <div className='fixed bottom-0 w-full'>
        <Footer />
        </div>
      </div>
          </div>
    );
};

export default Wishlist;