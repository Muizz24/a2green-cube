import styled from 'styled-components'

const StyledSummaryTable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .fieldsContainer, .bodyContainer, .headerSummary {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .fieldItem, .bodyItem, .headerSummary {
    width: 100%;
    height: auto;
    padding: 20px 20px;
    align-items: center;
    justify-content: center;
    color: white;
    border: 1px solid white;
    text-align: center;
    background-color: #404040;
  }

  .bodyItem {
    background-color: #222222;
  }


`

export default StyledSummaryTable
