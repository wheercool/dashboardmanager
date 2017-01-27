import React, { Component } from 'react';
import {connect} from 'react-redux'
import Dashboard from '../Dashboard/Dashboard'
import {trace, log, copy, copyList} from '../../utils'
import {addLayoutItem, enterEditMode, cancelEditMode,
        replaceBackupLayout, replaceLayout,
        removeLayoutItem} from '../../actions/dashboard'


/*
  Компонент для создавния дашбордов
  Ответсвенность - редактирование (создание) дашборда. Умеет:
    добавлять новые виджеты, 
    производить настройку виджетов, 
    а также их расположение.
*/
class DashboardManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panels: {},
      oldPanels: {},      
    };
  }
  render() {  
    const {isEditingMode,
          layout, editingLayout,
          onPannelAdd, onPanelRemove,
          onEditModeEnter, onEditModeCancel, onEditModeComplete,
          onLayoutChanged} = this.props

    const header = !isEditingMode? (<button onClick={onEditModeEnter}>Edit</button>  ): (
        <div>          
          <button onClick={onPannelAdd}>Add</button>
          <button onClick={onEditModeComplete}>OK</button>
          <button onClick={onEditModeCancel}>Cancel</button>
        </div>);

    return (
      <div className="main-panel">
        <div className="panel-header">
              {header}    
        </div>
        <div className="panel-body">
          <Dashboard 
              layout={layout}
              panels={this.state.panels} //нужно для того чтобы задавать размеры содержимому панелей
              isEditing={isEditingMode} 
              onLayoutChanged={onLayoutChanged}
              onPanelRemove={onPanelRemove}              
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
}


DashboardManager.propTypes = {
  layout: React.PropTypes.arrayOf(React.PropTypes.shape({ //объект описывающий layout
    i: React.PropTypes.string, //id панели
    x: React.PropTypes.number, //номер колонки (0 - 12)
    y: React.PropTypes.number, //номер строки 
    w: React.PropTypes.number, //ширина в колонках
    h: React.PropTypes.number //высота в колонках
  })),
  isEditingMode: React.PropTypes.bool, //включен ли режим редактирования

  onPannelAdd: React.PropTypes.func, //добавление новой панели
  onPanelRemove: React.PropTypes.func, //добавление новой панели
  onEditModeEnter: React.PropTypes.func, //переход в режим редактирования layout
  onEditModeCancel: React.PropTypes.func, //отмена режима редактирования layout
  onEditModeComplete: React.PropTypes.func, //сохранения результатов редактирования layout
}

const mapStateToProps = (state) => {
  return {
    layout: state.layout,    
    isEditingMode: state.isEditingMode 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPannelAdd: function() {      
      dispatch(addLayoutItem());
    },
    onPanelRemove: function(id) {
      dispatch(removeLayoutItem(id))
    },
    onEditModeEnter: function() {      
      dispatch((dispatch, getState) => {
        const state = getState();
        dispatch(enterEditMode());
        dispatch(replaceBackupLayout(state.layout))       
      })      
    },
    onEditModeCancel: function() {
      dispatch((dispatch, getState) => {
        const state = getState();        
        dispatch(replaceLayout(state.backupLayout))
        dispatch(cancelEditMode());        
      })       
    },
    onEditModeComplete: function() {
      dispatch(cancelEditMode())
    },
    onLayoutChanged: function(newLayout) {
      dispatch(replaceLayout(newLayout))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardManager);
