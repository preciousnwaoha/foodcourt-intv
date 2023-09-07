import React, {useContext} from 'react'
import {RiSearchLine} from 'react-icons/ri'
import {matchSorter} from 'match-sorter'
import { AppContext } from '../context/app-context'
import { useSearchParams } from 'react-router-dom';


const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const appCtx = useContext(AppContext)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // updateSearchedFiles(matchSorter(files, e.target.value, {keys: ['name']}))
        // Set a query parameter
        if (e.target.value.trim() !== "" ) {
          setSearchParams({search: e.target.value})
        } else {
          // Remove a query parameter
          setSearchParams((params) => {
            params.delete('search');
            return params;
          });
        }
        

        
    }

    



  return (
    <div className='flex items-center border rounded-md px-2 py-2 w-64 text-[#96999C]'>
      <RiSearchLine className='mx-2 ' />
    <input className='text-sm focus:outline-none focus:border-none' 
    onChange={handleChange} placeholder='Search'  />

    </div>
  )
}

export default Search