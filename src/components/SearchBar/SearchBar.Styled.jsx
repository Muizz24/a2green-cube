import styled from 'styled-components'

const StyledSearchBar = styled.div`
  color: #191919;

  .titleText {
    width: 25%;
    color: white;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
    padding-left: 5px;
  }

  .searchContainer {
    width: auto;
    height: auto;
    position: relative;
    overflow: visible;
  }

  .headerSearch {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .icon {
    width: 20px;
    height: 20px;
    color: grey;
    position: absolute;
    left: 2%;
    top: 20%;
  }

  .searchBar {
    width: 400px;
    border-radius: 5px;
    height: 20px;
    padding: 5px;
    padding-left: 30px;
    font-size: 14px;
  }

  .searchResultsContainer {
    left: 1%;
    width: 98%;
    height: auto;
    position: absolute;
    display: flex;
    background-color: white;
    border: 1px solid #EEEEEE;
    flex-direction: column;
    gap: 5px;
  }

  .searchResultItem {
    position: relative;
    width: 96%;
    height: 25px;
    padding: 5px;
    padding-left: 10px;
    color: #191919;
    background-color: white;
    cursor: pointer;
    
    &:hover {
       background-color: #add8e6;
    }
  }
`

export default StyledSearchBar
