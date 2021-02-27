import React from 'react'
import './Table.css';

function Table({countries}) {
    return (
        <div className="table">
        {/* Go through all of the countries and map them */}
        {/* Destructuring the code so cases and country are separately stored */}
        {countries.map(({country, cases}) => (
            <tr>
                <td>{country}</td>
                <td><strong>{cases}</strong></td>
            </tr>
        ))}
            
        </div>
    )
}

export default Table
