import React from 'react'

interface Props {
  style: any;
  propValue: any
}

export default class VButton extends React.Component<Props> {
  render () {
    const { style, propValue} = this.props
    return (
      <button className="v-button" style={style}>{propValue}</button>
    )
  }
}