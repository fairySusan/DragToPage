import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from 'src/store'
import { setCurrentComponent, updateComponent } from 'src/store/action/componentAction'
import { showContextMenuAction } from 'src/store/action/contextMenuAction'
import { componentTy } from 'src/store/reducer/stateType'

const mapState = (state: AppState) => ({
  canvasStyle: state.globalData,
  componentsData: state.componentsData,
  currentComponent: state.currentComponent,
  contextMenu: state.contextMenuDisplay
})

const mapDispatch = (dispatch: Dispatch) => ({
  setCurrentComponent: (component: componentTy) => {dispatch(setCurrentComponent(component))},
  UpdateComponent: (component: componentTy) => {dispatch(updateComponent(component))},
  ShowContextMenu: (position: { left: number; top: number}) => {dispatch(showContextMenuAction(position))}
})

export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>