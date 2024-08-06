<template>
    <div>
      <h1>Appointments</h1>
      <ul>
        <li v-for="appointment in appointments" :key="appointment.PatientID">
          {{ formatAppointmentDate(appointment.AppointmentDate) }} - {{ appointment.Prescription }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        appointments: []
      };
    },
    mounted() {
      axios.get('/api/PatientAppointment_view')
        .then(response => {
          this.appointments = response.data;
        })
        .catch(error => {
          console.error('Error fetching appointments:', error);
        });
    },
    methods: {
      formatAppointmentDate(dateString) {
        const date = new Date(dateString);
        return date
      }
    }
  }
  </script>
  