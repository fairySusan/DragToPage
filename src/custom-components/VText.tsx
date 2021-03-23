import React from 'react'
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