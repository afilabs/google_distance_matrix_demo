import { forwardRef, memo } from 'react'

// Dependencies
import Icon from '~/assets/stop.svg?react'
import './TaxiListItem.scss'
import { convertMetersToKilometers, formatSeconds } from '~/utils'

const TaxiListItem = forwardRef(
   ({ active, address, color, distance = 0, duration = 0, onClick }, ref) => {
      return (
         <div
            ref={ref}
            style={{ borderColor: active ? `#${color}` : undefined }}
            className={`TaxiListItem ${active ? 'active' : ''}`}
            onClick={onClick}
         >
            <Icon style={{ color }} />

            <div className="details">
               <p>{address}</p>
               {!!distance && (
                  <>
                     Distance: <b>{convertMetersToKilometers(distance)} km</b> | Time:{' '}
                     <b>{formatSeconds(duration)}</b>
                  </>
               )}
            </div>
         </div>
      )
   },
)

TaxiListItem.displayName = 'TaxiListItem'

export default memo(TaxiListItem)
