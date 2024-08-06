// server/api/PatientAppointment_view.js
import { defineEventHandler, createError } from 'h3';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'frank0403',
  database: 'FHIR_Appointment_Medicine',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { date } = body;
  console.log("Received data:", { date})
  if (!date ) {
    return createError({
      statusCode: 400,
      statusMessage: 'Date and Prescription parameters are required'
    });
  }

  // try {
  //   const [rows] = await pool.query(
  //     "SELECT * FROM Patients_Appointment WHERE DATE(AppointmentDate) = ? AND Prescription = ?",
  //     [date, prescription]
  //   );
  //   console.log("ADD DATETIME",rows.AppointmentDate)
  //   return rows;
  // } 
  try {
    const [rows] = await pool.query(
      "SELECT * FROM Patients_Appointment WHERE DATE(AppointmentDate) = ? ",
      [date]
    );

    // 加上 8 小時
    const updatedRows = rows.map(row => {
      const appointmentDate = new Date(row.AppointmentDate);
      // appointmentDate.setHours(appointmentDate.getHours() + 8);
      return {
        ...row,
        AppointmentDate: appointmentDate
      };
    });

    console.log("Updated Rows:", updatedRows);
    return updatedRows;
  } 
  catch (error) {
    console.error("資料庫查詢錯誤", error);
    return createError({
      statusCode: 500,
      statusMessage: error.message
    });
  }
});
