import { StyledSummaryTable } from '.'

const SummaryTable = ({ content, days }) => {
  const contentKeys = Object.keys(content)

  const mapSummary = () => {
    return contentKeys.map((value, idx) => {
      return (<div key={idx} className="bodyItem">{content[value]}</div>)
    })
  }

  const mapFields = () => {
    return contentKeys.map((value, idx) => {
      return (<div key={idx} className="fieldItem">{value}</div>)
    })
  }


  return (
    <StyledSummaryTable>
      <div className="headerSummary">
        <span className="headerSummaryText">Number of Leads for Interest Levels in the Past {days} Day{days > 1 ? "s" : ""}</span>
      </div>
      <div className="fieldsContainer">
        {mapFields()}
      </div>
      <div className="bodyContainer">
        {mapSummary()}
      </div>
    </StyledSummaryTable>
  )
}

export default SummaryTable
