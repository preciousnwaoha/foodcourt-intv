import React, { useState, useRef, useContext } from 'react';
import { CgSortAz } from 'react-icons/cg';
import { usePopper, Modifier, PopperProps } from 'react-popper';
import {matchSorter} from 'match-sorter'
import { AppContext } from '../context/app-context'
import { useSearchParams } from 'react-router-dom';



interface CustomPopperOptions {
  modifiers?: Modifier<any, any>[]; // You can adjust the types as needed for your modifiers
  // Add other options if necessary
  placement?: any;
}


const Sort: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
 
  // Get a specific query parameter
  const sortBy = searchParams.get('sort-by');

  const [isOpen, setIsOpen] = useState(false)

  const [referenceElement, setReferenceElement] = useState<null | HTMLElement>(null);
  const [popperElement, setPopperElement] = useState<null | HTMLElement>(null);
  const [arrowElement, setArrowElement] = useState<null | HTMLElement>(null);
  const customPopperOptions: CustomPopperOptions = {
    placement: 'bottom-start',    
    modifiers: [
      { 
        name: 'arrow', 
        options: { element: arrowElement } 
      },
      {
        name: 'offset',
        options: {
          offset: [0, 12]
        }
      }
    ],
      
    // Add other options if necessary
  };

  const handleToggleOpen = () => {
    setIsOpen(prev => !prev)
  }

  const handleSortBy = (_by: string) => {
    // Set a search query parameter
    setSearchParams({ 'sort-by': _by });
  } 

  const { styles, attributes } = usePopper(referenceElement, popperElement, customPopperOptions);

  const baseClass = 'shadow rounded-lg py-2 bg-white text-[#212224] text-sm'

  const fullClass = isOpen ? baseClass : baseClass + ' hidden'


  return (
    <>
        <button className='grid grid-cols-2 gap-12 justify-between 
        border rounded-md pl-4 py-2 items-center cursor-pointer text-[#5E6164]'
        ref={setReferenceElement}
        onClick={handleToggleOpen}
        >
        <p className='text-sm'>Sort</p>
        <div className="text-xl text-center">
          <CgSortAz className="outline-red" />
        </div>
        </button>
        

      <ul ref={setPopperElement} style={styles.popper} {...attributes.popper} className={fullClass}>
        <li className='px-4 py-2 hover:bg-slate-100 cursor-pointer' 
        onClick={() => {handleSortBy("name")}}>By name</li>
        <li className={'px-4 py-2 hover:bg-slate-100 cursor-pointer'}
        onClick={() => {handleSortBy("time")}}>By time created</li>
        <div ref={setArrowElement} style={styles.arrow} />
      </ul>
    </>
  );
};

export default Sort;
