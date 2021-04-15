import { componentTy } from '../reducer/stateType'
import { 
  AddComponent,
  SetCurrentComponent, 
  SetCurrentComponentStyle,
  UpdateComponent,
  ClearAllComponent,
  DeleteComponent,
  SetAllComponent,
  SetCurrentComponentIndex,
  SetCurrComSingleStyle
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

export const setCurrComponentSingleStyle = (key: string, value: number | string) => {
  return {type: SetCurrComSingleStyle, key, value}
}

export const clearAllComponent = () => {
  return {type: ClearAllComponent}
}

export const deleteComponent = (component: componentTy) => {
  return {type: DeleteComponent, component}
}

export const setAllComponents = (components: componentTy[]) => {
  return {type: SetAllComponent, components}
}

export const setCurrentComponentIndex = (currentComponentIndex: number) => {
  return {type: SetCurrentComponentIndex, currentComponentIndex}
}