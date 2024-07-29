// import { defineEventHandler } from 'h3'
// import fetch from 'node-fetch'

// const hapiFhirUrl = "https://hapi.fhir.org/baseR4"

// export default defineEventHandler(async (event) => {
//   const id = event.context.params.id
  
//   try {
//     const response = await fetch(`${hapiFhirUrl}/MedicationRequest/${id}`)
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }
//     const data = await response.json()
    
//     const medicationDetails = data.dosageInstruction.map(instruction => ({
//       id: data.id,
//       medication: data.medicationCodeableConcept ? data.medicationCodeableConcept.text : 'N/A',
//       dosageInstruction: instruction.text || 'N/A'
//     }))
//     return medicationDetails
//   } catch (error) {
//     console.error('Error fetching MedicationRequest:', error.message)
//     throw createError({
//       statusCode: 500,
//       statusMessage: error.message
//     })
//   }
// })

import { defineEventHandler } from 'h3'
import fetch from 'node-fetch'

const hapiFhirUrl = "https://poc-fhirserver.siweiyang.com/fhir"

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  console.log("Received request for MedicationRequest ID:", id)

  try {
    const url = `${hapiFhirUrl}/MedicationRequest/${id}`
    console.log("Fetching from URL:", url)

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log("Received data:", data)

    const medicationDetails = data.dosageInstruction.map(instruction => ({
      id: data.id,
      medication: data.medicationCodeableConcept ? data.medicationCodeableConcept.text : 'N/A',
      dosageInstruction: instruction.text || 'N/A'
    }))

    console.log("Returning medication details:", medicationDetails)
    return medicationDetails
  } catch (error) {
    console.error('Error fetching MedicationRequest:', error.message)
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }
})