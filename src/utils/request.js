import axios from 'axios'

const request = async (url, options) => {
   const { headers, ...opts } = options

   const defaultHeaders = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY,
   }

   const config = Object.assign(
      {
         url,
         headers: Object.assign(defaultHeaders, headers),
      },
      opts,
   )

   try {
      const res = await axios.request(config)

      return { response: res.data || {} }
   } catch (error) {
      console.error(error)
      return null
   }
}

export default request
