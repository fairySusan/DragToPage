import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from 'src/store'
import { setCurrentComponent, updateComponent, addComponent, deleteComponent } from 'src/store/action/componentAction'
import { showContextMenuAction, hideContextMenuAction } from 'src/store/action/contextMenuAction'
import { componentTy } from 'src/store/reducer/stateType'
import { recordSnapshot, redo, undo } from 'src/store/action/snapshotAction'

const mapState = (state: AppState) => ({
  canvasStyle: state.globalData,
  componentsData: state.componentsData,
  currentComponent: state.currentComponent,
  contextMenu: state.contextMenuDisplay
})

const mapDispatch = (dispatch: Dispatch) => ({
  setCurrentComponent: (component: componentTy) => {dispatch(setCurrentComponent(component))},
  UpdateComponent: (component: componentTy) => {dispatch(updateComponent(component))},
  AddComponent: (component: componentTy) => {dispatch(addComponent(component))},
  DeleteComponent: (component: componentTy) => {dispatch(deleteComponent(component))},
  ShowContextMenu: (position: { left: number; top: number}) => {dispatch(showContextMenuAction(position))},
  HideContextMenu: () => { dispatch(hideContextMenuAction())},
  RecordSnapshot: () => {dispatch(recordSnapshot())}

})

export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>