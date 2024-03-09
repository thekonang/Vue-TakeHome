# takeHomeAssignment - VueJS

A take home assignment Front End Development project.

Handles and showcases timeseries data from a JSON file.

## Key Features

- JSON Parsing: Parses a JSON file containing timeseries data.

- **_Table Visualization_**: Presents the data in a clear and readable table format. It provides functionalities for column selection, date range filtering, and data search.
  The users can interact with the following ways:

  - **Column Selection:** Users can choose which data columns to display in the table, providing a customizable view of the timeseries information. Users can click on a checkbox to toggle the visibility of the corresponding data column
  - **Date Range Selection:** A date picker component allows users to filter the displayed data based on a specific date range, focusing on relevant timeframes.
  - **SearchFunctionality:** Users can enter a keyword in a search field to filter the table data across specified columns, enabling quick identification of data points of interest.

- **_Line Chart Integration_**: Creates an interactive line chart to visualize trends in the data. The line chart component displays a line graph representing the variations in specific data points over time. Users can select a date range to filter the displayed data in the chart , as well as line selection.
  - **Script Setup:**
    The script setup section utilizes Vue 3 features to manage data, user interactions, and chart updates.
    - Retrieves data from the JSON file
    - Filters data based on the selected date range using a computed property (`filteredData`)
    - Defines chart data with labels and data points based on the filtered data
    - Configures the chart type and options
    - Initializes the chart on component mount, and
    - Watches for changes in the selected date range to update the chart data and trigger a chart update.

**Chart Library:**

The component leverages the Chart.js library (`chart.js/auto`) to create and manipulate the line chart.

**Key Functionalities:**

- **`onMounted`:** This lifecycle hook initializes the chart when the component is mounted. It retrieves the canvas element context and creates a new `Chart` instance using the defined configuration.
- **`watch(selectedDate)`:** This watcher observes changes in the `selectedDate` ref. When the date range changes, it updates the chart data with new labels and data points extracted from the filtered data. It then retrieves the existing chart instance using `Chart.getChart` and calls the `update` method to reflect the changes in the chart visualization.

## Project Structure

## Technologies Used

### Dependencies

- [Vuetify](https://vuetifyjs.com/en/)(^3.5.7)

- [Vue DatePicker](https://vue3datepicker.com/) (^8.2.0)

- [FontAwesome](https://fontawesome.com/)

- [Chart.js](https://www.chartjs.org/)

### UI Framework

- **Vuetify** is a Material Design component framework for Vue.js. It provides a collection of pre-built and customizable UI components that adhere to Google's Material Design guidelines.

- **Icon Integration**

Explain how you integrated FontAwesome icons for visual elements.

List the specific icons you included (user, file, etc.) and their potential use cases in the application.

## Deployment

This project is deployed on GitHub Pages and can be accessed [here](https://thekonang.github.io/Vue-TakeHome/)

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh

npm  install

```

### Compile and Hot-Reload for Development

```sh

npm  run  dev

```

### Type-Check, Compile and Minify for Production

```sh

npm  run  build

```

### Lint with [ESLint](https://eslint.org/)

```sh

npm  run  lint

```
