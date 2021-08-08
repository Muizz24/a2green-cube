import { useState } from 'react';
import { StyledSearchBar } from '.'
import { SearchIcon } from '@heroicons/react/outline'

const SearchBar = ({ searchCallback, searchHits, searchLoaded, findCallback }) => {

  const [isFocused, setIsFocused] = useState(true)

  const mapHits = () => {
    return searchHits.map((searchHit, idx) => {
      return <span key={idx} onClick={e => {
        findCallback(searchHit.index)
        setIsFocused(false)
      }} className="searchResultItem">{searchHit.name}</span>
    })
  }

  return (
    <StyledSearchBar>
      <span className="titleText">Search </span>
      <div className="searchContainer" onFocus={e => setIsFocused(true)}>
        <SearchIcon className="icon" />
        <input type="text" id="searchBar" autoComplete="off" placeholder="find your value here" className="searchBar" onChange={e => searchCallback(e.target.value)} />
        <div className="searchResultsContainer">
          {searchHits.length > 0 && searchLoaded && isFocused ? mapHits() : <></>}
        </div>
      </div>
      
    </StyledSearchBar>
  )
}

export default SearchBar
