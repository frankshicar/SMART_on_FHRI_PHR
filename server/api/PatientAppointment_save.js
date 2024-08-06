import { defineEventHandler, readBody, parseCookies } from 'h3';
import jwt from 'jsonwebtoken';
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
  const cookies = parseCookies(event);
  const token = cookies.token;

  if (!token) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const patientID = decoded.sub;

    const body = await readBody(event);
    const { prescription, appointmentDate, location } = body;


    //這個轉法會讓時區回到+00:00
    // 轉換格式成MySQL可以儲存的
    // const DataTime = new Date(appointmentDate);
    // // const hour = DataTime.getHours()+8;
    // // DataTime.setHours(hour);
    // const formattedDate = DataTime.toISOString().slice(0, 19).replace('T', ' ');
    function formatDate(date) {
      const pad = (num) => String(num).padStart(2, '0');
      
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1); // getMonth() 返回 0-11
      const day = pad(date.getDate());
      const hour = pad(date.getHours());
      const minute = pad(date.getMinutes());
      const second = pad(date.getSeconds());
    
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    
    const DataTime = new Date(appointmentDate);
    const formattedDate = formatDate(DataTime);
    console.log("save formattedDate", formattedDate)
    const connection = await pool.getConnection();
    try {
      await connection.execute(
        'INSERT INTO Patients_Appointment (PatientID, Prescription, AppointmentDate, location) VALUES (?, ?, ?, ?)',
        [patientID, prescription, formattedDate, location],
        console.log("INSERT!!!",prescription,formattedDate)
      );
      return { statusCode: 200, body: 'Appointment saved successfully' };
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
});