import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from 'src/store'
import { setCurrentComponent } from 'src/store/action/componentAction'
import { componentTy } from 'src/store/reducer/stateType'

const mapState = (state: AppState) => ({
  canvasStyle: state.globalData,
  componentData: state.componentsData,
  currentComponent: state.currentComponent
})

const mapDispatch = (dispatch: Dispatch) => ({
  setCurrentComponent: (component: componentTy) => {dispatch(setCurrentComponent(component))}
})

export const connector = connect(mapState, mapDispatch)

export type PropsFromRedux = ConnectedProps<typeof connector>