import React, { useState, useEffect, useRef } from "react";
import { TextField, Button } from "@material-ui/core";
import InfoBox from './components/InfoBox'
import LineGraph from './components/LineGraph'
import Table from './components/Table'
import Map from './components/Map'
import {sortData} from './components/util'
import {Card,CardContent} from '@material-ui/core'
import live from './live.png'
import ring from './ring.gif'
import "leaflet/dist/leaflet.css";
import 'react-circular-progressbar/dist/styles.css';
import "./App.css";

const casesTypeColor = {
  cases:"#CC1034",
  recovered:"#7dd71d",
  deaths:"#fb4443",
}

export default function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [countryCode,setCountryCode] = useState('worldwide')
  const [suggestTable,setSuggestTable] = useState([])
  const [mapCenter,setMapCenter] = useState({lat:16,lng:-24})
  const [zoomCenter,setZoomCenter] = useState(3)
  const [casesType,setCasesType] = useState('cases')
  const [noAutoCountry,setNoAutoCountry] = useState('worldwide')
  const [isLoading,setIsLoading] = useState(false)
  const toggle = useRef()

  useEffect(() => {
    setTimeout(() => setIsLoading(false),500)
    return () => 
      setIsLoading(true)
  },[noAutoCountry])
  useEffect(() => {
    const getGlobalData = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    }
    getGlobalData();
  },[])
  useEffect(() => {
    setIsLoading(true)
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          setCountries(data);
        });
    };
    
    getCountriesData();
  }, []);
  
  const handleClick = async (e) => {
    const value = e.currentTarget.innerText;
    const countryCode = e.currentTarget.value;
    const url = countryCode === 'worldwide' ? 
    'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if(countryCode === 'worldwide') {setCountry(''); setMapCenter([16,-24]); setZoomCenter(3);setSuggestTable([])}
        else {setCountry(value); setMapCenter([data.countryInfo.lat,data.countryInfo.long]);setZoomCenter(5)}
        setSuggestions([]);
        setNoAutoCountry(value);
        setCountryInfo(data);
        setCountryCode(countryCode);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regEx = new RegExp(`^${value}`, "i");
      suggestions = countries.filter((country) => regEx.test(country.country));
    }
    setSuggestions(suggestions);
    setSuggestTable(suggestions);
    setCountry(value);
  };

  const onDisplay = () => {
    toggle.current.classList.toggle('visible')
  };
  return (
    <div>
      {isLoading? <img className='positioned' src={ring} alt='ring'/>:
      <div className='app'>
        <div className='app__left'>
            <div className='app__header'>
              <h1>Covid 19 Tracker</h1>
              <form>
                <TextField
                  id="outlined-search"
                  label="Search country"
                  type="search"
                  variant="outlined"
                  value={country}
                  onChange={handleChange}
                />
                <div className="centered">
                  <ul>
                    {suggestions?.length > 0 &&
                      suggestions.map((country) => (
                        <li key={country.countryInfo.iso2}>
                          <Button
                            style={{textTransform:'capitalize'}}
                            variant="contained"
                            value={country.countryInfo.iso2}
                            onClick={handleClick}
                          >
                            {country.country}
                          </Button>
                        </li>
                      ))}
                  </ul>
                </div>
              </form>
            </div>   
            <div className='app__global'>
              <img width='60' src={live} alt='live'/>
              <Button
                variant="contained"
                value="worldwide"
                style={{color:'white',backgroundColor:casesTypeColor[casesType],textTransform:'capitalize'}}
                onClick={handleClick}
              >
                  worldwide
              </Button>
            </div>  
            <div className='app__stats'>
              <InfoBox 
                casesType={casesType} 
                active={casesType === 'cases'} 
                onClick={(e) => setCasesType('cases')}  
                name='todayCases' 
                title="Cases" 
                cases={countryInfo.todayCases} 
                total={countryInfo.cases}/>
              <InfoBox 
                casesType={casesType} 
                active={casesType === 'recovered'} 
                onClick={(e) => setCasesType('recovered')}  
                name='todayRecovered' 
                title="Recovered" 
                cases={countryInfo.todayRecovered} 
                total={countryInfo.recovered}/>
              <InfoBox 
                casesType={casesType} 
                active={casesType === 'deaths'} 
                onClick={(e) => setCasesType('deaths')}  
                name='todayDeaths' 
                title="Deaths" 
                cases={countryInfo.todayDeaths} 
                total={countryInfo.deaths}/>
            </div>
            <div className='app__graph'>
              <h2>{`${noAutoCountry} new ${casesType}`}</h2>
              <LineGraph casesType={casesType} countryCode={countryCode}/>
            </div>
            <div className='app__table'>
              <h2>More Information</h2>
              <Table casesType={casesType} suggestion={suggestTable} countries={sortData(countries)}/>
            </div>
        </div>
        <div className='app__right'>
          <Map casesType={casesType} countries={countries} center={mapCenter} zoom={zoomCenter}/>
          <div className='app__social'> 
            <Card ref={toggle} className='information'>
              <CardContent>
                <h3>Anouar El Maaroufi</h3>
                <p>anouar from morocco,20 years old, real beginner in web development,i hope you guys enjoy while navigate my app :)</p>
              </CardContent>
            </Card>
            <div className='righted'>
              <a href="https://www.facebook.com/anouar.elmaaroufi.96" rel="noopener"><i class="fab fa-facebook"></i></a>
              <a href="https://www.instagram.com/anouarelmaaroufi10/" rel="noopener"><i class="fab fa-instagram"></i></a>
              <Button onClick={onDisplay} variant='contained' color='primary'>about me</Button>
            </div>
        </div>
        </div>
      </div> 
      }
    </div>
  );
}