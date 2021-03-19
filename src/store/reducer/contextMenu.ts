import { ShowContextMenu, HideContextMenu } from '../constant'
import { showContextMenuAction } from '../Type'
export const contextMenuDisplay = (state = { show: false }, action: showContextMenuAction) => {
  switch (action.type) {
    case ShowContextMenu:
      return { show: true, ...action.position}
    case HideContextMenu:
      return { show: false }
    default:
      return state
  }
}

export type contextMenuDisplayReducer = ReturnType<typeof contextMenuDisplay>