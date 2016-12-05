import React, { Component } from 'react';
import Dashboard from '../Dashboard/Dashboard'
import {trace, log, copy, copyList} from '../../utils'

class DashboardManager extends Component {
  constructor(props) {
    super(props);
    
    var layout = [
          {i: "panel-0", x: 0, y: 0, w: 6, h: 12},
          {i: "panel-1", x: 7, y: 0, w: 6, h: 12},
          {i: "panel-2", x: 0, y: 1, w: 12, h: 12}
        ];
    this.state = {
      panels: {},
      editing: false,
      oldPanels: {},
      lastId: layout.length,
      layout: layout,
      oldLayout: copyList(layout)
    };
  }
  render() {  

    const header = !this.state.editing? (<button onClick={this.onEdit.bind(this)}>Edit</button>  ): (
        <div>
          <button onClick={this.onAdd.bind(this)}>Add</button>
          <button onClick={this.onSave.bind(this)}>OK</button>
          <button onClick={this.onCancel.bind(this)}>Cancel</button>
        </div>);

    return (
      <div className="main-panel">
        <div className="panel-header">
              {header}    
        </div>
        <div className="panel-body">
          <Dashboard 
              layout={this.state.layout} 
              panels={this.state.panels}
              isEditing={this.state.editing} 
              onLayoutChanged={this.onLayoutChanged.bind(this)}
              onPanelRemove={this.onRemove.bind(this)}              
              onPanelSizeChanged={this.onPanelSizeChanged.bind(this)}
              onPanelsSizeInit={this.onPanelsSizeInit.bind(this)}/>
        </div>
      </div>
    );
  }

   onPanelSizeChanged(panelId, size) {        
      this.state.panels[panelId] = size;
      this.setState({
        panels: this.state.panels
      })
   }

   onPanelsSizeInit(panels) {     
      this.setState({
          panels: panels,
          oldPanels: copy(panels)
      })
   }

  onRemove(id) {
    debugger;

    this.setState({
      layout: this.state.layout.filter(d => d.i != id)
    })
  }

  onLayoutChanged(newLayout) {           
      this.setState({
        layout: newLayout        
      })
  }

  onAdd() {
    this.state.layout.push({i: "panel-" + (this.state.lastId++).toString(), x: 0, y: 6, w: 12, h:12 })
    this.setState({
      layout: this.state.layout
    })
  }

  onEdit() {
    this.setState({
      oldLayout: copyList(this.state.layout),
      oldPanels: copy(this.state.panels),
      editing: true
    })
  }

  onSave() {    
    this.setState({      
      editing: false
    })
  }
  onCancel() {    
    this.setState({
      editing: false,
      layout: this.state.oldLayout,
      panels: this.state.oldPanels
    })
  }
}

// MainPanel.defaultProps = {
//   items: []
// };

export default DashboardManager;
