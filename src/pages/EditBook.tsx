import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hook"
import { useNavigate, useParams } from "react-router-dom"
import { useEditBookMutation, useGetSingleBookQuery } from "../redux/features/book/bookApi"
import { useForm } from "react-hook-form"
import { useToast } from "../components/ui/use-toast"
import Loader from "../components/ui/Loader"
import { MyCustomError } from "../components/ConfirmModal"

const EditBook = () => {
  const { bookId } = useParams()
  const { data, isLoading, refetch } = useGetSingleBookQuery(bookId)
  const { user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { toast } = useToast();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: data?.data.title || "",
      author: data?.data.author || "",
      genre: data?.genre || "",
      thumbnail: data?.data.thumbnail || "",
      description: data?.data.description || "",
      publicationDate: data?.data.publicationDate || "",
    },
  })

  useEffect(() => {
    if (data) {
      setValue("title", data.data.title)
      setValue("author", data.data.author)
      setValue("genre", data.data.genre)
      setValue("thumbnail", data.data.thumbnail)
      setValue("description", data.data.description)
      setValue("publicationDate", data.data.publicationDate)
    }
  }, [data, setValue])

    const [editBook, { isSuccess, isLoading: isEditLoading , isError, error}] = useEditBookMutation();

  const onSubmit = (formData: any) => {
    const updatedFormData = { ...formData, addedBy: user._id }

    console.log(updatedFormData)

    editBook({data:updatedFormData, bookId: bookId})
      .unwrap()
      .then(() => {
       refetch();
      });
  }

//   Notify the success or failure
useEffect(() => {

    if(!isLoading && isError){
      const fetchBaseQueryError = error as MyCustomError; // Type assertion
        toast({
            variant: "destructive",
            title: "Failed to edit book.",
            description: fetchBaseQueryError?.data?.message || "Something went wrong",
            duration: 2000
          })
       }

   },[isError, isLoading])

useEffect(() => {

    if(!isLoading && isSuccess){
        toast({
            variant: "success",
            title: "Book information updated successfully",
            duration: 2000
          })
          navigate(`/books/${bookId}`)
       }

   },[isSuccess, isLoading])

  if (isLoading || isEditLoading) {
    return <Loader />;
  }

  return (
    <div className="p-8 overflow-hidden bg-white shadow-cardShadow rounded-md max-w-xl mx-auto">
      <h4 className="mb-8 text-xl font-bold text-center">Edit Book</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">
            Title
          </label>
          <input
            required
            type="text"
            id="title"
            {...register("title")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-main"
          />
        </div>

        <div>
          <label htmlFor="author" className="block font-medium text-gray-700">
            Author
          </label>
          <input
            required
            type="text"
            id="author"
            {...register("author")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-main"
          />
        </div>

        <div>
          <label htmlFor="genre" className="block font-medium text-gray-700">
            Genre
          </label>
          <select
            required
            id="genre"
            {...register("genre")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-main"
          >
            <option value="">Select Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Fiction">Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Thriller">Thriller</option>
            <option value="Horror">Horror</option>
            <option value="Historical Fiction">Historical Fiction</option>
            <option value="Adventure">Adventure</option>
            <option value="Crime">Crime</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Young Adult">Young Adult (YA)</option>
            <option value="Biography">Biography</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Self-Help">Self-Help</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="thumbnail"
            className="block font-medium text-gray-700"
          >
            Image Url
          </label>
          <input
            required
            type="text"
            id="thumbnail"
            {...register("thumbnail")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-main"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            required
            id="description"
            maxLength={700}
            {...register("description")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-main"
          />
        </div>

        <div>
          <label
            htmlFor="publicationDate"
            className="block font-medium text-gray-700"
          >
            Publication Date
          </label>
          <input
            required
            type="date"
            id="publicationDate"
            {...register("publicationDate")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-main"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary-main bg-blue-500 text-white font-semibold rounded-lg focus:outline-none"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditBook
