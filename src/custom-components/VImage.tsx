import React from 'react'
import titleImg from 'src/assets/img/title.jpg'

interface Props {
  style: any;
  propValue: any
}

export default class VImage extends React.Component<Props> {
  render () {
    const {style,  propValue} = this.props
    return (
      <img className="vImage" style={style} src={titleImg} alt="title"></img>
    )
  }
}