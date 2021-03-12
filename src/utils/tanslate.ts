import { store } from 'src/store'

export function changeStyleWithScale(value: string) {
  return parseInt(value) * parseInt(store.getState().globalData.scale) / 100
}