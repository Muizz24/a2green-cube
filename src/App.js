import React, { useState, useEffect } from 'react'
import { Dashboard } from './components/Dashboard'
import { LoadingWidget } from './components/LoadingWidget'
import { SearchBar } from './components/SearchBar'
import { SummaryTable } from './components/SummaryTable'
import './App.css'

function App() {

  // variables for summary Table
  const [showSummaryTable, setShowSummaryTable] = useState(false)
  const [summaryValues, setSummaryValues] = useState({})
  const [daysAgo, setDaysAgo] = useState(30)

  // variables for search values
  const [searchVal, setSearchVal] = useState("")
  const [searchOption, setSearchOption] = useState("name")
  const [searchRes, setSearchRes] = useState([])
  const [searchLoaded, setSearchLoaded] = useState(false)
  const [showSearchResult, setShowSearchResult] = useState(false)

  // variables for dashboard
  const [fields, setFields] = useState([])
  const [pageNatedItems, setPageNatedItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);

  // variables for pages
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);

  // on mount
  useEffect(() => {
    fetch(`/data/${page}`)
      .then(response => response.json())
      .then(response => {
        setPageNatedItems(response.data)
        setFields(response.fields)
        setMaxPage(response.maxPage)
        setIsLoaded(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // for whenever the user searches for something new
  useEffect(() => {
    if (searchVal === "") {
      setSearchRes([])
    } else {
      setSearchLoaded(false)
      fetch(`/data/search/${searchOption}/${searchVal}`)
        .then(response => response.json())
        .then(response => {
          setSearchRes(response.data)
          setSearchLoaded(true)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal, searchOption])

  // for whenever the user navigates to a new page
  useEffect(() => {
    setIsLoaded(false)
    fetch(`/data/${page}`)
      .then(response => response.json())
      .then(response => {
        setPageNatedItems(response.data)
        setIsLoaded(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // for whenever the user switches to the summary dashboard
  useEffect(() => {
    setIsLoaded(false)
    fetch(`/data/summary/${daysAgo}`)
      .then(response => response.json())
      .then(response => {
        setSummaryValues(response.data)
        setIsLoaded(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daysAgo])

  // changing the pages buttons
  const mapPages = () => {
    const pages = []
    const currPage = page
    let indexLimit = -3
    while (currPage + indexLimit <= maxPage && indexLimit < 7) {
      if (currPage + indexLimit >= 0) {
        const btnPage = currPage + indexLimit
        pages.push(
          <button key={currPage + indexLimit} className="pageBtn" onClick={e => {
            e.preventDefault();
            setPage(btnPage);
          }}>
            {currPage + indexLimit + 1}
          </button>
        )
      }
      indexLimit++;
    }
    if (currPage + indexLimit < maxPage) {
      pages.push(<span key={maxPage+1} className="pagesText">. . . {maxPage} Pages</span>)
    }
    return pages;
  }

  const showDaySelector = () => {

    return (
      <div className="selectWrapper">
        <select value={daysAgo} id="daySelector" onChange={e => { setDaysAgo(e.target.value) }}>
          <option value="10">10 days ago</option>
          <option value="30">30 days ago</option>
          <option value="60">60 days ago</option>
          <option value="100">100 days ago</option>
        </select>
      </div>)

      }

  const getUser = async (index) => {
    setIsLoaded(false)
    setShowSummaryTable(false)
    setShowSearchResult(false)
    fetch(`/data/user/${index}`)
      .then(response => response.json())
      .then(response => {
        setPageNatedItems(response.data)
        setIsLoaded(true)
        setShowSearchResult(true)
    })
  }

  const showDaysOrPages = showSummaryTable ? showDaySelector() : mapPages()

  const TableToShow = showSummaryTable ? <SummaryTable content={summaryValues} days={daysAgo} /> : <Dashboard content={pageNatedItems} dataFields={fields} />

  return (
    <div className="MainContainer">
      <span className="App-header">DashBoard</span>
      <div className="dashBoardHeader">
        <SearchBar optionCallback={setSearchOption} searchCallback={setSearchVal} searchHits={searchRes} searchLoaded={searchLoaded} findCallback={getUser} />
        <button className="switchTablesBtn" onClick={e => setShowSummaryTable(prevState => !prevState)}> {showSummaryTable ? "Show Dashboard" : "Show Summary Table"}</button>
      </div>
      <div className="pagesContainer">
        <div className="pageBtnsContainer">
          {showSearchResult ? <button className="pageBtn" onClick={
            e => {
              e.preventDefault();
              setShowSearchResult(false)
              setPage(page + 1)
            }
          }>Back to Dashboard</button> : <></>}
          <span className="pagesText">{!showSearchResult ? (showSummaryTable ? "Days:" : "Pages:") : ""} </span>
          {isLoaded && !showSearchResult ? showDaysOrPages : <></>}
        </div>
        <span className="pagesText">{showSummaryTable || showSearchResult ? "" : "Page " + (page + 1)}</span>
      </div>
      <div className="dashBoardBody">
        {isLoaded ? TableToShow : <LoadingWidget />}
      </div>
    </div>
  );
}

export default App;
