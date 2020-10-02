import React from 'react'
import {Circle,Popup} from 'react-leaflet'
import numeral from 'numeral'

export const printChartDataCountries = (data,casesType='cases') => {
    let chartData = [];
    let lastDataPoint;
    
    for(let date in data.timeline.cases) {
        if(lastDataPoint) {
            const newDataPoint = {
                x:date,
                y:data.timeline[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data.timeline[casesType][date]
    }
    return chartData
}

export const printChartDataGlobal = (data,casesType='cases') => {
    let chartData = [];
    let lastDataPoint;

    for(let date in data.cases) {
        if(lastDataPoint) {
            const newDataPoint = {
                x:date,
                y:data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[casesType][date]
    }
    return chartData
}
export const sortData = (data) => {
    const sortData = [...data]
    return sortData.sort((a,b)=> {
        return a.cases > b.cases ? -1:1
    })
    
}

const casesTypeColor = {
    cases:{
        hex:"#CC1034",
        multiplier: 250000,
    },
    recovered:{
        hex: "#7dd71d",
        multiplier: 200000,
    },
    deaths:{
        hex: "#fb4443",
        multiplier: 150000,
    }
}

export const showMapData = (data,casesType='cases') => 
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat,country.countryInfo.long]}
            color={casesTypeColor[casesType].hex}
            fillColor={casesTypeColor[casesType].hex}
            fillOpacity={0.4}
            radius={
                Math.sqrt(country[casesType] * casesTypeColor[casesType].multiplier)
            }
        >
            <Popup>
                <div style={{textAlign:'center'}}>
                    <img width='150' src={country.countryInfo.flag} alt={country.country}/>
                    <h1>{country.country}</h1>
                    <h2 style={{textAlign:'justify'}}>Cases:{numeral(country.cases).format('0,0')}</h2>
                    <h2 style={{textAlign:'justify'}}>Recovered:{numeral(country.recovered).format('0,0')}</h2>
                    <h2 style={{textAlign:'justify'}}>Deaths:{numeral(country.deaths).format('0,0')}</h2>
                </div>
            </Popup>
        </Circle>
    ))

export const printPrettyNumberFormat = (number) => 
    number > 0 ? numeral(number).format('+0,0a'):number