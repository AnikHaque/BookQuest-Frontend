import React from 'react';
import { IBook } from './home/bookGrid/BookGrid';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { useToast } from './ui/use-toast';
import { toggleFinished } from '../redux/features/user/userThunk';

interface ListItemProps {
    book: IBook
  }

const ReadingListItem: React.FC<ListItemProps> = ({book:{title, author, genre, _id:bookId, thumbnail}}) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.user);
    const {toast} = useToast()
 
   const handleOnchange = () => {
    console.log("User",user);
    console.log("Book Id",typeof bookId)
   }

 const handleToggleFinish = () => {
     
        if (user.finished && user.finished.includes(bookId.toString())) {
          // If book is 
          const updatedList = user.finished.filter((id) => id !== bookId.toString()) 
          dispatch(
            toggleFinished({
              userId: user._id!,
              userInfo: { finished: updatedList },
            }),
          )
          toast({
            variant: 'success',
            description: 'Book is marked as unfinished',
            duration: 2000
           })
        } else {
          // if book is not in the finish list
          const updatedList = [...(user.finished ?? []), bookId]
          dispatch(
            toggleFinished({
              userId: user._id!,
              userInfo: { finished: updatedList },
            }),
          )
          toast({
            variant: 'success',
            description: 'Book is marked as finished',
            duration: 2000
            
           })
        }
      } 

    return (
        <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-10"
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            <Link to={`/books/${bookId}`}>{title}</Link>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{author}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{genre}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            <input
              type="checkbox"
              onChange={handleToggleFinish}
              checked={user.finished?.includes(bookId.toString())}
              className="form-checkbox text-primary-main h-5 w-5"
            />
          </div>
        </td>
      </tr>
    );
};

export default ReadingListItem;