import {connect} from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from 'src/store'
import { canvasStyleInterface } from 'src/store/Type'
import { changeCanvasStyleAction } from 'src/store/action/canvasAction'

const mapState = (state: AppState) => ({
  canvasStyle: state.globalData
})

const mapDispatch = (dispatch: Dispatch) => ({
  changeCanvasStyle: (canvasStyle: canvasStyleInterface) => {dispatch(changeCanvasStyleAction(canvasStyle))}
})

export const connector = connect(mapState, mapDispatch)
