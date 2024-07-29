import { defineEventHandler } from 'h3'
import fetch from 'node-fetch'

const hapiFhirUrl = "https://poc-fhirserver.siweiyang.com/fhir"

export default defineEventHandler(async (event) => {
  console.log("Received request for MedicationRequest list")

  try {
    const url = `${hapiFhirUrl}/MedicationRequest`
    console.log("Fetching from URL:", url)

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log("Received data:", data)

    const entries = data.entry || []
    const ids = entries.map(entry => entry.resource.id)

    console.log("Returning IDs:", ids)
    return ids
  } catch (error) {
    console.error('Error fetching MedicationRequest list:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})

// import { defineEventHandler } from 'h3'
// import fetch from 'node-fetch'

// const hapiFhirUrl = "https://poc-fhirserver.siweiyang.com/fhir"

// export default defineEventHandler(async (event) => {
//   const { id } = event.context.params || {}
  
//   try {
//     const url = id 
//       ? `${hapiFhirUrl}/MedicationRequest/${id}`
//       : `${hapiFhirUrl}/MedicationRequest`
//     console.log(url,"log")
//     const response = await fetch(url)
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }
    
//     const data = await response.json()
    
//     if (id) {
//       const medicationDetails = data.dosageInstruction.map(instruction => ({
//         id: data.id,
//         medication: data.medicationCodeableConcept ? data.medicationCodeableConcept.text : 'N/A',
//         dosageInstruction: instruction.text || 'N/A'
//       }))
//       return medicationDetails
//     } else {
//       const entries = data.entry || []
//       const ids = entries.map(entry => entry.resource.id)
//       return ids
//     }
//   } catch (error) {
//     console.error('Error fetching MedicationRequest:', error.message)
//     throw createError({
//       statusCode: 500,
//       statusMessage: error.message
//     })
//   }
// })
