import { DefaultRootState } from 'react-redux'
import {GlobalDataReducer, ComponentsDataReducer, CurrentComponentReducer} from './reducer/globalData'
import { componentTy } from './reducer/stateType'
export interface canvasStyleInterface {
  width: string;
  height: string;
  scale: string;
}

export interface globalDataAction {
  type: string;
  canvasStyleData: canvasStyleInterface
}

export interface componentDataAction {
  type: string;
  component: componentTy
}

export interface currentComponentAction extends componentDataAction {}


export interface Reducers {
  globalData: GlobalDataReducer,
  componentsData: ComponentsDataReducer,
  currentComponent: CurrentComponentReducer
}