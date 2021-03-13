import React from'react'
import { connect, ConnectedProps } from 'react-redux'
import { componentTy } from 'src/store/reducer/stateType'
import { PropsFromRedux, connector } from './Type'

interface Props extends PropsFromRedux {
  config: componentTy,
  active: boolean,
  children: JSX.Element
}

interface State {
  active: boolean
}

class Shape extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props)
  }

  getShapeStyle = (style: any) => {
    const result: any = {};
    ['width', 'height', 'top', 'left', 'rotate'].forEach(attr => {
        if (attr != 'rotate') {
            result[attr] = style[attr] + 'px'
        } else {
            result.transform = 'rotate(' + style[attr] + 'deg)'
        }
    })

    return result
  }

  handleMouseDownOnShape = () => {
    this.props.setCurrentComponent(this.props.config)
  }


  render () {
    const { config, active } = this.props
    return (
      <div
        className={["iconfont ",active ?'active' :'' ].join('')}
        style={this.getShapeStyle(config.style)} 
        onMouseDown={this.handleMouseDownOnShape}
      >
        {this.props.children}
      </div>
    )
  }
}

export default connector(Shape)