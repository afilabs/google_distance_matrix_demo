import { DATA, COLORS } from '~/constant'

export const getTaxis = () =>
   DATA.map((taxi, index) => ({ ...taxi, color: COLORS[index % (COLORS.length - 1)] }))

export const convertMetersToKilometers = (meters) => (meters / 1000).toFixed(2)

export const formatSeconds = (input) => {
   // Extract the number of seconds from the input string by removing the trailing 's'
   const totalSeconds = parseInt(input.slice(0, -1))

   // Calculate the number of minutes and the remainder seconds
   const minutes = Math.floor(totalSeconds / 60)
   const seconds = totalSeconds % 60

   // Construct the output string
   let result = ''
   if (minutes > 0) {
      result += minutes + 'm'
   }
   if (seconds > 0) {
      result += ' ' + seconds + 's'
   }

   return result
}
