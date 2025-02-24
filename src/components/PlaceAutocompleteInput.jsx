import { useRef, useEffect, useState } from 'react'
import { useMapsLibrary } from '@vis.gl/react-google-maps'

const PlaceAutocompleteInput = ({ onPlaceSelect }) => {
   const [placeAutocomplete, setPlaceAutocomplete] = useState(null)
   const inputRef = useRef(null)
   const places = useMapsLibrary('places')

   useEffect(() => {
      if (!places || !inputRef.current) return

      const sw = new window.google.maps.LatLng(49.19883, -123.224621)
      const ne = new window.google.maps.LatLng(49.314075, -123.023068)
      const vancouverBounds = new window.google.maps.LatLngBounds(sw, ne)

      const options = {
         strictBounds: true,
         bounds: vancouverBounds,
         componentRestrictions: { country: 'ca' },
         fields: ['place_id', 'geometry', 'name', 'formatted_address'],
      }

      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options))
   }, [places])

   useEffect(() => {
      if (!placeAutocomplete) return

      placeAutocomplete.addListener('place_changed', () => {
         onPlaceSelect(placeAutocomplete.getPlace())
      })
   }, [onPlaceSelect, placeAutocomplete])

   return (
      <div className="autocomplete-container">
         <input ref={inputRef} />
      </div>
   )
}

export default PlaceAutocompleteInput
