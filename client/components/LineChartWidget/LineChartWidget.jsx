import '../../styles/line-chart-widget.css'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {log} from '../../utils'
import LineChartAxes from './LineChartAxes'
import LineChartGroups from './LineChartGroups'
import Scroller from './Scroller'
import historyService from '../../services/historyService'
import ZoomInButton from '../Buttons/ZoomInButton'
import ZoomOutButton from '../Buttons/ZoomOutButton'

class LineChartWidget extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            zoom: 0,           
            totalRecords: 0,
            groups: []
        }
    }

    render() {

        const {width, height} = this.props;
        const groups = this.state.groups;
        const style = {width, height}
        const   totalRecords = 1000000,                
                recordsAtZoom = totalRecords / (Math.pow(2, this.state.zoom)),
                records = Math.min(recordsAtZoom, width),
                fraction = recordsAtZoom / records;
                log({
                    'Zoom': this.state.zoom,
                    'Records at zoom: ': recordsAtZoom,
                    'Records': records,
                    'Fraction': fraction
                })


        return (
            <div className="line-chart-container" style={style}>
                <div className="line-chart-inner">
                    <ZoomInButton onClick={this.zoom.bind(this, -1)}/>
                    <ZoomOutButton onClick={this.zoom.bind(this, 1)}/>
                   
                    <LineChartAxes groups={groups}/>
                    <LineChartGroups groups={groups}/> 
                    <Scroller 
                        width={width} 
                        height={height} 
                        factor={fraction} 
                        orientation="horizontal"
                        onScroll={this.onScroll.bind(this, records)}/>
                </div>
            </div>
        )
    }
    onScroll(count, offset) {
        historyService(this.state.zoom, offset, count)
            .then(result => {

                 this.setState({
                    totalRecords: result.totalRecords,
                    groups: result.groups,
                    offset: offset,
                    count: count
                })
            })
    }  
    zoom(value) {      
        let zoom = Math.max(0, Math.min(this.state.zoom + value, 100))
        historyService(zoom, this.state.offset, this.state.count)
            .then(result => {

                 this.setState({
                    totalRecords: result.totalRecords,
                    groups: result.groups,
                    zoom: zoom
                })
            })

    }      
      
}


export default LineChartWidget