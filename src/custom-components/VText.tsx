import React from 'react'
import { componentTy } from 'src/store/reducer/stateType'
interface Props {
  style: any;
  propValue: any
}
export default class VText extends React.Component<Props> {
  render () {
    const { style,  propValue} = this.props
    return (
      <div style={style}>{propValue}</div>
    )
  }
}