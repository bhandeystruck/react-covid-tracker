import React from 'react'
import './Table.css';
import numeral from "numeral";

function Table({countries}) {
    return (
        <div className="table">
        {/* Go through all of the countries and map them */}
        {/* Destructuring the code so cases and country are separately stored */}
        {countries.map(({country, cases}) => (
            <tr>
                <td>{country}</td>
                <td><strong>{numeral(country.cases).format("0,0")}</strong></td>
            </tr>
        ))}
            
        </div>
    )
}

export default Table
