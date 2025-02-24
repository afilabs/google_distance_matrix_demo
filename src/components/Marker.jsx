import { AdvancedMarker } from '@vis.gl/react-google-maps'

const Marker = ({ id, color, position, active, onToggle, icon }) => {
   const Icon = icon
   return (
      <AdvancedMarker
         key={id}
         position={position}
         className={`Marker ${active ? 'active' : ''}`}
         zIndex={active ? 2 : 1}
         onClick={onToggle}
      >
         <Icon style={{ color }} />
      </AdvancedMarker>
   )
}

export default Marker
