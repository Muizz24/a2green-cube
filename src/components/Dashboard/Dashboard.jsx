import React, { useState } from 'react'
import { StyledDashboard } from '.'

const Dashboard = ({ content, dataFields }) => {


  const mapHeaders = () => {
    return dataFields.map((field, idx) => {
      if (field.name === "index") {
        return <></>
      }
      return (<div key={idx} className="headerItem">{field.name}</div>)
    })
  }

  const mapContent = () => {
    const result = content.map((row) => {
      return (
        <div key={row.index} id={"row" + row.index} className="contentRow">
          <div key={row.index + 100} className="contentItem">
            {row.name}
          </div>
          <div key={row.index + 200} className="contentItem">
            {row.title}
          </div>
          <div key={row.index + 300} className="contentItem">
            {row.company}
          </div>
          <div key={row.index + 400} className="contentItem">
            {row.outbound_date}
          </div>
          <div key={row.index + 500} className="contentItem">
            {row.interest}
          </div>
         </div>)
    })
    return result;
  }

  return (
    <StyledDashboard >
      <div className="headerContainer">
        {mapHeaders()}
      </div>
      {mapContent()}
    </StyledDashboard>
  )
}

export default Dashboard
