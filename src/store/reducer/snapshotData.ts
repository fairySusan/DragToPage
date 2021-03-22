import { componentTy } from './stateType'
import { Undo, Redo, RecordSnapshot } from '../constant'
import { store } from '../index'
import { deepCopy } from 'src/utils/util'
import { setAllComponents } from '../action/componentAction'
import { RecordSnapshotAction } from '../Type'

interface SnapshotState {
  snapshotIndex: number;
  components: componentTy[][]
}

const initState = {
  snapshotIndex: -1,
  components: []
}

export const snapshotData = (state: SnapshotState = initState, action: RecordSnapshotAction) => {
  switch (action.type) {
    case RecordSnapshot:
      state.components[++action.snapshotIndex] = deepCopy(action.components)
      return { ...state }
    case Undo:
      if (state.components.length > 0) {
        const { components, snapshotIndex } = state
        const i = snapshotIndex - 1
        store.dispatch(setAllComponents(deepCopy(components[i])))
        return { snapshotIndex: i, components: state.components }
      }
      return state
    case Redo:
      const {components, snapshotIndex} = state
      if (snapshotIndex < state.components.length - 1) {
        const i = snapshotIndex + 1
        store.dispatch(setAllComponents(deepCopy(components[i])))
        return { snapshotIndex: i,  components: state.components}
      }
      return state
    default:
      return state

  }
}

export type SnapshotDataReducer = ReturnType<typeof snapshotData>
