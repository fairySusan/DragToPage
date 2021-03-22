import { RecordSnapshot, Undo, Redo } from '../constant'
import { componentTy } from '../reducer/stateType'

export const recordSnapshot = (components: componentTy[], snapshotIndex: number) => {
  return { type: RecordSnapshot, components, snapshotIndex }
}

export const undo = () => {
  return { type: Undo}
}

export const redo = () => {
  return { type: Redo}
}