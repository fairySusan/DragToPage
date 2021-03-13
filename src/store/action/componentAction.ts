import { componentTy } from '../reducer/stateType'
import { AddComponent, SetCurrentComponent } from '../constant'

export const addComponent = (component: componentTy) => {
  return {type: AddComponent, component}
}

export const setCurrentComponent = (component: componentTy) => {
  return {type: SetCurrentComponent, component}
}