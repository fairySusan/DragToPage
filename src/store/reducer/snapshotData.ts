import { componentTy } from './stateType'
import { Undo, Redo, RecordSnapshot } from '../constant'
import { deepCopy } from 'src/utils/util'
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
      state.components[++state.snapshotIndex] = deepCopy(action.components)
      return { ...state }
    
    case Undo:
      return { snapshotIndex: state.snapshotIndex - 1, components: state.components }
    case Redo:
      const {components, snapshotIndex} = state
      return { snapshotIndex: snapshotIndex + 1,  components: components}

    default:
      return state

  }
}

export type SnapshotDataReducer = ReturnType<typeof snapshotData>
