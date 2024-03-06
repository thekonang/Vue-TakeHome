<template>
  <div>
    <h1>Table View of Timeseries Data</h1>
    <div class="search-container">
      <h4>Enter a date range:</h4>
      <VueDatePicker
        v-model="selectedDate"
        range
        :enable-time-picker="false"
        :start-date="uniqueDates[0]"
        :max-date="uniqueDates[uniqueDates.length - 1]"
      ></VueDatePicker>

      <!-- Added text field -->
    </div>
    <v-text-field label="Search" v-model="search" />

    <v-data-table :items="filteredData" density="compact" theme="dark"></v-data-table>
    <!-- Applied custom class for table -->
  </div>
</template>

<script setup lang="ts">
import timeseriesData from '../data/timeseries.json'
import { onMounted, ref, computed, watch } from 'vue'

// Get unique dates from the JSON data
const uniqueDates = [...new Set(timeseriesData.map((row) => row.DateTime.split('T')[0]))]
const selectedDate = ref({})
selectedDate.value = [uniqueDates[0], uniqueDates[uniqueDates.length - 1]]

// Initialize the tableData when the component is mounted
const tableData = ref([])
onMounted(() => {
  tableData.value = timeseriesData
})

// Watch the selectedDate range and adjust the tableData accordingly
watch(selectedDate, () => {
  if (selectedDate.value.length === 2) {
    const [startDate, endDate] = selectedDate.value
    tableData.value = timeseriesData.filter((row) => {
      return (
        row.DateTime >= new Date(startDate).toISOString() &&
        row.DateTime <= new Date(endDate).toISOString()
      )
    })
  } else {
    tableData.value = timeseriesData
  }
})

// Search functionality
const search = ref('')
const filteredData = computed(() => {
  return tableData.value.filter((row) => {
    return (
      row.DateTime.includes(search.value) ||
      row.ENTSOE_DE_DAM_Price.includes(search.value) ||
      row.ENTSOE_GR_DAM_Price.includes(search.value) ||
      row.ENTSOE_FR_DAM_Price.includes(search.value)
    )
  })
})
</script>

<style scoped>
/* Flexbox layout for the search container */
.search-container {
  display: flex;
  align-items: center;
}
</style>
