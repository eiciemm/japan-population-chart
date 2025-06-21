import axiosResas from '../axios-resas'

export type DisplayDataType = '総人口' | '年少人口' | '生産年齢人口' | '老年人口'

// todo 命名を考える
export type D = {
  year: number
  value: number
  rate?: number
}

export type Data = {
  label: DisplayDataType
  data: D[]
}

export const usePopulation = () => {
  const getPopulationData = (prefCode: number) => {
    return axiosResas
      .get('/population/composition/perYear', { params: { prefCode } })
      .then((res) => {
        return res.data.result.data
      })
      .catch((err) => {
        console.error(err)
        return null
      })
  }

  return {
    getPopulationData
  }
}
