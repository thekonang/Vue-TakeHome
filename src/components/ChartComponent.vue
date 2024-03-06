<template>
  <div>
    <!-- Canvas element for displaying the chart -->
    <canvas id="myChart"></canvas>
    <!-- VueDatePicker component for selecting date range
    Initializing the start and end date based on the datast-->
    <h4>Select a date range to show (End date is exclusive):</h4>
    <VueDatePicker
      v-model="selectedDate"
      range
      :enable-time-picker="false"
      :start-date="uniqueDates[0]"
      :max-date="uniqueDates[uniqueDates.length - 1]"
    ></VueDatePicker>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import Chart from 'chart.js/auto'
import timeseriesData from '../data/timeseries.json'
// Get unique dates from the JSON data
const uniqueDates = [...new Set(timeseriesData.map((row) => row.DateTime.split('T')[0]))]
const selectedDate = ref({})
selectedDate.value = [uniqueDates[0], uniqueDates[uniqueDates.length - 1]]

const filteredData = computed(() => {
  // Filter data based on selected date range
  if (selectedDate.value.length !== 2) {
    return timeseriesData
  } else {
    const [startDate, endDate] = selectedDate.value
    return timeseriesData.filter((row) => {
      return (
        row.DateTime >= new Date(startDate).toISOString() &&
        row.DateTime <= new Date(endDate).toISOString()
      )
    })
  }
})

// Initialize chart data
const data = ref({
  labels: filteredData.value.map((row) => new Date(row.DateTime).toLocaleString()),
  datasets: [
    {
      label: 'ENTSOE_DE_DAM_Price',
      data: filteredData.value.map((row) => row.ENTSOE_DE_DAM_Price),
      pointRadius: 0
    },
    {
      label: 'ENTSOE_GR_DAM_Price',
      data: filteredData.value.map((row) => row.ENTSOE_GR_DAM_Price),
      pointRadius: 0
    },
    {
      label: 'ENTSOE_FR_DAM_Price',
      data: filteredData.value.map((row) => row.ENTSOE_FR_DAM_Price),
      pointRadius: 0
    }
  ]
})

// Configuration for the chart
const config = {
  type: 'line',
  data: data.value,
  options: {}
}

// Initialize the chart when the component is mounted
onMounted(() => {
  const ctx = document.getElementById('myChart').getContext('2d')
  new Chart(ctx, config)
})

// Watch for changes in selectedDate and update chart data
watch(selectedDate, () => {
  data.value.labels = filteredData.value.map((row) => new Date(row.DateTime).toLocaleString())
  data.value.datasets[0].data = filteredData.value.map((row) => row.ENTSOE_DE_DAM_Price)
  data.value.datasets[1].data = filteredData.value.map((row) => row.ENTSOE_GR_DAM_Price)
  data.value.datasets[2].data = filteredData.value.map((row) => row.ENTSOE_FR_DAM_Price)
  config.data = data.value

  // Update the chart
  let canvas = document.querySelector('#myChart')
  let chart = Chart.getChart(canvas) // Select using the canvas element
  chart.update()
})
</script>
