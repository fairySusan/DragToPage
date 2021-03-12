import React from'react'
import { componentTy } from 'src/store/reducer/stateType'

interface Props {
  config: componentTy
}

export default class Shape extends React.Component<Props> {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}