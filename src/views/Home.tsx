import React from 'react'
import { Tabs } from 'antd';
import ToolBar from 'src/components/ToolBar'
import Editor from 'src/components/editor/Editor'
import ComponentList from 'src/components/componentList'
import componentList from 'src/custom-components/component-list'
import { deepCopy } from 'src/utils/util'
import generateID from 'src/utils/generateID'
import { connector, PropsFromRedux } from './Type'

const { TabPane } = Tabs;

interface Props extends PropsFromRedux {
}

class Home extends React.Component<Props> {

  handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const i: number = parseInt(e.dataTransfer.getData('index'))
    const component = deepCopy(componentList[i])
    component.style.top = e.nativeEvent.offsetY
    component.style.left = e.nativeEvent.offsetX
    component.id = generateID()
    this.props.addComponent(component)
    // 记录快照
    this.props.RecordSnapshot()
  }

  handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  deSelectCurrComponent = (e: React.MouseEvent) => {
    if (e.button !== 2) {
      this.props.HideContextMenu()
    }
  }

  render () {
    return (
      <div className="home">
        <ToolBar></ToolBar>
        <main>
          {/* 左侧组件列表 */}
          <section className="left">
            <ComponentList/>
          </section>
          {/* 中间画布*/}
          <section className="center">
            <div
              className="content"
              onDrop={this.handleDrop}
              onDragOver={this.handleDragOver}
              onClick={this.deSelectCurrComponent}
            >
              <Editor/>
            </div>
          </section>
          {/* 右侧属性列表 */}
          <section className="right">
            <Tabs defaultActiveKey="1">
              <TabPane tab="属性" key="1">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="动画" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="事件" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </section>
        </main>
      </div>
    )
  }
}

export default connector(Home)