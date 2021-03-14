import { componentTy } from '../reducer/stateType'
import { 
  AddComponent,
  SetCurrentComponent, 
  SetCurrentComponentStyle,
  UpdateComponent
} from '../constant'

export const addComponent = (component: componentTy) => {
  return {type: AddComponent, component}
}

export const updateComponent = (component: componentTy) => {
  return {type: UpdateComponent, component}
}

export const setCurrentComponent = (component: componentTy) => {
  return {type: SetCurrentComponent, component}
}

export const setCurrentComponentStyle = (component: componentTy) => {
  return {type: SetCurrentComponentStyle, component}
}
