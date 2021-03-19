import { ShowContextMenu } from '../constant'

export const showContextMenuAction = (position: { left: number; top: number}) => {
  return { type: ShowContextMenu, position}
}

