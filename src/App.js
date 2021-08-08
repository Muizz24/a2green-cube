import React, { useState, useEffect } from 'react'
import { Dashboard } from './components/Dashboard'
import { LoadingWidget } from './components/LoadingWidget'
import { SearchBar } from './components/SearchBar'
import { SummaryTable } from './components/SummaryTable'
import axios from 'axios';
import './App.css'

function App() {

  // variables for summary Table
  const [showSummaryTable, setShowSummaryTable] = useState(false)
  const [summaryValues, setSummaryValues] = useState({})
  const [daysAgo, setDaysAgo] = useState(30)

  // variables for search values
  const [searchVal, setSearchVal] = useState("")
  const [searchRes, setSearchRes] = useState([])
  const [searchLoaded, setSearchLoaded] = useState(false)

  // variables for dashboard
  const [fields, setFields] = useState([])
  const [pageNatedItems, setPageNatedItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);

  // variables for pages
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);

  // on mount
  useEffect(() => {
    axios.get(`/data/${page}`).then(response => {
      setPageNatedItems(response.data.data)
      setFields(response.data.fields)
      setMaxPage(response.data.maxPage)
      setIsLoaded(true)
    })
  }, [])

  // for whenever the user navigates to a new page
  useEffect(() => {
    setIsLoaded(false)
    axios.get(`/data/${page}`).then(response => {
      setPageNatedItems(response.data.data)
      setIsLoaded(true)
    })
  },[page])

  // for whenever the user searches for something new
  useEffect(() => {
    if (searchVal === "") {
      setSearchRes([])
    } else {
      setSearchLoaded(false)
      axios.get(`/data/search/name/${searchVal}`).then(response => {
        setSearchRes(response.data.data)
        setSearchLoaded(true)
      })
    }
    
  }, [searchVal])

  // for whenever the user switches to the summary dashboard
  useEffect(() => {
    setIsLoaded(false)
    axios.get(`/data/summary/${daysAgo}`).then(response => {
      console.log(response.data.data)
      setSummaryValues(response.data.data)
      setIsLoaded(true)
    })

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
    axios.get(`/data/user/${index}`).then(response => {
      setPageNatedItems(response.data.data)
      setIsLoaded(true)
    })
  }

  const showDaysOrPages = showSummaryTable ? showDaySelector() : mapPages()

  const TableToShow = showSummaryTable ? <SummaryTable content={summaryValues} days={daysAgo} /> : <Dashboard content={pageNatedItems} dataFields={fields} />

  return (
    <div className="MainContainer">
      <span className="App-header">DashBoard</span>
      <div className="dashBoardHeader">
        <SearchBar searchCallback={setSearchVal} searchHits={searchRes} searchLoaded={searchLoaded} findCallback={getUser} />
        <button className="switchTablesBtn" onClick={e => setShowSummaryTable(prevState => !prevState)}> {showSummaryTable ? "Show Dashboard" : "Show Summary Table"}</button>
      </div>
      <div className="pagesContainer">
        <div className="pageBtnsContainer">
          <span className="pagesText">{showSummaryTable ? "Days" : "Pages"}: </span>
          {isLoaded ? showDaysOrPages : <></>}
        </div>
        <span className="pagesText">{showSummaryTable ? "" : "Page " + (page + 1)}</span>
      </div>
      <div className="dashBoardBody">
        {isLoaded ? TableToShow : <LoadingWidget />}
      </div>
    </div>
  );
}

export default App;
