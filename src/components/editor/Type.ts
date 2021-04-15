import { connect, ConnectedProps } from 'react-redux'
import { Dispatch, Action} from 'redux'
import { AppState } from 'src/store'
import { ThunkDispatch } from 'redux-thunk'
import { showContextMenuAction, hideContextMenuAction } from 'src/store/action/contextMenuAction'
import { componentTy } from 'src/store/reducer/stateType'
import { recordSnapshot } from 'src/store/action/snapshotAction'
import { upLayer, downLayer, upTop, downBottom } from 'src/store/action/layerAction'
import {
  setCurrentComponent,
  setCurrentComponentIndex ,
  updateComponent,
  addComponent,
  deleteComponent,
  setCurrComponentSingleStyle
} from 'src/store/action/componentAction'


const mapState = (state: AppState) => ({
  canvasStyle: state.globalData,
  componentsData: state.componentsData,
  currentComponent: state.currentComponent,
  contextMenu: state.contextMenuDisplay
})

type ThunkDispatchTy = ThunkDispatch<AppState, void, Action>

const mapDispatch = (dispatch: Dispatch | ThunkDispatchTy) => ({
  setCurrentComponent: (component: componentTy) => {(dispatch as Dispatch)(setCurrentComponent(component))},
  setCurrentComIndex: (index: number) => {(dispatch as Dispatch)(setCurrentComponentIndex(index))},
  UpdateComponent: (component: componentTy) => {(dispatch as Dispatch)(updateComponent(component))},
  AddComponent: (component: componentTy) => {(dispatch as Dispatch)(addComponent(component))},
  DeleteComponent: (component: componentTy) => {(dispatch as Dispatch)(deleteComponent(component))},
  ShowContextMenu: (position: { left: number; top: number}) => {(dispatch as Dispatch)(showContextMenuAction(position))},
  HideContextMenu: () => {(dispatch as Dispatch)(hideContextMenuAction())},
  RecordSnapshot: () => {(dispatch as ThunkDispatchTy)(recordSnapshot())},
  UpLayer: () => {(dispatch as ThunkDispatchTy)(upLayer())},
  DownLayer: () => {(dispatch as ThunkDispatchTy)(downLayer())},
  UpTop: () => {(dispatch as ThunkDispatchTy)(upTop())},
  DownBottom: () => {(dispatch as ThunkDispatchTy)(downBottom())},
  SetCurrComponentSingleStyle: (key: string, value: number) => {(dispatch as Dispatch)(setCurrComponentSingleStyle(key, value))}
})

export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>