import React, {DragEvent} from 'react'
import componentList from 'src/custom-components/component-list'

export default class ComponentList extends React.Component {
  handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('index', (event.target as any).dataset.index)
  }
  render () {
    return (
      <div onDragStart={this.handleDragStart} className="component-list">
        {
          componentList.map((item, index) => (
            <div key={index} className="list" draggable data-index={index}>
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))
        }
      </div>
    )
  }
}