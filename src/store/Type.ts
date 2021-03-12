import {GlobalDataReducer, ComponentsDataReducer} from './reducer/globalData'
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


export interface Reducers {
  globalData: GlobalDataReducer,
  componentsData: ComponentsDataReducer
}