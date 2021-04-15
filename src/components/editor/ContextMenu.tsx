import React from 'react'
import { connector, PropsFromRedux } from './Type'
import { componentTy } from 'src/store/reducer/stateType'
import { deepCopy } from 'src/utils/util'
import generateID from 'src/utils/generateID'


interface Props extends PropsFromRedux {}

class ContextMenu extends React.Component<Props> {

  onCopy = () => {
    const { AddComponent, currentComponent, setCurrentComponent } = this.props
    const pasteComponent = deepCopy(currentComponent)
    pasteComponent.id = generateID()
    pasteComponent.style.top -= 10
    pasteComponent.style.left += 10
    setCurrentComponent(pasteComponent)
    AddComponent(pasteComponent as componentTy)
    // 记录快照
    this.props.RecordSnapshot()
  }

  onDelete = () => {
    const {DeleteComponent, currentComponent} = this.props
    DeleteComponent(currentComponent as componentTy)
    // 记录快照
    this.props.RecordSnapshot()
  }

  onUpLayer = () => {
    this.props.UpLayer()
  }

  onDownLayer = () => {
    this.props.DownLayer()
  }

  onUpTop = () => {
    this.props.UpTop()
  }

  onDownBottom = () => {
    this.props.DownBottom()
  }

  render () {
    const { top:menuTop, left:menuLeft } = (this.props.contextMenu as {left: number; top: number; show: boolean})
    return (
      <div
        className="contextmenu"
        style={{top: menuTop + 'px', left: menuLeft + 'px'}}
      >
        <ul>
          <li onClick={this.onCopy}>复制</li>
          <li onClick={this.onDelete}>删除</li>
          <li>锁定</li>
          <li onClick={this.onUpTop}>置顶</li>
          <li onClick={this.onDownBottom}>置底</li>
          <li onClick={this.onUpLayer}>上移图层</li>
          <li onClick={this.onDownLayer}>下移图层</li>
        </ul>
      </div>
    )
  }
}

export default connector(ContextMenu)