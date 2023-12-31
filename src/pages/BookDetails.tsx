import React, { useRef } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { BsBank2 } from "react-icons/bs"
import { SlCalender } from "react-icons/sl"
import { BiBookBookmark } from "react-icons/bi"
import { FaEdit } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "../redux/hook"
import { useGetSingleBookQuery } from "../redux/features/book/bookApi"
import { addToReadList, addWishlist } from "../redux/features/user/userThunk"
import ConfirmModal from "../components/ConfirmModal"
import { useToast } from "../components/ui/use-toast"
import Loader from "../components/ui/Loader"
import { ScrollArea } from "../components/ui/scroll-area"
import Reviews from "../components/Reviews"
import Footer from "../layouts/Footer"
import { Link as ScrollLink, Element } from "react-scroll";


const BookDetails = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.user)
  const { bookId } = useParams()
  const { toast } = useToast()
  const { data, isLoading } = useGetSingleBookQuery(bookId)

  if (isLoading) {
    return <Loader />
  }

  const bookDetails = data.data

  // add to wishlist
  const handleAddToWishlist = () => {
    if (!user.email) {
      toast({
        variant: "destructive",
        duration: 2000,
        description: "Please login first"
    })
    return
    }
    const bookId: string = bookDetails._id

    if (user.wishlist && user.wishlist.includes(bookId)) {
      // If book is already in wishlist
      const updatedWishlist = user.wishlist.filter((id) => id !== bookId) 
      dispatch(
        addWishlist({
          userId: user._id!,
          userInfo: { wishlist: updatedWishlist },
        }),
      )
      toast({
        variant: 'destructive',
        description: 'Removed from wishlist',
        duration: 2000
       })
    } else {
      // if book is not in the wishlist
      const updatedWishlist = [...(user.wishlist ?? []), bookId]
      console.log("Book added to wishlist")
      dispatch(
        addWishlist({
          userId: user._id!,
          userInfo: { wishlist: updatedWishlist },
        }),
      )
      toast({
        variant: 'success',
        description: 'Added to wishlist',
        duration: 2000
        
       })
    }
  }

  // add to Readlist
  const handleAddToReadlist = () => {
    if (!user.email) {
      toast({
        variant: "destructive",
        duration: 2000,
        description: "Please login first"
    })
    return
    }

    const bookId: string = bookDetails._id

    if (user.readingList && user.readingList.includes(bookId)) {
      // Book is already in the readlist
      const updatedReadlist = user.readingList.filter((id) => id !== bookId)
      dispatch(
        addToReadList({
          userId: user._id!,
          userInfo: { readingList: updatedReadlist },
        }),
      )
      toast({
        variant: 'destructive',
        description: 'Removed from the readlist',
        duration: 2000
        
       })
    } else {
      // if book is not in the readlist
      const updatedReadlist = [...(user.readingList ?? []), bookId]
      dispatch(
        addToReadList({
          userId: user._id!,
          userInfo: { readingList: updatedReadlist },
        }),
      )
      toast({
        variant: 'success',
        description: 'Added to readlist',
        duration: 2000
        
       })
    }
  }

  return (
      <>
       <div>
       <div
      className="w-full  flex justify-between px-20 pt-12"
      style={{ height: `calc(100vh - ${78}px)` }}
    >
      <div className="w-1/3">
        <div className="w-full">
          <img
            className="w-full h-[35rem]"
            src={bookDetails.thumbnail}
            alt=""
          />
        </div>
        <div className="w-full flex justify-center gap-5 pt-3">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-gray-100 hover:border hover:text-black text-white rounded-md"
            onClick={handleAddToWishlist}
          >
            {" "}
            {user.wishlist?.includes(bookDetails._id)
              ? "Remove from wishlist"
              : "Add to wishlist"}
          </button>
          <button
            className="px-4 py-2 bg-green-500 hover:bg-gray-100 hover:border hover:text-black text-white rounded-md"
            onClick={handleAddToReadlist}
          >
            {user.readingList?.includes(bookDetails._id)
              ? "Remove from Readlist"
              : "Add to Readlist"}
          </button>
        </div>
      </div>
      <div className="w-2/3 flex flex-col justify-between h-[35rem] px-5">
        <div>
          <h2 className="text-3xl font-bold text-gray-700 text-center ">
            {" "}
            {bookDetails.title}
          </h2>
          <p className="text-center font-bold text-gray-500 pt-2">
            By {bookDetails.author}
          </p>
          <ScrollArea className="h-[250px] w-full rounded-md border p-4 mt-5 font-serif">
  {bookDetails.description}
</ScrollArea>
          {user.email && <div className="pt-12 flex gap-5">
            <Link to={`/edit-book/${bookId}`} className="px-4 py-2 bg-indigo-500 flex justify-center items-center hover:bg-gray-100 hover:border hover:text-black text-white rounded-md">
              <FaEdit />
            </Link>
            <ConfirmModal/>
          </div>}
     <div className=" py-4">
     <ScrollLink
       activeClass="active"
       to="reviewsSection"
       spy={true}
       smooth={true}
       duration={500}
        className="px-4 py-2 my-2 bg-indigo-500 text-white rounded-md hover:bg-gray-100 hover:border cursor-pointer hover:text-black"
      >
        Reviews
      </ScrollLink>
     </div>
        </div>
        <div className="flex w-full justify-between text-gray-600 font-semibold">
          <p className="flex items-center gap-2">
            <BsBank2 /> <span>Publication: Penguin House</span>
          </p>
          <p className="flex items-center gap-2">
            <SlCalender />{" "}
            <span>Publication Date: {bookDetails.publicationDate}</span>
          </p>
          <p className="flex items-center gap-2">
            <BiBookBookmark /> <span>Genre: {bookDetails.genre}</span>
          </p>
        </div>
      </div>
    </div>
    <div>
    <Element name="reviewsSection" id="reviewsSection">
      <Reviews />
      </Element>
    </div>
    </div>
    <Footer />
      </>
   
  )
}

export default BookDetails
