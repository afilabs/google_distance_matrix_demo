import { useCallback, useEffect, useState } from 'react'

// Components
import GoogleMap from '~/components/GoogleMap'
import PlaceSearch from '~/components/PlaceSearch'
import TaxiList from '~/components/TaxiList'

// Dependencies
import '~/App.scss'
import { getTaxis } from '~/utils'
import request from '~/utils/request'

const App = () => {
   const [taxis, setTaxis] = useState(getTaxis())
   const [myLocation, setMyLocation] = useState(null)
   const [polyline, setPolyline] = useState(null)
   const [activeTaxi, setActiveTaxi] = useState(null)

   const resetData = () => {
      setTaxis(getTaxis())
      setPolyline(null)
      setActiveTaxi(null)
   }

   const onMarkerClick = useCallback(
      (index) => {
         fetchRoute(taxis[index], index)
      },
      [activeTaxi],
   )

   const computeRouteMatrix = async () => {
      const requestBody = {
         origins: taxis.map((taxi) => ({
            waypoint: {
               sideOfRoad: true,
               location: {
                  latLng: {
                     latitude: taxi.lat,
                     longitude: taxi.lng,
                  },
               },
            },
         })),
         destinations: [
            {
               waypoint: {
                  sideOfRoad: true,
                  placeId: myLocation.placeId,
               },
            },
         ],

         travelMode: 'DRIVE',
      }

      try {
         const { response } = await request(
            'https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix',
            {
               headers: {
                  'X-Goog-FieldMask': 'originIndex,distanceMeters,duration',
               },
               method: 'POST',
               data: requestBody,
            },
         )

         if (response) {
            const newList = taxis
               .map((taxi, index) => {
                  const route = response.find((r) => r.originIndex === index)
                  return {
                     ...taxi,
                     duration: route.duration,
                     distance: route ? route.distanceMeters : undefined,
                  }
               })
               .sort((x, y) => x.distance - y.distance)

            setTaxis(newList)
            fetchRoute(newList[0], 0)
         }
      } catch (error) {
         console.error(error)
      }
   }

   const fetchRoute = async (taxi, index) => {
      const requestBody = {
         origin: {
            sideOfRoad: true,
            location: {
               latLng: {
                  latitude: taxi.lat,
                  longitude: taxi.lng,
               },
            },
         },
         destination: {
            sideOfRoad: true,
            placeId: myLocation.placeId,
         },
         travelMode: 'DRIVE',
      }

      try {
         const { response } = await request(
            'https://routes.googleapis.com/directions/v2:computeRoutes',
            {
               headers: {
                  'X-Goog-FieldMask': 'routes.polyline.encodedPolyline',
               },
               method: 'POST',
               data: requestBody,
            },
         )

         if (response) {
            const route = response.routes[0].polyline.encodedPolyline
            setActiveTaxi(index)
            setPolyline({
               color: taxi.color,
               encodedPath: route,
            })
         }
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      if (!myLocation) return
      resetData()
      computeRouteMatrix()
   }, [myLocation])

   return (
      <div className="App">
         <div className="control-panel">
            <label>Your Location</label>
            <PlaceSearch onSelectPlace={setMyLocation} />

            {taxis.length > 0 && (
               <>
                  <h2 className="title">Nearby Taxis</h2>
                  <TaxiList taxis={taxis} activeTaxi={activeTaxi} onMarkerClick={onMarkerClick} />
               </>
            )}
         </div>
         <GoogleMap
            myLocation={myLocation}
            polyline={polyline}
            taxis={taxis}
            activeTaxi={activeTaxi}
            onMarkerClick={onMarkerClick}
         />
      </div>
   )
}

export default App
