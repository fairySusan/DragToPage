import { RecordSnapshot, Undo, Redo } from '../constant'
import { Dispatch } from 'redux'
import { setAllComponents } from '../action/componentAction'
import { deepCopy } from 'src/utils/util'
import { AppState } from '..'


export const recordSnapshot = () => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const { componentsData } = getState()
    dispatch({ type: RecordSnapshot, components: componentsData })
  }
}

export const undo = () => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const { snapshotData } = getState()
    if (snapshotData.snapshotIndex > 0) {
      dispatch(setAllComponents(deepCopy(snapshotData.components[snapshotData.snapshotIndex - 1])))
      dispatch({ type: Undo })
    }
  }
}

export const redo = () => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const { snapshotData } = getState()
    if (snapshotData.snapshotIndex < snapshotData.components.length - 1) {
      dispatch(setAllComponents(deepCopy(snapshotData.components[snapshotData.snapshotIndex + 1])))
      dispatch({ type: Redo })
    }
  }
}