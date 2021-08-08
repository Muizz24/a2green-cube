import styled from 'styled-components'

const StyledDashboard = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;


  .headerContainer, .contentItem, .contentRow {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
    align-items: center;
    font-weight: bold;
    padding: 5px;
  }

  .headerItem {
    width: 100%;
    height: 100%;
    border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    font-size: 16px;
    background-color: #404040;
    
  }

  .contentItem {
    font-weight: normal;
    border: 1px solid white;
    overflow: auto;
    margin: 0;
    background-color: #222222;
  }
`

export default StyledDashboard
