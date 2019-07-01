import React from 'react'
import DeckGL from '@deck.gl/react'
import {LineLayer} from '@deck.gl/layers'
import {StaticMap} from 'react-map-gl'
//var vari = require('../expressServer/keysconfig');
//console.log(process.env.NODE_ENV)
//console.log("MAPBOX : "+process.env.MAPBOX_ACCESS_TOKEN)
//const MAPBOX_ACCESS_TOKEN = vari.MAPBOX_ACCESS_TOKEN
//const MAPBOX_ACCESS_TOKEN='pk.eyJ1IjoiYmdhbXV0IiwiYSI6ImNqd2hnMjAzdDFranI0M25wNnA1ZHEwanIifQ.cKnGSJ4UAFehcj43UU_lRA'
//const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN
const initialViewState={
    longitude: -122.41669,
    latitude:37.7853,
    zoom:13,
    pitch:0,
    bearing:0
}
const data = [{sourcePosition:[-122.41669,37.7853],targetPosition:[-122.41669,37.781]}]
export default function Map (props){
    const layers=[
        new LineLayer({id:'line-layer',data})
    ]

    return(
        <DeckGL 
            viewState={initialViewState} 
            controller={true}
            layers={layers} >
        <StaticMap mapboxApiAccessToken={props.mapbox_access_token}/>
        </DeckGL>
    )
    
}