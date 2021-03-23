import {contextMenuDisplayReducer} from './reducer/contextMenu'
import { componentTy } from './reducer/stateType'
import {
  GlobalDataReducer,
  ComponentsDataReducer,
  CurrentComponentReducer,
  CurrentComIndexReducer
} from './reducer/globalData'
import { SnapshotDataReducer } from './reducer/snapshotData'

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

export interface componentDataClearAction {
  type: string;
}
export interface setAllComponentAction {
  type: string;
  components: componentTy[]
}

export interface RecordSnapshotAction {
  type: string;
  components?: componentTy[]
}

export interface currentComponentIndexAction {
  type: string;
  currentComponentIndex: number
}

export type componentDataActionTy = componentDataAction | componentDataClearAction | setAllComponentAction

export interface currentComponentAction {
  type: string;
  component: componentTy
}

export interface showContextMenuAction {
  type: string;
  position?: ContextMenuPosition
}

export interface ContextMenuPosition {
  left: number;
  top: number;
}



export interface Reducers {
  globalData: GlobalDataReducer,
  componentsData: ComponentsDataReducer,
  currentComponent: CurrentComponentReducer,
  contextMenuDisplay: contextMenuDisplayReducer,
  snapshotData: SnapshotDataReducer,
  currentComponentIndex: CurrentComIndexReducer
}