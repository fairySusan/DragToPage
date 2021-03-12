import { globalDataAction, canvasStyleInterface, componentDataAction } from '../Type'
import { componentTy } from './stateType'
import { ChangeCanvasStyle, AddComponent } from '../constant'

export const globalData = (
  state = {
    width: '1200',
    height: '740',
    scale: '100'}, action: globalDataAction):canvasStyleInterface  => {
    switch (action.type) {
      case ChangeCanvasStyle: 
        return { ...action.canvasStyleData };
      default:
        return state
    }
}

export const componentsData = (state: componentTy[] = [], action:componentDataAction) => {
  switch (action.type) {
    case AddComponent: 
      return [action.component,...state]
    default:
      return state
  }
}

export type GlobalDataReducer = ReturnType<typeof globalData>

export type ComponentsDataReducer = ReturnType<typeof componentsData>