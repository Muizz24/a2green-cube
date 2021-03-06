const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
var cors = require("cors");
const Fuse = require('fuse.js')



app.use(cors());

app.use(express.static(path.join(__dirname, "..", "build")));

const jsonData = require(path.join(__dirname, 'jsonData', 'GC_assignment_data'))




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

  res.setHeader('Content-Type', 'application/json').json(filteredData)
});

app.get('/data/user/:index', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const userIndex = parseInt(req.params.index)
  const userData = jsonData.data.filter((value) => value.index === userIndex)

  const filteredData = {
    data: userData,
  }

  res.send(filteredData)
});


app.get('/data/search/:searchOption/:searchVal', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const searchValue = req.params.searchVal
  const searchOption = req.params.searchOption

  try {
    const options = {
      keys: [searchOption]
    }

    // setup fuzzy search based on given search option
    const fuse = new Fuse(jsonData.data, options)

    const dataBasedOnSearch = fuse.search(searchValue).splice(0, 10)


    const filteredData = {
      data: dataBasedOnSearch,
    }

    res.send(filteredData)
  } catch (error) {
    console.log(error)
  }
  
});

app.get('/data/summary/:days', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const today = new Date()
  const daysLimit = req.params.days

  let dataBasedOnSearch = {}

  jsonData.data.forEach((row) => {
    const userDate = new Date(row.outbound_date)
    const timeDifference = today.getTime() - userDate.getTime()
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    if (dayDifference <= daysLimit) {
      if (!dataBasedOnSearch[row.interest]) {
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

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});


app.listen(port, () => console.log(`Example app started on port ${port}`));