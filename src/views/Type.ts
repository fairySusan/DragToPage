import { connect, ConnectedProps } from 'react-redux'
import { Dispatch, Action } from 'redux'
import { AppState } from 'src/store'
import { ThunkDispatch } from 'redux-thunk'
import { addComponent } from 'src/store/action/componentAction'
import { hideContextMenuAction } from 'src/store/action/contextMenuAction'
import { componentTy } from 'src/store/reducer/stateType'
import { recordSnapshot } from 'src/store/action/snapshotAction'


const mapState = (state: AppState) => ({
})

type ThunkDispatchTy = ThunkDispatch<AppState, void, Action>


const mapDispatch = (dispatch: Dispatch | ThunkDispatchTy) => ({
  addComponent: (component: componentTy) => {(dispatch as Dispatch)(addComponent(component))},
  HideContextMenu: () => {(dispatch as Dispatch)(hideContextMenuAction())},
  RecordSnapshot: () => {(dispatch as ThunkDispatchTy)(recordSnapshot())}
})

export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>