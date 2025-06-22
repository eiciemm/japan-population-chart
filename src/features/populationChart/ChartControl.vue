<script lang="ts">
import { type PropType, defineComponent } from 'vue'
import CheckBox from '../../components/CheckBox.vue'
import { type AreaType } from '../../util/Const'
import { type PrefecturesByArea, type Prefecture } from '../../hooks/usePrefectures'

export default defineComponent({
  name: 'ChartControl',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    CheckBox
  },
  props: {
    prefecturesByArea: {
      type: Object as PropType<PrefecturesByArea>,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selectByArea', 'selectByPrefecture', 'handleSelectChange', 'handleRadioChange'],
  setup(_, context) {
    const handleSelectChange = (e: Event) => {
      if (!(e.target instanceof HTMLSelectElement)) return
      context.emit('handleSelectChange', e.target.value)
    }
    const selectByArea = (checked: boolean, selectedArea: AreaType) => {
      context.emit('selectByArea', checked, selectedArea)
    }
    const selectByPrefecture = (checked: boolean, pref: Prefecture, area: AreaType) => {
      context.emit('selectByPrefecture', checked, pref, area)
    }
    const handleRadioChange = (e: Event) => {
      if (!(e.target instanceof HTMLInputElement)) return
      context.emit('handleRadioChange', e.target.value)
    }
    return {
      handleSelectChange,
      selectByArea,
      selectByPrefecture,
      handleRadioChange
    }
  }
})
</script>

<template>
  <div class="container">
    <div>
      <h1 class="header-title">都道府県別人口推移グラフ</h1>
      <div class="select">
        <p>表示グラフ</p>
        <label class="selectBox">
          <select name="population-type" @change="handleSelectChange">
            <option value="総人口">総人口</option>
            <option value="年少人口">年少人口</option>
            <option value="生産年齢人口">生産年齢人口</option>
            <option value="老年人口">老年人口</option>
          </select>
        </label>
      </div>

      <!-- want 大きさ動的に変えられる -->
      <!-- https://vue-chartjs.org/ja/guide/#%E5%8B%95%E7%9A%84%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F%E3%83%81%E3%83%A3%E3%83%BC%E3%83%88 -->
      <!-- <div class="select">
        <p>表示サイズ</p>
        <div>
          <input id="displayLight" name="displaySize" type="radio" value="light" checked />
          <label for="displayLight" class="radio-label">小</label>

          <input id="displayDark" name="displaySize" type="radio" value="dark" />
          <label for="displayDark" class="radio-label">中</label>

          <input id="displayDark" name="displaySize" type="radio" value="dark" />
          <label for="displayDark" class="radio-label">大</label>
        </div>
      </div> -->
      <div class="select">
        <p>表示モード</p>
        <div>
          <input
            id="displayLight"
            name="displayMode"
            type="radio"
            value="light"
            checked
            @change="handleRadioChange"
          />
          <label for="displayLight" class="radio-label">LIGHT</label>

          <input
            id="displayDark"
            name="displayMode"
            type="radio"
            value="dark"
            @change="handleRadioChange"
          />
          <label for="displayDark" class="radio-label">DARK</label>
        </div>
      </div>
    </div>

    <section class="select-prefectures">
      <div v-if="isLoading" class="loading-mask">
        <img src="@/assets/loading.gif" alt="" />
      </div>
      <div v-for="(data, key) in prefecturesByArea" :key="key" class="checkboxes">
        <div class="area-checkbox">
          <CheckBox
            :label="data.areaName"
            :checked="data.checked"
            @on-change="(checked: boolean) => selectByArea(checked, key)"
          />
        </div>
        <div v-for="prefecture in data.prefectures" :key="prefecture.prefCode" class="checkbox">
          <CheckBox
            :label="prefecture.prefName"
            :checked="prefecture.checked"
            :accent-color="prefecture.borderColor"
            @on-change="(checked: boolean) => selectByPrefecture(checked, prefecture, key)"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 32px;
}
.header-title {
  font-size: 24px;
  font-family: 'DotGothic16', sans-serif;
  font-style: normal;
  font-weight: bold;
  margin: 0;
}
.select {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
.select p {
  width: 120px;
  margin: 0;
}
.select-prefectures {
  padding-left: 20px;
  border-left: 1px solid black;
  position: relative;
}
.loading-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background: lightgray;
  opacity: 0.5;
  text-align: center;
}
.loading-mask img {
  width: 30px;
  height: 30px;
  position: absolute;
  top: calc(50% - 30px);
}
.radio-label {
  margin: 0 12px 0 4px;
}

.checkboxes {
  display: flex;
  margin-bottom: 8px;
}
.area-checkbox {
  width: 150px;
}
.checkbox {
  width: 95px;
}
.selectBox {
  display: inline-flex;
  align-items: center;
  position: relative;
}
.selectBox::after {
  position: absolute;
  right: 15px;
  width: 10px;
  height: 7px;
  background-color: #535353;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  content: '';
  pointer-events: none;
}

.selectBox select {
  appearance: none;
  padding: 8px 32px 8px 16px;
  border: 1px solid #d0d0d0;
  border-radius: 25px;
  background-color: #fff;
  color: #333333;
  font-size: 1em;
  cursor: pointer;
  outline: none;
}

@media (min-width: 1024px) {
}
</style>
