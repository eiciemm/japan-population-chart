// 配列データの順番をランダムに並べ替える
export const shuffleArrayOrder = (array: any[]) => {
  for (let i = array.length - 1; 0 < i; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    const tmp = array[i]
    array[i] = array[r]
    array[r] = tmp
  }
  return array
}
