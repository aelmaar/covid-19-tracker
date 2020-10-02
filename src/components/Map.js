import React from 'react'
import {Map as LeafletMap,TileLayer} from 'react-leaflet'
import {showMapData} from './util'

function Map({casesType,countries,center,zoom}) {
    return (
        <div className='map'>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {showMapData(countries,casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
