import { componentTy } from './stateType'
import { 
  ChangeCanvasStyle,
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
import { 
  globalDataAction,
  canvasStyleInterface,
  componentDataAction,
  currentComponentAction,
  setAllComponentAction,
  componentDataActionTy,
  currentComponentIndexAction,
  currentComponentActionTy,
  currComponentSingleAction
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

export const componentsData = (state: componentTy[] = [], action: componentDataActionTy) => {
  switch (action.type) {
    case AddComponent: 
      if ((action as componentDataAction).component) {
        return [(action as componentDataAction).component,...state]
      }
      return [...state]

    case UpdateComponent:
      const i =state.findIndex((item) => item.id === ((action as componentDataAction).component as componentTy).id)
      state[i] = (action as componentDataAction).component as componentTy
      return [...state]

    case ClearAllComponent:
      return []

    case DeleteComponent:
      const j =state.findIndex((item) => item.id === ((action as componentDataAction).component as componentTy).id)
      state.splice(j, 1)
      return [...state]

    case SetAllComponent:
      return (action as setAllComponentAction).components

    default:
      return state
  }
}

export const currentComponent = (state: componentTy | {id: -1} = {id: -1}, action: currentComponentActionTy) => {
  switch (action.type) {
    case SetCurrentComponent:
      return (action as currentComponentAction).component
    case SetCurrentComponentStyle:
      return { ...(action as currentComponentAction).component }
    case SetCurrComSingleStyle:
      (state as componentTy).style[(action as currComponentSingleAction).key] = (action as currComponentSingleAction).value
      return { ...state }
    default:
      return state
  }
}

export const currentComponentIndex = (state = -1, action: currentComponentIndexAction) => {
  switch (action.type) {
    case SetCurrentComponentIndex:
      return action.currentComponentIndex
    default:
      return state
  }
}

export type GlobalDataReducer = ReturnType<typeof globalData>

export type ComponentsDataReducer = ReturnType<typeof componentsData>

export type CurrentComponentReducer =  ReturnType<typeof currentComponent>

export type CurrentComIndexReducer = ReturnType<typeof currentComponentIndex>