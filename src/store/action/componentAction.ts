import { componentTy } from '../reducer/stateType'
import { AddComponent } from '../constant'

export const addComponent = (component: componentTy) => {
  return {type: AddComponent, component}
}