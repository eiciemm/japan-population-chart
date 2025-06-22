<script lang="ts">
import { ref, type Ref, computed, defineComponent, onMounted, watch } from 'vue'
import { usePrefectures, type Prefecture } from '../../hooks/usePrefectures'
import { usePopulation, type DisplayDataType, type D, type Data } from '../../hooks/usePopulation'
import ChartControl from './ChartControl.vue'
import LineChart from './LineChart.vue'
import { AREA_MAP, AREA_NAME_MAP, type AreaType } from '../../util/Const'

export type PopulationData = {
  label: string
  borderColor: string
  // 全4種類のデータ
  allData: Data[]
  // 表示用のデータの数値配列
  data: number[]
}

export default defineComponent({
  name: 'PopulationChart',
  components: {
    ChartControl,
    LineChart
  },
  setup() {
    const yearLabels: Ref<string[]> = ref([])
    const dataSets: Ref<PopulationData[]> = ref([])
    const selectedDisplayType: Ref<DisplayDataType> = ref('総人口')
    const selectedDisplayMode: Ref<'light' | 'dark'> = ref('light')
    const isLoading: Ref<boolean> = ref(false)

    const dataSetsComputed = computed({
      get: () => dataSets.value,
      set: (value) => {
        dataSets.value = value
      }
    })

    const background = computed(() => {
      if (selectedDisplayMode.value === 'dark') {
        return '#444'
      } else {
        return ''
      }
    })
    const color = computed(() => {
      if (selectedDisplayMode.value === 'dark') {
        return 'white'
      } else {
        return ''
      }
    })

    const { prefecturesByArea } = usePrefectures()
    const { getPopulationData } = usePopulation()

    onMounted(() => {
      const arr = [...Array(18)].map((_, i) => (i * 5 + 1960).toString())
      yearLabels.value = arr
    })

    const getData = async (pref: Prefecture) => {
      const populationData = await getPopulationData(pref.prefCode)
      // todo エラーハンドリング
      if (!populationData) return

      const displayData = populationData.find(
        (data: PopulationData) => data.label === selectedDisplayType.value
      )

      return {
        label: pref.prefName,
        borderColor: pref.borderColor,
        allData: populationData,
        data: displayData.data.map((data: D) => data.value)
      } as PopulationData
    }

    const selectByPrefecture = async (checked: boolean, prefecture: Prefecture, area: AreaType) => {
      if (isLoading.value) return
      isLoading.value = true
      const isAlreadySelected = dataSetsComputed.value?.some(
        (data) => data.label === prefecture.prefName
      )

      prefecturesByArea.value[area].prefectures.forEach((pref) => {
        if (pref.prefName === prefecture.prefName) pref.checked = checked
      })

      if (!isAlreadySelected && checked) {
        const data = await getData(prefecture)
        if (!data) return
        dataSetsComputed.value = [...dataSetsComputed.value, data]
      } else {
        dataSetsComputed.value = dataSetsComputed.value?.filter(
          (data) => data.label !== prefecture.prefName
        )
      }
      isLoading.value = false
    }

    const selectByArea = async (checked: boolean, selectedArea: AreaType) => {
      if (isLoading.value) return
      isLoading.value = true
      prefecturesByArea.value[selectedArea].prefectures.forEach(async (pref) => {
        pref.checked = checked

        const isAlreadySelected = dataSetsComputed.value?.some(
          (data) => data.label === pref.prefName
        )

        if (!isAlreadySelected && checked) {
          const data = await getData(pref)
          if (!data) return
          dataSetsComputed.value = [...dataSetsComputed.value, data]
        }
        if (!checked) {
          dataSetsComputed.value = dataSetsComputed.value?.filter(
            (data) => data.label !== pref.prefName
          )
        }
      })
      isLoading.value = false
    }

    const handleSelectChange = (selectedType: DisplayDataType) => {
      selectedDisplayType.value = selectedType
      if (dataSetsComputed.value.length === 0) return
      const newPopulationData = dataSetsComputed.value.map((dataSet: PopulationData) => {
        const newData = dataSet.allData.find(
          (data: Data) => data.label === selectedDisplayType.value
        )
        if (!newData) return
        return {
          ...dataSet,
          data: newData.data.map((data: D) => data.value)
        }
      })
      dataSetsComputed.value = newPopulationData as PopulationData[]
    }

    const changeDisplayMode = (mode: 'light' | 'dark') => {
      selectedDisplayMode.value = mode
    }

    watch(dataSetsComputed, () => {
      const labelArr = dataSetsComputed.value.map((data) => data.label)

      // 以下、各エリアの都道府県の選択状況を見て、CheckBOXに自動でチェックON/OFF
      prefecturesByArea.value['KANTO'].checked = AREA_MAP['KANTO'].every((area) => {
        return labelArr.includes(area)
      })
      prefecturesByArea.value['KINKI'].checked = AREA_MAP['KINKI'].every((area) => {
        return labelArr.includes(area)
      })
      prefecturesByArea.value['HOKKAIDO'].checked = AREA_MAP['HOKKAIDO'].every((area) => {
        return labelArr.includes(area)
      })
      prefecturesByArea.value['TOHOKU'].checked = AREA_MAP['TOHOKU'].every((area) => {
        return labelArr.includes(area)
      })
      prefecturesByArea.value['CHUBU'].checked = AREA_MAP['CHUBU'].every((area) => {
        return labelArr.includes(area)
      })
      prefecturesByArea.value['CHUGOKU_SHIKOKU'].checked = AREA_MAP['CHUGOKU_SHIKOKU'].every(
        (area) => {
          return labelArr.includes(area)
        }
      )
      prefecturesByArea.value['KYUSHU'].checked = AREA_MAP['KYUSHU'].every((area) => {
        return labelArr.includes(area)
      })
    })

    return {
      prefecturesByArea,
      dataSetsComputed,
      yearLabels,
      getPopulationData,
      selectByPrefecture,
      selectByArea,
      handleSelectChange,
      changeDisplayMode,
      AREA_NAME_MAP,
      selectedDisplayType,
      selectedDisplayMode,
      background,
      color,
      isLoading
    }
  }
})
</script>

<template>
  <div class="all-wrapper">
    <div class="controller">
      <ChartControl
        :prefectures-by-area="prefecturesByArea"
        :is-loading="isLoading"
        @handle-select-change="handleSelectChange"
        @select-by-area="selectByArea"
        @select-by-prefecture="selectByPrefecture"
        @handle-radio-change="changeDisplayMode"
      />
    </div>

    <div class="chart">
      <LineChart :year-labels="yearLabels" :datasets="dataSetsComputed" />
    </div>
  </div>
</template>

<style scoped>
.all-wrapper {
  height: 100vh;
  background: v-bind(background);
  color: v-bind(color);
}
.controller {
  width: 94%;
  padding: 20px 0;
  margin: 0 auto;
}
.chart {
  width: 94%;
  margin: 0 auto;
  padding: 15px 0;
  display: flex;
  justify-content: center;
}

@media (min-width: 1024px) {
}
</style>
