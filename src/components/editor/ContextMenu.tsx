import React from 'react'
import { connector, PropsFromRedux } from './Type'

interface Props extends PropsFromRedux {}

class ContextMenu extends React.Component<Props> {
  render () {
    const { top:menuTop, left:menuLeft } = (this.props.contextMenu as {left: number; top: number; show: boolean})
    return (
      <div
        className="contextmenu"
        style={{top: menuTop + 'px', left: menuLeft + 'px'}}
      >
        <ul>
          <li>复制{menuTop}</li>
          <li>粘贴{menuLeft}</li>
          <li>剪切</li>
          <li>删除</li>
          <li>锁定</li>
          <li>置顶</li>
          <li>置底</li>
          <li>上移</li>
          <li>下移</li>
        </ul>
      </div>
    )
  }
}

export default connector(ContextMenu)