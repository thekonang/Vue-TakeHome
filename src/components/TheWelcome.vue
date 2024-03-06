<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
</script>
<style>
img {
  color: white;
}
</style>
<template>
  <WelcomeItem>
    <template #icon> <font-awesome-icon icon="file" /> </template>
    <template #heading>Documentation</template>

    Follow this link for the
    <a
      href="https://github.com/thekonang/Vue-TakeHome?tab=readme-ov-file#takehomeassignmentvuetify"
      target="_blank"
      rel="noopener"
      >ReadMe Page
    </a>
    of this project for a detailed guide.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <font-awesome-icon icon="fa-screwdriver-wrench" />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>.
    <br />
    Components are from the
    <a href="https://vuetifyjs.com/en/" target="_blank" rel="noopener">Vuetify</a> Library , whereas
    the Chart component is implemented using the
    <a href="https://www.chartjs.org/>" target="_blank" rel="noopener">ChartJs</a> Library.
    <br />
    <a href="https://fontawesome.com/" target="_blank" rel="noopener">Font Awesome</a> icons were
    used
    <br />
    The static webpage was deployed using<a
      href="https://docs.github.com/en/actions/using-workflows"
      target="_blank"
      rel="noopener"
      >GitHub workflows</a
    >

    <br />

    More informations are available in <code>README.md</code>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <font-awesome-icon icon="fa-circle-question" />
    </template>
    <template #heading>About the project</template>

    Built this project as a take home assignment for a frontend developer position. Was tasked to
    present a timeseries stored in a json file on a responsive and filterable table and chart.<br />
    Had no previous hands on experience with the <code>Vue Framework</code>, but really enjoyed the
    challenge and process.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <font-awesome-icon icon="fa-user" />
    </template>
    <template #heading>About me</template>
    Final year student at Computer Science Department of AUTh. <br />
    Professional experience as a junior developer on the MEAN stack.<br />
    <a href="https://github.com/thekonang" target="_blank" rel="noopener">Theocharis Angelidis</a>.
  </WelcomeItem>
</template>
