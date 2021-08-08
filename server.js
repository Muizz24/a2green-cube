const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

const jsonData = require('./jsonData/GC_assignment_data')

// initialized values here so whenever we wish to add any extra interest, it can conviently be done here
const interestOptions = { "pending": 0, "connected": 0, "responded": 0, "booking in progress": 0, "call booked": 0 }
const interestKeys = Object.keys(interestOptions)


app.get('/', (req, res) => res.send('Hello World!'));


app.get('/data/:page', (req, res) => {
  const currPage = parseInt(req.params.page)
  const dataPageNated = jsonData.data.slice((currPage * 10), (Math.min(jsonData.data.length, ((currPage + 1) * 10))))

  const lastPage = Math.ceil(jsonData.data.length / 10)

  const filteredData = {
    fields: jsonData.schema.fields,
    data: dataPageNated,
    maxPage: lastPage
  }

  res.send(filteredData)
});

app.get('/data/user/:index', (req, res) => {
  const userIndex = parseInt(req.params.index)
  const userData = jsonData.data.filter((value) => value.index === userIndex)

  const filteredData = {
    data: userData,
  }

  res.send(filteredData)
});


app.get('/data/search/name/:searchVal', (req, res) => {
  const searchValue = req.params.searchVal
  const dataBasedOnSearch = jsonData.data.filter((value) => value.name.includes(searchValue)).splice(0, 10)


  const filteredData = {
    data: dataBasedOnSearch,
  }

  res.send(filteredData)
});

app.get('/data/summary/:days', (req, res) => {
  const today = new Date()
  const daysLimit = req.params.days

  let dataBasedOnSearch = {}

  jsonData.data.forEach((row) => {
    const userDate = new Date(row.outbound_date)
    const timeDifference = today.getTime() - userDate.getTime()
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    if (dayDifference <= daysLimit) {
      if (!dataBasedOnSearch[row.interest]) {
        console.log("adding new row")
        dataBasedOnSearch[row.interest] = 1
      } else {
        dataBasedOnSearch[row.interest] = dataBasedOnSearch[row.interest] + 1
      }
    }
  })

  delete dataBasedOnSearch["no connection"]

  const filteredData = {
    data: dataBasedOnSearch,
  }

  res.send(filteredData)
});


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


app.listen(port, () => console.log(`Example app started on port ${port}`));