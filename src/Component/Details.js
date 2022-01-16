import React from 'react';
import '../Style/Details.css';

function Details({totalCases}) {
    return (
        <div className='stastics'>
           <div class="box_wrapper">
                <div class="box">
                    <h2>Total Cases</h2>
                    <p id="total_cases">{totalCases.cases.total}</p>
                </div>
                <div class="box">
                    <h2>Total Death</h2>
                    <p id="total_death">{totalCases.deaths.total}</p>
                </div>

                <div class="box">
                    <h2>Total Recovery</h2>
                    <p id="total_recovered">{totalCases.cases.recovered}</p>
                </div>
           </div>   
        </div>
    )
}

export default Details;