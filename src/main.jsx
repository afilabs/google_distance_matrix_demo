import { createRoot } from 'react-dom/client'
import { APIProvider } from '@vis.gl/react-google-maps'

// Dependencies
import './main.scss'
import App from '~/App.jsx'

createRoot(document.getElementById('root')).render(
   <APIProvider apiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
      <App />
   </APIProvider>,
)
