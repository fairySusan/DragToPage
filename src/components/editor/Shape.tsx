import React, {MouseEvent} from'react'
import { connect, ConnectedProps } from 'react-redux'
import { componentTy } from 'src/store/reducer/stateType'
import { PropsFromRedux, connector } from './Type'

interface Props extends PropsFromRedux {
  component: componentTy,
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

  handleMouseDownOnShape = (e: React.MouseEvent) => {
    const { component } = this.props
    const { style } = component
    this.props.setCurrentComponent(component)

    const startY = e.clientY
    const startX = e.clientX

    const startTop = style.top
    const startLeft = style.left

    const move = (ev: any) => { // 这个地方我不知道设置什么类型
      const curX = ev.clientX
      const curY = ev.clientY

      style.top = curY - startY + startTop
      style.left = curX - startX + startLeft

      this.props.UpdateComponent(component)
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }


  render () {
    const { component, active } = this.props
    console.log('renbbbb')
    return (
      <div
        className={['shape ', active ?'active' :'' ].join('')}
        style={this.getShapeStyle(component.style)}
        onMouseDown={this.handleMouseDownOnShape}
      >
        {this.props.children}
      </div>
    )
  }
}

export default connector(Shape)