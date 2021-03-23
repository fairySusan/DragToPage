import React from 'react';
import { connector, PropsFromRedux } from './Type'
import { changeStyleWithScale } from 'src/utils/tanslate'
import { componentFactory } from 'src/components/componentFactory'
import GridLine from './GridLine'
import Shape from './Shape'
import ContextMenu from './ContextMenu'

interface Props extends PropsFromRedux {
}

class Editor extends React.Component<Props> {

  handleContextMenu = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    // 计算菜单相对于编辑器的位移
    let target = e.target
    let top = e.nativeEvent.offsetY // offsetY坐标系是target的左上角的坐标系，offsetY是相对与点击目标的
    let left = e.nativeEvent.offsetX
    // 如果右键的是网格区域，那么target取编辑器dom
    while (target instanceof SVGElement) {
      target = target.parentNode as (Node & ParentNode)
    }

    // 如果点击的是组件，获取 相对于编辑器的鼠标的点击位置 = 组件左边距离编辑器的距离 + offsetX
    while (!target.className.includes('editor')) {
      left += target.offsetLeft
      top += target.offsetTop
      target = target.parentNode
    }
    this.props.ShowContextMenu({ top, left})
  }

  render () {
    const { canvasStyle, componentsData, currentComponent, contextMenu } = this.props
    return (
      <div
        className="editor"
        id="editor"
        style={{width: changeStyleWithScale(canvasStyle.width) + 'px', height: changeStyleWithScale(canvasStyle.height) + 'px'}}
        onContextMenu={this.handleContextMenu}
        >
        <GridLine/>
        {
          componentsData.length > 0 && componentsData.map((item, i) => {
            const ChildCom = componentFactory(item.component, item)
            return (
              <Shape
                key={i}
                component={item}
                componentIndex={i}
                active={item.id === currentComponent.id}
              >
                <ChildCom></ChildCom>
              </Shape>
            )
          })
        }

        {
          contextMenu.show && <ContextMenu/>
        }
      </div>
    )
  }
}

export default connector(Editor)