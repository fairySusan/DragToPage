import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from 'src/store'
import { addComponent } from 'src/store/action/componentAction'
import { hideContextMenuAction } from 'src/store/action/contextMenuAction'
import { componentTy } from 'src/store/reducer/stateType'

const mapState = (state: AppState) => ({
})

const mapDispatch = (dispatch: Dispatch) => ({
  addComponent: (component: componentTy) => {dispatch(addComponent(component))},
  HideContextMenu: () => { dispatch(hideContextMenuAction())}
})

export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>