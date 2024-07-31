import { defineEventHandler } from 'h3';
import fetch from 'node-fetch';

const hapiFhirUrl = "https://poc-fhirserver.siweiyang.com/fhir";

export default defineEventHandler(async (event) => {
  try {
    const url = `${hapiFhirUrl}/MedicationRequest`;
    console.log("Fetching from URL:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const entries = data.entry || [];

    const grouped = {};
    entries.forEach(entry => {
      const { authoredOn, requester, medicationCodeableConcept, subject, status} = entry.resource;
      const doctorName = requester?.display || "Unknown Doctor"; // 檢查是否為Unknow
      const patientName = subject.reference
      const key = `${authoredOn}-${doctorName}-${patientName}`;
      
      if (status !== 'active') {
        return; // 跳过非 active 的条目
      }
      // 下拉表單選項
      if (!grouped[key]) {
        grouped[key] = {
          authoredOn,
          doctor: doctorName,
          // status,
          medications: []
        };
      }
      grouped[key].medications.push(medicationCodeableConcept?.text || "Unknown Medication"); // 防御性检查
    });

    // 轉換為數組
    const result = Object.values(grouped);
    console.log("Returning aggregated data:", result);
    return result;
  } catch (error) {
    console.error('Error fetching MedicationRequest list:', error.message);
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
});
