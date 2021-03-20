import { ShowContextMenu, HideContextMenu } from '../constant'

export const showContextMenuAction = (position: { left: number; top: number}) => {
  return { type: ShowContextMenu, position}
}

export const hideContextMenuAction = () => {
  return { type: HideContextMenu }
}

