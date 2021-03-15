import { componentTy } from './stateType'
import { 
  ChangeCanvasStyle,
  AddComponent,
  SetCurrentComponent,
  SetCurrentComponentStyle,
  UpdateComponent,
  ClearAllComponent
} from '../constant'
import { 
  globalDataAction,
  canvasStyleInterface,
  componentDataAction,
  currentComponentAction
} from '../Type'

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
      if (action.component) {
        return [action.component,...state]
      }
      return [...state]
    case UpdateComponent:
      const i =state.findIndex((item) => item.id === (action.component as componentTy).id)
      state[i] = action.component as componentTy
      return [...state]
    case ClearAllComponent:
      return []
    default:
      return state
  }
}

export const currentComponent = (state: componentTy | {id: -1} = {id: -1}, action: currentComponentAction) => {
  switch (action.type) {
    case SetCurrentComponent:
      return action.component
    case SetCurrentComponentStyle:
      return { ...action.component }
    default:
      return state
  }
}

export type GlobalDataReducer = ReturnType<typeof globalData>

export type ComponentsDataReducer = ReturnType<typeof componentsData>

export type CurrentComponentReducer =  ReturnType<typeof currentComponent>