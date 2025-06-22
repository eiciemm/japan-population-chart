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
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    }

    const chartPlugins = [
      {
        id: 'chartAreaBackground',
        beforeDraw(chart: any) {
          const { ctx, chartArea } = chart
          if (!chartArea) return
          ctx.save()
          ctx.fillStyle = '#dcdcdc'
          ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
          )
          ctx.restore()
        }
      }
    ]

    return {
      data,
      options,
      chartPlugins
    }
  }
})
</script>

<template>
  <Line :data="data" :options="options" :width="1200" :height="450" :plugins="chartPlugins" />
</template>

<style scoped>
.lineStyle {
  background: black;
}
</style>
