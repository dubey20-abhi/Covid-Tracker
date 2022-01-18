
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
  const[searchText, setSearchText] = useState("");
  let [filteredData] = useState();
  const[filterData, setFilterData] = useState([]);

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
    const dataR = requiredData.filter((val)=>{
      return (val.continent != null)
    })
    setCountryData(dataR);
    setLoadingCountry(false);
  };

  const searchTextHandler = (e)=>{
    setSearchText(e.target.value);
  };

  const searchHandler = (searchText)=>{
    filteredData = countryData.filter((val)=>{
      return (val.continent.toLowerCase().includes(searchText.toLowerCase()) || val.country.toLowerCase().includes(searchText.toLowerCase()));
    });
    setFilterData(filteredData);
  }

  const clearAll = ()=>{
    setSearchText("");
    setFilterData([]);
    getCountriesData();
  };

  const refresh = ()=>{
    window.location.reload();
  }
  

  useEffect(()=>{
    getCovidData();
    getCountriesData();
    
  },[filterData]);

  return (
    <div className="App">
      <div className='upper'>
        <h1>Live Covid Tracker</h1>
        {loading ? <h1>Loading data</h1> 
          : 
            <Details totalCases={totalCases}/>
        }
        <div className='filter'>
              <input value={searchText || ''} onChange={(e)=>{
                  searchTextHandler(e)}} placeholder='Enter Country or Continent'/>
              <button className='search' onClick={()=>{searchHandler(searchText)}}>Search</button>
              <button className='clear' onClick={()=>{clearAll()}}>Clear</button>
              <button className='refresh' onClick={()=>{refresh()}}>Refresh</button>
        </div>
      </div>
      {loadingCountry ? <h1>Loading list</h1>
        : filterData && filterData.length ?
            <TableSec countryData={filterData}/> :
              <TableSec countryData={countryData}/>
      }
    </div>
  );
}
export default App;
