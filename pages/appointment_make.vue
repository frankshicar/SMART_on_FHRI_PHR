<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="form-group" v-for="field in fields" :key="field.id">
      <label :for="field.id">{{ field.label }}</label>
      <select v-model="field.value" :id="field.id">
        <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
    <button class="custom-button">確定</button>
    <div class="tab-bar">
      <nuxt-link to="/appointment_home" :class="{ active: activeTab === 'appointment' }" @click.native="setActive('appointment')">預約取藥</nuxt-link>
      <nuxt-link to="/medicationRequest_medicinelist" :class="{ active: activeTab === 'prescription' }" @click.native="setActive('prescription')">處方</nuxt-link>
      <nuxt-link to="/medciationRequest_view" :class="{ active: activeTab === 'medicatioRequest' }" @click.native="setActive('medicationRequest')" >個人資訊</nuxt-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const title = ref('預約取藥');
    const activeTab = ref('prescription');
    const fields = ref([
      { id: 'prescription', label: '處方', value: '', options: ['選項1', '選項2', '選項3'] },
      { id: 'date', label: '日期', value: '', options: ['2024-07-22', '2024-07-23', '2024-07-24'] },
      { id: 'time', label: '時間', value: '', options: ['上午', '下午', '晚上'] },
      { id: 'location', label: '地點', value: '', options: ['地點1', '地點2', '地點3'] },
    ]);

    const setActive = (tab) => {
      activeTab.value = tab;
    };

    return {
      title,
      activeTab,
      fields,
      setActive
    };
  }
}
</script>

<style>
body {
  background-color: #FFFFFF;
  color: #2C3E50;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  text-align: center;
}
h1 {
  margin-top: 20px;
}
.form-group {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  font-size: 20px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.form-group label {
  flex: 0 0 20%;
  text-align: right;
  margin-right: 10px;
}
.form-group select {
  flex: 1;
  padding: 15px;
  font-size: 18px;
  line-height: 1.3;
  background-color: #F0F0F0;
  border: 1px solid #DDD;
  border-radius: 5px;
}
.custom-button {
  display: block;
  width: 80%;
  padding: 15px;
  margin: 20px auto;
  font-size: 20px;
  text-align: center;
  background-color: #D3D3D3;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.custom-button:hover {
  background-color: #B0B0B0;
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
