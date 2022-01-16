import logo from './logo.svg';
import './App.css';
import Details from './Component/Details';
import { useState } from 'react/cjs/react.development';
import { useEffect } from 'react';
import TableSec from './Component/TableSec';

function App() {
  const[totalCases,setTotalCases] = useState({});
  const[countryData,setCountryData] = useState([]);
  const[loading,setLoading] = useState(true);
  const[loadingCountry,setLoadingCountry] = useState(true);
  const[search, setSearch] = useState("");

  const getCovidData = async ()=>{
    setLoading(true);
    const res = await fetch("https://covid-193.p.rapidapi.com/statistics?country=all", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "89755a9da6msh79906a63137d354p1ceb21jsn71d9fd3b3bb6"
    }
    });
    const data = await res.json();
    const actualData = data.response[0];
    setTotalCases(actualData);
    setLoading(false);
    // console.log(actualData);
  };

  const getCountriesData = async ()=>{
    setLoadingCountry(true);
    const res = await fetch("https://covid-193.p.rapidapi.com/statistics", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "89755a9da6msh79906a63137d354p1ceb21jsn71d9fd3b3bb6"
      }
    });
    const data = await res.json();
    // console.log(data.response);
    let requiredData = data.response.map((d)=>{
      return {
        continent : d.continent,
        country : d.country,
        totalcases : d.cases.total,
        criticalcases : d.cases.critical,
        activecases : d.cases.active,
        deaths : d.deaths.total,
        recovery : d.cases.recovered,
        newcases : d.cases.new,
        death1mpop : d.deaths['1M_pop'],
        cases1mpop : d.cases['1M_pop'],
      }
    })
    // console.log(Array.isArray(requiredData));
    // console.log(requiredData);
    setCountryData(requiredData);
    // setCountryData(data.response);
    setLoadingCountry(false);
    // console.log(Array.isArray(countryData)) 
    // console.log(countryData.length);
  };

  const filterData = countryData.filter((val)=>{
    if(search === "") {
      return val;
    }
    else if((val.country === {search}) || 
          (val.continent === {search})){
              return val;
    }
  })

  useEffect(()=>{
    getCovidData();
    getCountriesData();
  },[]);

  return (
    <div className="App">
      <h1>Covid Tracker....</h1>
      {loading ? <h1>Loading data</h1> 
        : 
          <Details totalCases={totalCases}/>
      }
      <div className='filter'>
            <input value={search || ''} onChange={(e)=>{
                setSearch(e.target.value)}} placeholder='Enter Country or Continent'/>
      </div>
      {loadingCountry ? <h1>Loading list</h1>
        :
          //<Table countryData={countryData}/>
          <TableSec countryData={filterData}/>
      }
      {/* {countryData !== undefined && <Table countryData={countryData}/>} */}
    </div>
  );
}
export default App;
