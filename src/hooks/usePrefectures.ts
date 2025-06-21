import { ref, type Ref } from 'vue'
import axiosResas from '../axios-resas'
import { COLORS_FOR_PREFECTURES, AREA_MAP, AREA_NAME_MAP, type AreaType } from '../util/Const'

export type Prefecture = {
  prefCode: number
  prefName: string
  borderColor: string
  checked: boolean
}

export type PrefecturesByArea = Record<
  AreaType,
  { checked: boolean; areaName: string; prefectures: Prefecture[] }
>

export const usePrefectures = () => {
  const prefecturesByArea: Ref<PrefecturesByArea> = ref({} as PrefecturesByArea)

  axiosResas
    .get('/prefectures')
    .then((res) => {
      const prefectures = res.data.result.map(
        (data: { prefCode: number; prefName: string }, index: number) => {
          return { ...data, borderColor: COLORS_FOR_PREFECTURES[index], checked: false }
        }
      )

      const obj = {} as PrefecturesByArea
      Object.keys(AREA_MAP).forEach((key) => {
        obj[key as AreaType] = {
          checked: false,
          areaName: AREA_NAME_MAP[key as AreaType],
          prefectures: AREA_MAP[key as AreaType].map((area) => {
            return prefectures.find((prefecture: Prefecture) => prefecture.prefName === area)
          })
        }
      })
      prefecturesByArea.value = obj
    })
    .catch((err) => {
      console.error(err)
    })

  return {
    prefecturesByArea
  }
}
