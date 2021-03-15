import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from 'src/store'
import { canvasStyleInterface } from 'src/store/Type'
import { changeCanvasStyleAction } from 'src/store/action/canvasAction'
import { clearAllComponent } from 'src/store/action/componentAction'

const mapState = (state: AppState) => ({
  canvasStyle: state.globalData
})

const mapDispatch = (dispatch: Dispatch) => ({
  changeCanvasStyle: (canvasStyle: canvasStyleInterface) => {dispatch(changeCanvasStyleAction(canvasStyle))},
  clearAllComponent: () => {dispatch(clearAllComponent())}
})

export const connector = connect(mapState, mapDispatch)


export type PropsFromRedux = ConnectedProps<typeof connector>
