<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="form-group">
      <label for="medicationRequest">查看處方箋：</label>
      <select v-model="selective" id="medicationRequest">
        <option v-for="request in medicationRequest" :key="request" :value="request">{{ request }}</option>
      </select>
    </div>
    <button class="custom-button" @click="fetchSelectedMedicationRequest">確定</button>
    <div v-if="selectedMedicationRequest && selectedMedicationRequest.length > 0">
      <div v-for="med in selectedMedicationRequest" :key="med.id" class="medication-card">
        <h3>藥品名稱：{{ med.medication }}</h3>
        <p>摘要：{{ med.dosageInstruction }}</p>
        <span class="voice-icon" @click="readAloud(med.dosageInstruction)">🔊</span>
      </div>
    </div>
    <div class="tab-bar">
      <nuxt-link to="/appointment_home" :class="{ active: activeTab === 'appointment' }" @click.native="setActive('appointment')">預約取藥</nuxt-link>
      <nuxt-link to="/medicationRequest_medicinelist" :class="{ active: activeTab === 'prescription' }" @click.native="setActive('prescription')">處方</nuxt-link>
      <nuxt-link to="/medicationRequest_view" :class="{ active: activeTab === 'medicationRequest' }" @click="setActive('medicationRequest')" >個人資訊</nuxt-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const title = ref('查看處方箋');
    const selective = ref('');
    const medicationRequest = ref([]);
    const selectedMedicationRequest = ref(null);
    const activeTab = ref('medicationRequest');

    const setActive = (tab) => {
      activeTab.value = tab;
    };

const fetchMedicationRequests = async () => {
  try {
    const response = await fetch('/api/medicationRequest');
    if (!response.ok) {
      throw new Error('Error fetching MedicationRequests');
    }
    const data = await response.json();
    medicationRequest.value = data; // 假設 API 直接返回 ID 數組
  } catch (error) {
    console.error('Error fetching MedicationRequests:', error);
  }
};

const fetchSelectedMedicationRequest = async () => {
  console.log("selectiveValue", selective.value)
  try {
    if (selective.value) {
      const response = await fetch(`/api/medicationRequest/${selective.value}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.statusMessage || `Error fetching MedicationRequest details: ${response.status}`);
      }
      selectedMedicationRequest.value = await response.json();
      console.log("Fetched data:", selectedMedicationRequest.value);
    }
  } catch (error) {
    console.error('Error fetching MedicationRequest details:', error);
  }
};

    const readAloud = (text) => {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    };

    onMounted(() => {
      fetchMedicationRequests();
      console.log("Medication Request IDs:", medicationRequest.value);

    });

    return {
      title,
      selective,
      medicationRequest,
      selectedMedicationRequest,
      activeTab,
      setActive,
      fetchMedicationRequests,
      fetchSelectedMedicationRequest,
      readAloud
    };
  }
}
</script>
<style>
h1 {
  margin-top: 20px;
}
.form-group {
  display: grid;
  grid-template-columns: auto;
  font-size: 25px;
  gap: 10px;
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  justify-self: start
}
.form-group select,
.form-group .dp__main {
  flex: 1;
  min-width: 0;
  padding: 8px;
  font-size: 18px;
  line-height: 1.2;
}
.custom-button {
  background-color: #3498DB;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.custom-button:hover {
  background-color: #2980B9;
}
.medication-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
}
.voice-icon {
  cursor: pointer;
  font-size: 20px;
  margin-left: 10px;
}
.tab-bar {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.tab-bar a {
  margin: 0 10px;
  padding: 10px 20px;
  text-decoration: none;
  color: #000;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}
.tab-bar a.active {
  border-bottom: 2px solid #000;
}
</style>
