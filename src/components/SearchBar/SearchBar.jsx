import { useState, useRef, useEffect } from 'react';
import { StyledSearchBar } from '.'
import { SearchIcon } from '@heroicons/react/outline'

const SearchBar = ({ optionCallback, searchCallback, searchHits, searchLoaded, findCallback }) => {

  const [isFocused, setIsFocused] = useState(true)

  /**
  * Hook that alerts clicks outside of the passed ref
  */
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsFocused(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const mapHits = () => {
    return searchHits.map((searchHit, idx) => {
      return <span key={idx} onClick={e => {
        findCallback(searchHit.item.index)
        setIsFocused(false)
      }} className="searchResultItem">{searchHit.item.name}</span>
    })
  }

  return (
    <StyledSearchBar ref={wrapperRef}>
      <div className="headerSearch">
        <span className="titleText">Search for:</span>
        <select id="searchOptionsId" onChange={e => optionCallback(e.target.value)}>
          <option value="name">name</option>
          <option value="title">job title</option>
          <option value="company">company</option>
        </select>
      </div>
      <div className="searchContainer" onFocus={e => setIsFocused(true)}>
        <SearchIcon className="icon" />
        <input type="text" id="searchBar" autoComplete="off" placeholder="find who you're looking for here!" className="searchBar" onChange={e => searchCallback(e.target.value)} />
        <div className="searchResultsContainer">
          {searchHits.length > 0 && searchLoaded && isFocused ? mapHits() : <></>}
        </div>
      </div>
      
    </StyledSearchBar>
  )
}

export default SearchBar
