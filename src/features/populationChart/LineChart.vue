<script lang="ts">
import { type PropType, computed, defineComponent } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { type PopulationData } from './PopulationChart.vue'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default defineComponent({
  name: 'LineChart',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Line
  },
  props: {
    yearLabels: {
      type: Array as PropType<string[]>,
      required: true
    },
    datasets: {
      type: Array as PropType<PopulationData[]>,
      required: true
    }
  },
  setup(props) {
    const data = computed(() => {
      return {
        labels: props.yearLabels,
        datasets: props.datasets
      }
    })

    const options = {
      responsive: true,
      maintainAspectRatio: false
    }

    // todo スタイルが当たらないので、調査
    const styles = {
      color: '#FFFFFF',
      background: '#000000'
    }

    return {
      data,
      options,
      styles
    }
  }
})
</script>

<template>
  <Line :data="data" :options="options" :width="900" :height="450" :styles="styles" />
</template>

<style scoped>
.lineStyle {
  background: black;
}
</style>
