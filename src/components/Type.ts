import { connect, ConnectedProps } from 'react-redux'
import { Action, Dispatch } from 'redux'
import { AppState } from 'src/store'
import { ThunkDispatch } from 'redux-thunk'
import { canvasStyleInterface } from 'src/store/Type'
import { changeCanvasStyleAction } from 'src/store/action/canvasAction'
import { clearAllComponent } from 'src/store/action/componentAction'
import { redo, undo, recordSnapshot } from 'src/store/action/snapshotAction'

const mapState = (state: AppState) => ({
  canvasStyle: state.globalData
})

type ThunkDispatchTy = ThunkDispatch<AppState, void, Action>

const mapDispatch = (dispatch: Dispatch | ThunkDispatchTy) => ({
  changeCanvasStyle: (canvasStyle: canvasStyleInterface) => {(dispatch as Dispatch)(changeCanvasStyleAction(canvasStyle))},
  clearAllComponent: () => {(dispatch as Dispatch)(clearAllComponent())},
  Redo: () => {(dispatch as ThunkDispatchTy)(redo())},
  Undo: () => {(dispatch as ThunkDispatchTy)(undo())},
  RecordSnapshot: () => {(dispatch as ThunkDispatchTy)(recordSnapshot())}
})

export const connector = connect(mapState, mapDispatch)


export type PropsFromRedux = ConnectedProps<typeof connector>
