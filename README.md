# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Downloads all dependencies and runs the front-end of the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

To run the backend portion of the app, you will need to cd into the server folder:

`cd server`

and run the following command:

`npm start`

## App Extra Features
For providing clarity, all features requested by the assignment have been met (eg. dashboard, searchbar, summary table, etc.). The purpose of this section is to provide features that were otherwise not mandatory but rather to showcase my skills. 

#### Fuzzy Search!
app uses Fuse.js on the back-end to find close accuracies of values that may have been mistyped by the user which provides a better UX experience for the client. 

#### Pagenation!
front-end portion of the app uses a useEffect hook followed with a useState hook to make sure to only fetch 10 values per page to reduce time taken to load the whole page on initialization of lots of data. This enables an overall better UI/UX experience for users navigating through the page as it prevents lag and allows for easier navigation.

#### Day specific Summary Table!
Table holds all the possible leads in the past x days which can be adjusted to another set of days based on the select menu. This provides users with a broadder understanding of their summary data based on the dashboard.

#### Search for different table fields!
Search bar has a drop down that allows the user to modify the field they want to look into for searching. eg the user can look for someone based on their name, company or title. This allows users to help pinpoint their search results to what they were looking for.

#### Smart Search bar!
The search bar comes with its own useEffect, useState, and useRef hooks to hide search results on no input, when user clicks away from the search bar, or when a value is selected. This enables an overall better UI/UX experience for users navigating through the page.


## Video Demo Link
**Please Note: The sound in the first few seconds of the video is really loud but later on normalizes!**

[video link](https://www.dropbox.com/s/q41ecu8wwb4g6np/React%20App%20-%20Google%20Chrome%202021-08-08%2009-50-16.mp4?dl=0)
