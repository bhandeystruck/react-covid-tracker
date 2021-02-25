import React from 'react';
import './App.css';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem, Select } from '@material-ui/core';
import {useState, useEffect} from 'react';

function App() {


  const [countries, setCountries] = useState([

    



  ]);



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
              
      }));
          //put the countries we mapped through
          setCountries(countries);

      });

  

    };
    getCountriesData();

  
  }, [countries]);





  return (
    <div className="app">

      <div className="app__header">
        <h1>Covid 19 Tracker</h1>

          <FormControl className="app_dropdown">
              <Select variant="outlined" value="abc">
                {/* DropDown menu from material UI */}
                {/* Loop through all the countries and drop them down */}
                {/* <MenuItem value="worldwide">worldwide</MenuItem> */}
                {/* JSX */}
                {
                  countries.map(country=>(
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))
                }
              </Select>
          </FormControl>


      </div>


      



      {/* Header */}

      {/* Title + Select input dropdown field */}

      {/* InfoBox */}
      {/* InfoBox */}
      {/* InfoBox */}


      {/* Table */}
      {/* Graph */}
      {/* Map */}












    </div>
  );
}

export default App;
