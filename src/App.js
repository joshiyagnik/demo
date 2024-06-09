import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';

function App() {
  return (
    <div className="App">
      <h1>Covid Data</h1>
      <Covid />
    </div>
  );
}

export default App;

function Covid(){
const [data,setData] = useState([]);

const apiGet = () => {
  fetch("https://data.covid19india.org/data.json")
  .then((response) => response.json())
  .then((json) => {
    setData(json.statewise)
  });

}

useEffect(
  () => {
    apiGet();
    const interval = setInterval(
      () => {
        apiGet();
      },10000
    );
    return () => clearInterval(interval);
  },[]
);

return(
  <>
    <Table striped bordered hover>
      <thead>
        <th>SR NO</th>
        <th>STATE NAME</th>
        <th>CONFIRMED CASES</th>
        <th>DEATH CASES</th>
        <th>RECOVERED CASES</th>
      </thead>
      <tbody>
        {
          data.filter(a => a.state !=='State Unassigned' && a.state !== 'Total' ).map(
            (a,i) => {
              return(
                <Covidcontent sr={i+1} state={a.state} confirmed={a.confirmed} deaths={a.deaths} recovered={a.recovered} />
              );
            }
          )
        }
      </tbody>
    </Table>
  </>
);

}

function Covidcontent(props){
  return(
    <>
    <tr>
           <td>{props.sr}</td>
                  <td>{props.state}</td>
                  <td>{props.confirmed}</td>
                  <td>{props.deaths}</td>
                  <td>{props.recovered}</td>
                </tr>
    </>
  );
}
