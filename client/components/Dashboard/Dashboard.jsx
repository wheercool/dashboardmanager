import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ReactGridLayout, {WidthProvider} from 'react-grid-layout';
import {trace, log, elementSize} from '../../utils'
import LineChartWidget from '../LineChartWidget/LineChartWidget'
import WidgetPanel from '../WidgetPanel/WidgetPanel'

const Layout = WidthProvider(ReactGridLayout);

const widgetSize = (el) => {
    const headerSize = 41;
    const scrollHeight = 20;
    var size = elementSize(el);

    return  {
        width: size.width,
        height: size.height - headerSize - scrollHeight
    }
}

/*
    Дашборд - контейнер для панелей виджетов
    Ответсвенность: расположение панелей виджетов, 
    а также инъекция необходимых виджетов в панели
*/
const Dashboard = React.createClass({    
    render() {
        const groups = [{
            channels: [{
                name: 'Pressure',
                minValue: 10,
                maxValue: 20,
                color: 'red',
                measure: 'Pa'
            }, {
                name: 'M',
                minValue: 10,
                maxValue: 20,
                color: 'green',
                measure: 'Pa'
            }, {
                name: 'M',
                minValue: 10,
                maxValue: 20,
                color: 'brown',
                measure: 'Pa'
            }]
        }, 
        {
            channels: [{
                name: 'Temperature',
                minValue: 10,
                maxValue: 20,
                color: 'blue',
                measure: 'C'
            }]
        }]
        const panelContent = (id) => {
            if (!this.props.panels[id]) return null;
            
            // return this.state.panels[id]? `${this.state.panels[id].width}x${this.state.panels[id].height}`: id;
            return (<LineChartWidget width={this.props.panels[id].width} height={this.props.panels[id].height} groups={groups} /> )
        }

        const {isEditing, layout, onPanelRemove} = this.props;
        return (
             <Layout className="layout" 
                layout={layout}
                 isDraggable={isEditing} 
                 isResizable={isEditing} 

                 cols={12} rowHeight={30} width={1200}
                 onResizeStop={this.onResizeStop}              
                 onLayoutChange={this.props.onLayoutChanged}>
                 {
                    this.props.layout.map(d => 
                        (<WidgetPanel 
                            id={d.i} 
                            title="History Data" key={d.i} 
                            className="panel" 
                            isEditing={isEditing}
                            onPanelRemove={onPanelRemove}>
                                {panelContent(d.i)}
                        </WidgetPanel>))
                 }               
            </Layout>
        )
    },
    onResizeStop(layout, oldItem, newItem, p, e, element) {        
        let panel = element.parentElement,           
            id = newItem.i,

            placeholderElement = document.querySelector('.react-grid-placeholder');

            this.props.onPanelSizeChanged(id, widgetSize(placeholderElement))            
        
    },
    componentDidMount() {
        //We should wait the end of transition animation to get correct width 
        setTimeout(() => {       
            let container = ReactDOM.findDOMNode(this),
                panels = container.children,
                arg = {},
                i, idx, size;            

            for (i = 0; i < panels.length; i++) {                
                idx = panels[i].getAttribute('id');
                
                arg[idx] = widgetSize(panels[i])
            }        
            this.props.onPanelsSizeInit(arg)
        }, 200);

    }  
})

export default Dashboard;
