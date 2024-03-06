<template>
  <div>
    <h1>Table View of Timeseries Data</h1>

    <v-text-field label="Search" v-model="search" />

    <v-data-table :items="filteredData"></v-data-table>
    <v-date-picker v-model="selectedDate" persistent />
  </div>
</template>

<script>
import timeseriesData from '../data/timeseries.json'

export default {
  data() {
    return {
      timeseriesData,
      search: '',
      selectedDate: null,
      menuOpen: false
    }
  },
  computed: {
    filteredData() {
      return this.timeseriesData.filter((item) => {
        const dateMatch =
          !this.selectedDate ||
          new Date(item.DateTime).toDateString() === this.selectedDate.toDateString()
        const textMatch = item.ENTSOE_DE_DAM_Price.includes(this.search)
        return dateMatch && textMatch
      })
    }
  }
}
</script>
