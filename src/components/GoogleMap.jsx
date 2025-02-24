import { useEffect } from 'react'
import { Map, useMap } from '@vis.gl/react-google-maps'

// Components
import Marker from './Marker'
import { Polyline } from './External/Polyline'

// Dependencies
import MyLocationMarker from '~/assets/markers/my-location.svg?react'
import TaxiMarker from '~/assets/markers/taxi.svg?react'

import './GoogleMap.scss'
const DEFAULT_CENTER = { lat: 49.25307278849622, lng: -123.12095840000302 }

const MapHandler = ({ myLocation, activePlace }) => {
   const map = useMap()

   const moveTo = (location) => {
      if (!location) {
         return
      }
      map.setCenter({
         lat: location.lat,
         lng: location.lng,
      })
   }

   useEffect(() => {
      moveTo(myLocation)
   }, [myLocation])

   useEffect(() => {
      moveTo(activePlace)
   }, [activePlace])
}

const GoogleMap = ({ myLocation, taxis, activePlace, onMarkerClick, polyline }) => {
   return (
      <div className="GoogleMap">
         <Map
            mapId={import.meta.env.VITE_APP_GOOGLE_MAP_ID}
            defaultZoom={12}
            defaultCenter={DEFAULT_CENTER}
            gestureHandling="greedy"
            disableDefaultUI
         >
            {polyline && (
               <Polyline
                  strokeWeight={4}
                  strokeColor={`#${polyline.color}`}
                  encodedPath={polyline.encodedPath}
               />
            )}

            {myLocation && (
               <Marker position={myLocation} color={polyline?.color} icon={MyLocationMarker} />
            )}
            {taxis.map((taxi, index) => (
               <Marker
                  key={index}
                  id={index}
                  position={{ lat: taxi.lat, lng: taxi.lng }}
                  color={taxi.color}
                  active={activePlace === index}
                  onToggle={() => onMarkerClick(index)}
                  icon={TaxiMarker}
               />
            ))}
            <MapHandler myLocation={myLocation} activePlace={taxis[activePlace]} />
         </Map>
      </div>
   )
}

export default GoogleMap
