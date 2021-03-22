import React, { MouseEventHandler } from'react'
import { RedoOutlined } from '@ant-design/icons'
import { componentTy } from 'src/store/reducer/stateType'
import { PropsFromRedux, connector } from './Type'

interface Props extends PropsFromRedux {
  component: componentTy,
  active: boolean,
  children: JSX.Element
}

interface State {
  pointList: string[]
}

class Shape extends React.Component<Props, State> {

  directionKey: {[k: string]: string} = {
    lt: 'nw',
    t: 'n',
    rt: 'ne',
    r: 'e',
    rb:'se',
    b: 's',
    lb: 'sw',
    l: 'w'
  }

  constructor (props: Props) {
    super(props)
    this.state = {
      pointList: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']
    }
  }

  getShapeStyle = (style: any) => {
    const result: any = {};
    ['width', 'height', 'top', 'left', 'rotate'].forEach(attr => {
        if (attr !== 'rotate') {
            result[attr] = style[attr] + 'px'
        } else {
            result.transform = 'rotate(' + style[attr] + 'deg)'
        }
    })
    return result
  }

  getPointStyle = (point: string) => {
    const { width, height } = this.props.component.style
    const hasL = /l/.test(point)
    const hasR = /r/.test(point)
    const hasT = /t/.test(point)
    const hasB = /b/.test(point)

    let top = 0
    let left = 0

    // 如果是四个角上的点
    if (point.length === 2) {
      top = hasT ? 0 : height
      left = hasL ? 0 : width
    } else {
      // 中间两个点
      if (hasT || hasB) {
        top = hasT ? 0 : height
        left = width / 2
      }

      // 左右两边的点
      if (hasL || hasR) {
        top = height / 2
        left = hasL ? 0 : width
      }
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
      cursor: point.split('').reverse().map((m: string) => this.directionKey[m]).join('') + '-resize',
    }
  }

  // 实现设置当前选中的组件和移动组件
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
      // 记录快照
      this.props.RecordSnapshot()
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  // 实现拖动小圆点改变组件的大小
  handleMouseDownOnPoint = (point: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const { component } = this.props
    const { style } = component
    const { width, height, top, left } =  style
    const startX = e.clientX
    const startY = e.clientY
    const move = (ev: any) => {
      const currX = ev.clientX
      const currY = ev.clientY

      const offsetX = currX - startX
      const offsetY = currY - startY

      const hasT = /t/.test(point)
      const hasB = /b/.test(point)
      const hasL = /l/.test(point)
      const hasR = /r/.test(point)

      const newH = height + (hasT ? -offsetY : (hasB ? offsetY : 0))
      const newW = width + (hasL ? -offsetX : (hasR ? offsetX : 0))

      style.width = newW > 0 ? newW : 0
      style.height = newH > 0 ? newH : 0

      style.top = top + (hasT ? offsetY : 0)
      style.left = left + (hasL ? offsetX : 0)

      this.props.UpdateComponent(component)
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  // 处理旋转事件
  handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation()
    // 初始坐标和初始角度
    const { component } = this.props
    const { style } = component
    const startRotate =  style.rotate
    const startX = e.clientX
    const startY = e.clientY

    // 获取元素中心点相对于视窗？？位置
    const el: HTMLElement | null = document.getElementById('shape-id')
    const react = (el as HTMLElement).getBoundingClientRect()
    const centerX = (react.right + react.x) / 2
    const centerY = (react.bottom + react.y) / 2

     // 旋转前的角度(没懂)
     const rotateDegreeBefore = Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)

    const move = (ev: any) => {
      const currX = ev.clientX
      const currY = ev.clientY

      // 旋转后的角度，Math.atan2a返回的是弧度，需要转化为角度
      const rotateDegreeAfter = Math.atan2(currY - centerY, currX - centerX) / (Math.PI / 180)

      // 获取旋转的角度值
      style.rotate = startRotate + rotateDegreeAfter - rotateDegreeBefore

      this.props.UpdateComponent(component)
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  onHideContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.HideContextMenu()
  }


  render () {
    const { component, active } = this.props
    const { pointList } = this.state
    return (
      <div
        className={['shape ', active ?'active' :'' ].join('')}
        style={this.getShapeStyle(component.style)}
        onMouseDown={this.handleMouseDownOnShape}
        onClick={this.onHideContextMenu}
        id="shape-id"
      >
        {
          active &&
          <RedoOutlined
            className="icon-xiangyouxuanzhuan"
            onMouseDown={this.handleRotate}
          />
        }
        {
          active && pointList.map((dot, i) => (
            <div
              key={i}
              className="shape-point"
              style={this.getPointStyle(dot)}
              onMouseDown={(e: React.MouseEvent) => this.handleMouseDownOnPoint(dot, e)}
            ></div>
          ))
        }
        {this.props.children}
      </div>
    )
  }
}

export default connector(Shape)