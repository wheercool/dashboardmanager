import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ReactGridLayout, {WidthProvider} from 'react-grid-layout';
import {trace, log, elementSize} from '../../utils'
import LineChartWidget from '../LineChartWidget/LineChartWidget'

const Layout = WidthProvider(ReactGridLayout);

const Dashboard = React.createClass({    
    render() {

        const btn = (isEditing, id) => {
            return isEditing?<button onClick={this.props.onPanelRemove.bind(this, id)}>Remove</button>: null;
        }
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
            log(this.props.panels[id].width)
            // return this.state.panels[id]? `${this.state.panels[id].width}x${this.state.panels[id].height}`: id;
            return (<LineChartWidget width={this.props.panels[id].width} height={this.props.panels[id].height} groups={groups} /> )
        }

        return (
             <Layout className="layout" 
                layout={this.props.layout}
                 isDraggable={this.props.isEditing} 
                 isResizable={this.props.isEditing} 

                 cols={12} rowHeight={30} width={1200}
                 onResizeStop={this.onResizeStop}              
                 onLayoutChange={this.props.onLayoutChanged}>
                 {
                    this.props.layout.map(d => (<div id={'panel-' + d.i} key={d.i} className="panel">{panelContent('panel-' + d.i)}{btn(this.props.isEditing, d.i)}</div>))
                 }
               
             </Layout>
        )
    },
    onResizeStop(layout, oldItem, newItem, p, e, element) {        
        let panel = element.parentElement,           
            id = 'panel-' + newItem.i,

            placeholderElement = document.querySelector('.react-grid-placeholder');

            this.props.onPanelSizeChanged(id, elementSize(placeholderElement))            
        
    },
    componentDidMount() {
        //We should wait the end of transition animation to get correct width 
        setTimeout(() => {       
            let container = ReactDOM.findDOMNode(this),
                panels = container.children,
                arg = {},
                i, idx;
            for (i = 0; i < panels.length; i++) {
                idx = panels[i].getAttribute('id')   
                arg[idx] = elementSize(panels[i])
            }        
            this.props.onPanelsSizeInit(arg)
        }, 200);

    }  
})

export default Dashboard;
