<template>
  <div>
    <v-card theme="dark">
      <v-card-title>Table View of Timeseries Data</v-card-title>
      <v-card-subtitle>Select which columns to Display:</v-card-subtitle>
      <div v-for="(header, index) in headers.slice(1)" :key="index">
        <v-checkbox v-model="header.visible" :label="header.title"></v-checkbox>
      </div>
    </v-card>
    <v-card theme="dark" class="search-container">
      <v-card-text>Select a date range:</v-card-text>
      <VueDatePicker
        v-model="selectedDate"
        range
        dark
        :enable-time-picker="false"
        :start-date="uniqueDates[0]"
        :max-date="uniqueDates[uniqueDates.length - 1]"
      ></VueDatePicker>
    </v-card>
    <v-text-field label="Search" v-model="search" />
    <!-- @vue-skip -->
    <v-data-table
      :items="filteredData"
      :headers="displayedHeaders"
      density="compact"
      theme="dark"
    ></v-data-table>
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
  // @ts-ignore: Unreachable code error
  tableData.value = timeseriesData
})

// Watch the selectedDate range and adjust the tableData accordingly
watch(selectedDate, () => {
  // @ts-ignore: Unreachable code error
  if (selectedDate.value.length === 2) {
    // @ts-ignore: Unreachable code error
    const [startDate, endDate] = selectedDate.value
    // @ts-ignore: Unreachable code error
    tableData.value = timeseriesData.filter((row) => {
      return (
        row.DateTime >= new Date(startDate).toISOString() &&
        row.DateTime <= new Date(endDate).toISOString()
      )
    })
  } else {
    // @ts-ignore: Unreachable code error
    tableData.value = timeseriesData
  }
})

// Search functionality
const search = ref('')

const filteredData = computed(() => {
  return tableData.value.filter((row) => {
    return (
      // @ts-ignore: Unreachable code error
      row.DateTime.includes(search.value) ||
      // @ts-ignore: Unreachable code error
      row.ENTSOE_DE_DAM_Price.includes(search.value) ||
      // @ts-ignore: Unreachable code error
      row.ENTSOE_GR_DAM_Price.includes(search.value) ||
      // @ts-ignore: Unreachable code error
      row.ENTSOE_FR_DAM_Price.includes(search.value)
    )
  })
})

// Define headers for the table
const headers = ref([
  {
    title: 'Date & Time',
    align: 'start',
    sortable: true,
    value: 'DateTime',
    visible: true
  },
  { title: 'ENTSOE DE DAM Price', value: 'ENTSOE_DE_DAM_Price', sortable: true, visible: true },
  { title: 'ENTSOE GR DAM Price', value: 'ENTSOE_GR_DAM_Price', sortable: true, visible: true },
  { title: 'ENTSOE FR DAM Price', value: 'ENTSOE_FR_DAM_Price', sortable: true, visible: true }
])

// Compute displayed headers based on selected columns
const displayedHeaders = computed(() => {
  return headers.value.filter((header) => header.visible)
})
</script>

<style scoped>
/* Flexbox layout for the search container */
.search-container {
  display: flex;
  align-items: center;
}
</style>
