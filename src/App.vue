<script lang="ts">
import { defineComponent } from 'vue'
import PopulationChart from './features/populationChart/PopulationChart.vue'

export default defineComponent({
  components: {
    PopulationChart
  }
})
</script>

<template>
  <div>
    <PopulationChart />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DotGothic16&display=swap');
</style>
