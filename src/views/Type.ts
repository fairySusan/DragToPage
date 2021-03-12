import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { AppState } from 'src/store'
import { addComponent } from 'src/store/action/componentAction'
import { componentTy } from 'src/store/reducer/stateType'

const mapState = (state: AppState) => ({
})

const mapDispatch = (dispatch: Dispatch) => ({
  addComponent: (component: componentTy) => {dispatch(addComponent(component))}
})

export const connector = connect(mapState, mapDispatch)

export type connectedProps =  ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>