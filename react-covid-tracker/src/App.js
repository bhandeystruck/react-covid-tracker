import React from 'react';
import './App.css';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem, Select } from '@material-ui/core';
import {useState, useEffect} from 'react';
import InfoBox from "./InfoBox";

function App() {


  const [countries, setCountries] = useState([]);
  //setting up default country for select icon
  const [country, setCountry] = useState('worldwide');



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
          //put the countries we mapped through
          setCountries(countries);

      });

  

    };
    
    //handling async call here by calling function again
    getCountriesData();

  
  }, [countries]);



  //OnCountryChange Function 
  //takes in an event e
  const onCountryChange = (e) =>{

      //this stores the country we select
      const countryCode = e.target.value;
      
      //Then we set the default value here for the select button
      setCountry(countryCode);
      
  };





  return (
    <div className="app">

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


      <div className="app__stats">
        {/* InfoBox  title = CoronaVirus cases*/}
          <InfoBox title="Coronavirus cases" cases={1236} total={2000}/>
        {/* InfoBox title = Coronavirus recoveries */}
          <InfoBox title="Recovered" cases={1234} total={4000}/>
        {/* InfoBox title= coroa deaths*/}
          <InfoBox title="Deaths" cases={123} total={5000}/>
      </div>


      {/* Table */}
      {/* Graph */}
      {/* Map */}












    </div>
  );
}

export default App;
