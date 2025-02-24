import { useEffect, useState, useCallback, memo } from 'react'

// Dependencies
import './PlaceSearch.scss'
import PlaceAutocompleteInput from './PlaceAutocompleteInput'

const PlaceSearch = ({ onSelectPlace }) => {

   const handlePlaceSelect = (place) => {
      if (!place) return;
    
      console.log(place);
    
      onSelectPlace({
        placeId: place.place_id,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    };
    
   return (
      <div className="PlaceSearch">
         <PlaceAutocompleteInput onPlaceSelect={handlePlaceSelect} />
      </div>
   )
}

export default memo(PlaceSearch)
