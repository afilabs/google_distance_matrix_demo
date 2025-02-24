import { memo, useEffect, useRef } from 'react'
import TaxiListItem from './TaxiListItem'
import './TaxiList.scss'

const TaxiList = ({ taxis = [], activeTaxi, onMarkerClick }) => {
   const itemRefs = useRef({})

   useEffect(() => {
      if (activeTaxi && itemRefs.current[activeTaxi]) {
         itemRefs.current[activeTaxi].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
         })
      }
   }, [activeTaxi])

   return (
      <div className="TaxiList">
         {taxis.map((taxi, index) => (
            <TaxiListItem
               key={index}
               ref={(el) => (itemRefs.current[index] = el)}
               {...taxi}
               active={activeTaxi === index}
               onClick={() => onMarkerClick(index)}
            />
         ))}
      </div>
   )
}

export default memo(TaxiList)
