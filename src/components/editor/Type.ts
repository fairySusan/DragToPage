import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from 'src/store'

const mapState = (state: AppState) => ({
  canvasStyle: state.globalData,
  componentData: state.componentsData
})

const mapDispatch = (dispatch: Dispatch) => ({
})

export const connector = connect(mapState, mapDispatch)

export type connectedProps =  ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>