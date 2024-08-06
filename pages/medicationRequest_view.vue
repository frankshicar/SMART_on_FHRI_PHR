<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="form-container">
      <label for="medicationRequest">查看處方：</label>
      <select v-model="selective" id="medicationRequest">
        <option v-for="request in medicationRequest" :key="request" :value="request">{{ request }}</option>
      </select>
      <label for="datePicker">選擇日期：</label>
      <date-picker v-model="selectedDate"></date-picker>
    </div>
    <button class="custom-button" @click="fetchAppointments">確定</button>
    <div class="tab-bar">
      <nuxt-link to="/appointment_home" :class="{ active: activeTab === 'appointment' }" @click.native="setActive('appointment')">預約取藥</nuxt-link>
      <nuxt-link to="/medicationRequest_medicinelist" :class="{ active: activeTab === 'prescription' }" @click.native="setActive('prescription')">處方</nuxt-link>
      <nuxt-link to="/medicationRequest_view" :class="{ active: activeTab === 'medicationRequest' }" @click="setActive('medicationRequest')" >個人資訊</nuxt-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: {
    'date-picker': VueDatePicker,
  },
  setup() {
    const title = ref('查看處方');
    const selective = ref('');
    const medicationRequest = ref(['001', '002', '003']);
    const selectedDate = ref(null);
    const activeTab = ref('medicationRequest');

    const setActive = (tab) => {
      activeTab.value = tab;
    };

    const fetchAppointments = () => {
      console.log('Fetching appointments for date:', selectedDate.value, 'and request:', selective.value);
    };

    return {
      title,
      selective,
      medicationRequest,
      selectedDate,
      activeTab,
      setActive,
      fetchAppointments,
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
}

h1 {
  margin-top: 20px;
}

.form-container {
  display: grid;
  grid-template-columns: auto;
  font-size: 20px;
  gap: 10px;
  align-items: center;
  width: 80%;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px
}

.form-container label {
  justify-self: start;
  white-space: nowrap;
}

.form-container select,
.form-container .dp__main {
  flex: 1;
  min-width: 0;
  padding: 8px;
  font-size: 14px;
  line-height: 1.2;
}

.custom-button {
  display: block;
  width: 80%;
  padding: 15px;
  margin: 30px auto;
  font-size: 20px;
  text-align: center;
  background-color: #d3d3d3;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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