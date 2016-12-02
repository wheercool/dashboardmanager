import '../../styles/line-chart-widget.css'
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {log} from '../../utils'
import LineChartAxes from './LineChartAxes'
import LineChartGroups from './LineChartGroups'
import Scroller from './Scroller'

class LineChartWidget extends Component {  
    render() {

        const {width, height, groups} = this.props;
        const style = {width, height}

        return (
            <div className="line-chart-container" style={style}>
                <div className="line-chart-inner">
                    <LineChartAxes groups={groups}/>
                    <LineChartGroups groups={groups}/> 
                    <Scroller width={width} height={height} factor={1000} orientation="horizontal"/>
                </div>
            </div>
        )
    }   
}


export default LineChartWidget