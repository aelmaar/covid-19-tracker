import React, { useState, useEffect, useRef, useReducer } from "react";
import { TextField, Button } from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import LineGraph from "./components/LineGraph";
import Table from "./components/Table";
import Map from "./components/Map";
import { sortData } from "./components/util";
import { Card, CardContent } from "@material-ui/core";
import live from "./live.png";
import ring from "./ring.gif";
import {reducer} from './components/reducer'
import "leaflet/dist/leaflet.css";
import "react-circular-progressbar/dist/styles.css";
import "./App.css";

const casesTypeColor = {
  cases: "#CC1034",
  recovered: "#7dd71d",
  deaths: "#fb4443",
};

const defaultValue = {
  mapCenter:{lat: 16, lng: -24},
  zoomCenter:3,
  casesType:'cases',
  isLoading:true,
  countryInfo:{},
  countryCode:'worldwide',
  suggestions:[],
  suggestTable:[],
  noAutoCountry:"worldwide",
  countries:[]
}

export default function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [state,dispatch] = useReducer(reducer,defaultValue);
  const toggle = useRef();

  useEffect(() => {
    const getGlobalData = async () => {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          dispatch({type:"data_global",payload:data})
        });
    };
    getGlobalData();
  }, []);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          setCountries(data);
          dispatch({type:"LOAD"})
        });
    };

    getCountriesData();
  }, []);

  const handleClick = async (e) => {
      const value = e.currentTarget.innerText;
      const countryCode = e.currentTarget.value;
      const url =
        countryCode === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;
  
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (countryCode === "worldwide") {
            setCountry("");
            dispatch({type:"WORLD_CENTER"})
          } else {
            setCountry(value);
            dispatch({type:"COUNTRY_CENTER",payload:[data.countryInfo.lat, data.countryInfo.long]})
          }
          dispatch({type:"DATA_COUNTRY",payload:{data,countryCode,value}})
        });
    };

  const handleChange = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regEx = new RegExp(`^${value}`, "i");
      suggestions = countries.filter((country) => regEx.test(country.country));
    }
    dispatch({type:"SUGGESTIONS",payload:suggestions})
    setCountry(value);
  };

  const onDisplay = () => {
    toggle.current.classList.toggle("visible");
  };

  return (
    <div>
      {state.isLoading ? (
        <img className="positioned" src={ring} alt="ring" />
      ) : (
        <div className="app">
          <div className="app__left">
            <div className="app__header">
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
                    {state.suggestions?.length > 0 &&
                      state.suggestions.map((country) => (
                        <li key={country.countryInfo.iso2}>
                          <Button
                            style={{ textTransform: "capitalize" }}
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
            <div className="app__global">
              <img width="60" src={live} alt="live" />
              <Button
                variant="contained"
                value="worldwide"
                style={{
                  color: "white",
                  backgroundColor: casesTypeColor[state.casesType],
                  textTransform: "capitalize",
                }}
                onClick={handleClick}
              >
                worldwide
              </Button>
            </div>
            <div className="app__stats">
              <InfoBox
                casesType={state.casesType}
                active={state.casesType === "cases"}
                onClick={() => dispatch({type:"CASES",payload:"cases"})}
                name="todayCases"
                title="Cases"
                cases={state.countryInfo.todayCases}
                total={state.countryInfo.cases}
              />
              <InfoBox
                casesType={state.casesType}
                active={state.casesType === "recovered"}
                onClick={() => dispatch({type:"RECOVERED",payload:"recovered"})}
                name="todayRecovered"
                title="Recovered"
                cases={state.countryInfo.todayRecovered}
                total={state.countryInfo.recovered}
              />
              <InfoBox
                casesType={state.casesType}
                active={state.casesType === "deaths"}
                onClick={() => dispatch({type:"DEATHS",payload:"deaths"})}
                name="todayDeaths"
                title="Deaths"
                cases={state.countryInfo.todayDeaths}
                total={state.countryInfo.deaths}
              />
            </div>
            <div className="app__graph">
              <h2>{`${state.noAutoCountry} new ${state.casesType}`}</h2>
              <LineGraph casesType={state.casesType} countryCode={state.countryCode} />
            </div>
            <div className="app__table">
              <h2>More Information</h2>
              <Table
                casesType={state.casesType}
                suggestion={state.suggestTable}
                countries={sortData(countries)}
              />
            </div>
          </div>
          <div className="app__right">
            <Map
              casesType={state.casesType}
              countries={countries}
              center={state.mapCenter}
              zoom={state.zoomCenter}
            />
            <div className="app__social">
              <Card ref={toggle} className="information">
                <CardContent>
                  <h3>Anouar El Maaroufi</h3>
                  <p>
                    anouar from morocco,20 years old, front end developer,i hope you guys enjoy my app :)
                  </p>
                </CardContent>
              </Card>
              <div className="righted">
                <a
                  href="https://www.facebook.com/anouar.elmaaroufi.96"
                  rel="noopener"
                >
                  <i class="fab fa-facebook"></i>
                </a>
                <a
                  href="https://www.instagram.com/anouarelmaaroufi10/"
                  rel="noopener"
                >
                  <i class="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/anouar-el-maaroufi-abba321b9/"
                  rel="noopener"
                >
                  <i class="fab fa-linkedin"></i>
                </a>
                <Button onClick={onDisplay} variant="contained" color="primary">
                  about me
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
