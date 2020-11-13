import React,{useState,useEffect} from 'react'
import {Line} from 'react-chartjs-2'
import numeral from 'numeral'
import notfound from '.././notfound.png'
import {printChartDataCountries,printChartDataGlobal} from './util'

const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

const casesTypeColor = {
  cases:"#CC1034",
  recovered:"#7dd71d",
  deaths:"#fb4443",
}

function LineGraph({countryCode,casesType}) {
    const [data,setData] = useState([])
    const [error,setError] = useState('')

    useEffect(() => {
        const url = countryCode === 'worldwide' ? 
        'https://disease.sh/v3/covid-19/historical/all?lastdays=120':
        `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=120`
        const getData = async () => {
            await fetch(url)
            .then(response => response.json())
            .then(data => {
                const dataChart = countryCode !== 'worldwide'? printChartDataCountries(data,casesType):printChartDataGlobal(data,casesType)
                setData(dataChart);
                setError('')
            })
            .catch(error => setError('country doesnt have any historical data'))
        }
        getData();
    })
    
    return (
        <div>
            {!error ? 
                <Line 
                    data={{
                        datasets:[{
                            data:data,
                            backgroundColor:casesTypeColor[casesType]
                        }]
                    }}
                    options={options}
                />
              :
              <div className='error'>
              <img width='150' src={notfound} alt='not found'/>
              <h4 style={{display:'inline-block',color:'rgba(0,0,0,.6)',textTransform:'capitalize'}}>country doesnt have any historical data</h4>
              </div>
            }
            
        </div>
    )
}

export default LineGraph