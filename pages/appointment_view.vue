<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="form-container">
      <label for="datePicker">選擇日期：</label>
      <date-picker v-model="selectedDate" @update:modelValue="fetchAppointments"></date-picker>
    </div>
    <div class="appointments-container">
      <ul class="appointments-list">
        <li v-for="appointment in appointments" :key="appointment.PatientID" class="appointment-item">
          <div class="appointment-details">
            <div class="appointment-date">{{ appointment.AppointmentDate }}</div>
            <div class="appointment-info">{{ appointment.location }} - {{ appointment.Prescription }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="tab-bar">
      <nuxt-link to="/appointment_home" :class="{ active: activeTab === 'appointment' }" @click.native="setActive('appointment')">預約取藥</nuxt-link>
      <nuxt-link to="/medicationRequest_medicinelist" :class="{ active: activeTab === 'prescription' }" @click.native="setActive('prescription')">處方</nuxt-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: {
    'date-picker': VueDatePicker,
  },
  setup() {
    const title = ref('查看預約');
    const selectedDate = ref(new Date());
    const activeTab = ref('appointment');
    const appointments = ref([]);

    const setActive = (tab) => {
      activeTab.value = tab;
    };

    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    const fetchAppointments = async () => {
      try {
        const formattedDate = formatDate(selectedDate.value);
        const response = await fetch('/api/PatientAppointment_view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: formattedDate,
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          appointments.value = data.map(appointment => ({
            ...appointment,
            AppointmentDate: new Date(appointment.AppointmentDate).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })
          }));
        } else {
          console.error('Error fetching appointments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    onMounted(() => {
      fetchAppointments();
    });

    return {
      title,
      selectedDate,
      activeTab,
      setActive,
      fetchAppointments,
      appointments
    };
  },
};
</script>


<style>
body {
  background-color: #ffffff;
  color: #2c3e50;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  text-align: center;
  line-height: 1.6;
}
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  text-align: center;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.form-container label {
  margin-bottom: 10px;
  font-weight: bold;
}

/* .form-container select,
.form-container .dp__main {
  flex: 1;
  min-width: 0;
  padding: 8px;
  font-size: 14px;
  line-height: 1.2;
} */

.custom-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}


.custom-button:hover {
  background-color: #2980b9;
}

.appointments-list {
  list-style-type: none;
  padding: 0;
}

.appointment-item {
  background-color: rgb(232, 213, 242);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.appointment-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.appointment-date {
  font-weight: bold;
}

.appointment-info {
  color: #555;
}

.tab-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #e7e7e7;
}

.tab-bar a {
  color: #2c3e50;
  text-decoration: none;
  text-align: center;
  flex-grow: 1;
  padding: 10px 0;
}

.tab-bar a.active {
  color: #3498db;
  font-weight: bold;
}

</style>