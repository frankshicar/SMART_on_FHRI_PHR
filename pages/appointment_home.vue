<template>
  <div class="body" >
    <h1>{{ title }}</h1>
    <nuxt-link to="/appointment_make" class="button">{{ makeAppointment }}</nuxt-link>
    <nuxt-link to="/appointment_view" class="button">{{ viewAppointment }}</nuxt-link>
    <div class="tab-bar">
      <nuxt-link to="/appointment_home" :class="{ active: activeTab === 'appointment' }" @click.native="setActive('appointment')">預約取藥</nuxt-link>
      <nuxt-link to="/medicationRequest_medicinelist" :class="{ active: activeTab === 'prescription' }" @click.native="setActive('prescription')">處方</nuxt-link>
      <nuxt-link to="/medicationRequest_view" :class="{ active: activeTab === 'medicationRequest' }" @click.native="setActive('medicationRequest')">個人資訊</nuxt-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const title = ref('預約取藥');
    const makeAppointment = ref('預約取藥');
    const viewAppointment = ref('查看預約');
    const activeTab = ref('appointment');

    const setActive = (tab) => {
      activeTab.value = tab;
    };

    return {
      title,
      makeAppointment,
      viewAppointment,
      activeTab,
      setActive
    };
  },

}

</script>

<style>
/* html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #5d4646;
  color: #2C3E50;
  font-family: Arial, sans-serif;
} */
h1 {
  margin-top: 20px;
}
.button {
  display: block;
  width: 60%;
  padding: 35px;
  margin: 40px auto;
  text-align: center;
  background-color: #3498DB;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  text-decoration: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}
.button:hover {
  background-color: #2980B9;
}
.body {
    background-color: #ffffff;
    color: #2C3E50;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    text-align: center;
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
    color: #2C3E50;
    text-decoration: none;
    text-align: center;
    flex-grow: 1;
    padding: 10px 0;
  }
  .tab-bar a.active {
    color: #3498DB;
    font-weight: bold;
  }
</style>
