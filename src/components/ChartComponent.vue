<template>
  <div class="chart">
    <div id="chartTitle">
      <h1>
        {{ msg }}
      </h1>
    </div>
    <div>
      <canvas id="myChart" width="400" height="400"></canvas>
      <v-date-picker
        multiple="range"
        :allowed-dates="this.datasetDateRange"
        :min="this.datasetDateRange[0]"
        :max="this.datasetDateRange[this.datasetDateRange.length - 1]"
        v-model="selectedDateRange"
        @click="filterData"
      ></v-date-picker>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import timeseriesData from '../data/timeseries.json'

export default {
  name: 'ChartComponent',
  components: {},
  data() {
    return {
      datasetDateRange: [],
      selectedDateRange: [
        new Date(timeseriesData[0].DateTime),
        new Date(timeseriesData[timeseriesData.length - 1])
      ],
      chartInstance: null,
      originalData: timeseriesData,
      chartData: [],
      start: null,
      minPrice: 0
    }
  },

  props: {
    msg: String
  },
  methods: {
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy()
      }

      this.chartInstance = new Chart(document.getElementById('myChart'), {
        type: 'line',
        options: {
          responsive: true,
          scales: {
            y: {
              min: this.minPrice
            }
          }
        },

        data: {
          labels: this.chartData.map((row) => new Date(row.DateTime).toLocaleString()),
          datasets: [
            {
              label: 'ENTSOE_DE_DAM_Price',
              data: this.chartData.map((row) => row.ENTSOE_DE_DAM_Price),
              pointRadius: 0
            },
            {
              label: 'ENTSOE_GR_DAM_Price',
              data: this.chartData.map((row) => row.ENTSOE_GR_DAM_Price),
              pointRadius: 0
            },
            {
              label: 'ENTSOE_FR_DAM_Price',
              data: this.chartData.map((row) => row.ENTSOE_FR_DAM_Price),
              pointRadius: 0
            }
          ]
        }
      })
    },
    calculateMinPrice() {
      this.minPrice = this.chartData.reduce(
        (min, item) =>
          Math.min(
            min,
            item.ENTSOE_DE_DAM_Price,
            item.ENTSOE_GR_DAM_Price,
            item.ENTSOE_FR_DAM_Price
          ),
        Infinity
      )
    },
    calculateDateRange() {
      const uniqueDates = new Set()
      timeseriesData.forEach((item) => {
        const dateString = item.DateTime.split('T')[0]
        uniqueDates.add(dateString)
      })

      this.datasetDateRange = Array.from(uniqueDates)
    },
    filterData() {
      const startDate = this.selectedDateRange[0]
      const endDate = this.selectedDateRange[this.selectedDateRange.length - 1]
      console.log(startDate, !isNaN(startDate.getTime()))
      console.log(endDate, !isNaN(endDate.getTime()))
      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        console.log('passed')
        this.chartData = this.originalData.filter((item) => {
          return new Date(item.DateTime) >= startDate && new Date(item.DateTime) <= endDate
        })
        this.calculateMinPrice()

        this.renderChart()
      }
    }
  },
  mounted() {
    this.calculateDateRange()
    this.chartData = this.originalData
    this.renderChart()
  },
  unmounted() {
    if (this.chartInstance) {
      this.chartInstance.destroy()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* canvas {
  margin: 10%;
} */
.v-date-picker {
  margin: auto;
  width: 100%;

  padding: 10px;
}
h1 {
  height: 50px;
}
img {
  height: inherit;
  max-height: 100%;
  min-height: 100%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
