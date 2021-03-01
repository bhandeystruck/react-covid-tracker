import React from 'react';
import './App.css';
import FormControl from '@material-ui/core/FormControl';
import { Card, CardContent, MenuItem, Select } from '@material-ui/core';
import {useState, useEffect} from 'react';
import InfoBox from "./InfoBox";
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat } from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {


  const [countries, setCountries] = useState([]);
  //setting up default country for select icon
  const [country, setCountry] = useState("worldwide");

  //country info state
  const [countryInfo, setCountryInfo] = useState({});

  //table data
  const [tableData, setTableData] = useState([]);

  const [mapCenter,setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });

  const [mapZoom, setMapZoom] = useState(3);

  const [mapCountries, setMapCountries] = useState([]);

  const [casesType, setCasesType] = useState("cases");


    useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/countries/all")
      .then(response=> response.json())
      .then(data=>{
        setCountryInfo(data);
      });
    }, [])


 
  //USE EFFECT = Runs code based on a given condition [] is the condition
  //[] is left blank it will only run once when the app loads
  //in our case we need the effect to run when the countries change
  useEffect(() => {
    //async -> send a request to the server, wait for it, do something with info
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      //take the response and get the json from the fetch response
      .then((response) => response.json())
      //then set the countries but need to restructure before storing
      .then((data) =>{
        //going through every country 
        //return a object with required
        //here country is the object looped in
        const countries = data.map((country) =>(
          {
            
            name: country.country,
            value: country.countryInfo.iso2,

          }
          
          ));
          //sorting the data here
          const sortedData = sortData(data);
          //put the countries we mapped through
          setCountries(countries);
          //getting the data for the table from this function
          setTableData(sortedData);
          setMapCountries(data);
      });

  

    };
    
    //handling async call here by calling function again
    getCountriesData();

  
  }, [countries]);



  //OnCountryChange Function 
  //takes in an event e
  const onCountryChange = async (e) =>{

      //this stores the country we select
      const countryCode = e.target.value;
      
      //Then we set the default value here for the select button
      setCountry(countryCode);

      //as here is where the country selection is handled
      //I need to implement the getting the data part here
      //https://disease.sh/v3/covid-19/all
      //https://disease.sh/v3/covid-19/countries/{COUNTRY_CODE}
      //need to implement : if country code is worldwide do that
      //otherwise do the country code

      //so if country code is worldwide we made this the url
      const url = countryCode ==='worldwide' ? 'https://disease.sh/v3/covid-19/all' :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      //go to the url
      await fetch(url)
        //once we  get the information 
        //turn it into json object
        .then(response => response.json())
        //then we do stuff with the data
        .then(data=> {
          //update the input 
          setCountry(countryCode);
          //store the response of the country info into a variable
          
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);

      });
      
  };





  return (
    <div className="app">

      {/* Application Left Side */}
      <div className="app__left">
          {/* Header */}

        {/* Title + Select input dropdown field */}

        <div className="app__header">
          <h1>Covid 19 Tracker</h1>

            <FormControl className="app_dropdown">
                  {/* Here value is set to worldwide as default to show in the select box */}
                <Select variant="outlined" value={country} onChange={onCountryChange}>
                  {/* DropDown menu from material UI */}
                  {/* Loop through all the countries and drop them down */}
                  {/* <MenuItem value="worldwide">worldwide</MenuItem> */}
                  {/* JSX */}
                  <MenuItem value="worldwide">Worldwide</MenuItem>
                  {
                    countries.map(country=>(

                      <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))
                  }
                </Select>
            </FormControl>
        </div>


          {/*  */}
        <div className="app__stats">
          {/* InfoBox  title = CoronaVirus cases*/}
            <InfoBox isRedactive={casesType ==="cases"} onClick={e=> setCasesType("cases")}   title="Coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>
          {/* InfoBox title = Coronavirus recoveries */}
            <InfoBox active={casesType ==="recovered"} onClick={e=> setCasesType("recovered")}   title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>
          {/* InfoBox title= corona deaths*/}
            <InfoBox active={casesType ==="deaths"} onClick={e=> setCasesType("deaths")}   title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
        </div>


        {/* Map */}
        <Map
        casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}

        />
      </div>

      {/* Application Left Side */}
      <Card className="app__right">
        <CardContent>
          {/* Table */}
          <h1>Live Cases By Country</h1>
          <Table countries={tableData}/>
          {/* Graph */} 
          <h3>Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType}/>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
