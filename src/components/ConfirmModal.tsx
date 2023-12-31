import React, { useEffect } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';
import { RiDeleteBin5Line } from "react-icons/ri"
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';
import { useDeleteBookMutation } from '../redux/features/book/bookApi';
import { useToast } from './ui/use-toast';

export type MyCustomError = {
  status: number;
  data: {
    message: string;
  };
};


const ConfirmModal = () => {
   const { bookId } = useParams();
   const { _id:userId} = useAppSelector( state => state.user.user);
   const navigate = useNavigate();
   const { toast } = useToast();

   const [ deleteBook, {isError, isSuccess, isLoading, error}] = useDeleteBookMutation();

   const handleConfirm = () => {
    deleteBook({bookId, userId})
   }

   useEffect(() => {
    if (!isLoading && isError) {
      const fetchBaseQueryError = error as MyCustomError; // Type assertion
      toast({
        variant: "destructive",
        title: "Failed to delete book.",
        description: fetchBaseQueryError.data?.message,
        duration: 2000
      });
    }
  }, [isError, isLoading]);
  
  

   useEffect(() => {

    if(!isLoading && isSuccess){
        toast({
            variant: "destructive",
            title: "Book deleted successfully",
            duration: 2000
          })
          navigate('/')
       }

   },[isSuccess, isError, isLoading])



   


    return (
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="px-4 py-2 bg-red-500 text-white rounded-md" variant="outline"><RiDeleteBin5Line /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the book and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="px-4 py-2 bg-red-500 hover:bg-red-500 text-white rounded-md" onClick={handleConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    );
};

export default ConfirmModal;