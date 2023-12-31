import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import Select from 'react-select';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { insertSearchTerm, toggleGenre, togglePublicationYear } from '../../redux/features/filter/filterSlice';
import { api } from '../../redux/api/apiSlice';
import { Link } from 'react-router-dom';

const SearchBar = ({}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const {searchTerm, genre, publicationDate} = useAppSelector( state => state.filter)

  const handleGenreChange = (selectedOption: { value: any; }| null) => {
     dispatch(toggleGenre(selectedOption?.value || null))
  };

  const handlePublicationYearChange = (selectedOption: any) => {
      dispatch(togglePublicationYear((selectedOption as any)?.value || null))
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const truthyFilter = {
        ...(searchTerm && { searchTerm: searchTerm }),
        ...(genre && { genre: genre }),
        ...(publicationDate && { publicationDate: publicationDate }),
      };
   console.log(truthyFilter);


  };

  const handleSearchTermChange = (event: { preventDefault: () => void; target: { value: string | undefined; }; })=> {
    dispatch(insertSearchTerm(event.target.value))
  }

  const handleClear = () => {
    dispatch(insertSearchTerm(""));
  };

  // Generate an array of years from 1800 to the present year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1799 }, (_, index) => currentYear - index);

  const yearOptions = years.map((year) => ({
    value: year,
    label: year.toString(),
  }));

  const genreOptions = [
    { value: 'Fiction', label: 'Fiction' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Science Fiction', label: 'Science Fiction' },
    { value: 'Fantasy', label: 'Fantasy' },
    { value: 'Thriller', label: 'Thriller' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Historical Fiction', label: 'Historical Fiction' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Crime', label: 'Crime' },
    { value: 'Dystopian', label: 'Dystopian' },
    { value: 'Young Adult', label: 'Young Adult (YA)' },
    { value: 'Biography', label: 'Biography' },
    { value: 'Non-Fiction', label: 'Non-Fiction' },
    { value: 'Self-Help', label: 'Self-Help' },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center pt-6">
      {/* <AddBookmark open={open} setOpen={setOpen}  /> */}
      <h2 className="text-2xl text-gray-600 font-bold">Find books</h2>
      <div className='w-full flex items-center justify-center px-10'>
      <div className="w-1/2 flex justify-start items-center mt-2">
        <form
          onSubmit={handleSearch}
          className="w-[60%] border-2 border-primary-main rounded-full px-8 flex justify-between items-center h-10 text-sm"
        >
          <input
            type="text"
            placeholder="Search by title or author..."
            className="outline-none w-full bg-transparent border-none"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <button type="submit">
            <BiSearchAlt className="h-6 w-6 text-black" />
          </button>
          <button type="button" onClick={handleClear}>
            <RxCross2 className="h-6 w-6 text-black" />
          </button>
        </form>
      </div>
      <div className="w-1/2 flex items-center justify-end mt-4">
          <Select
            options={genreOptions}
            isClearable
            value={genreOptions.find((option) => option.value === genre) || null}
            onChange={handleGenreChange}
            placeholder="Select Genre"
            className="rounded-lg px-4 py-2"
          />      
          <Select
            options={yearOptions}
            isClearable
            value={yearOptions.find((option) => option.value === publicationDate) || null}
            onChange={handlePublicationYearChange}
            placeholder="Select Publication Year"
            className="rounded-lg px-4 py-2 basic-single"
            styles={{
              control: (provided) => ({
                ...provided,
                borderWidth: '1px', // Fix double border issue
              }),
            }}
          />

          <Link to={'/add-new-book'} className=" py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Book</Link>

      </div>
      </div>
    </div>
  );
};

export default SearchBar;
