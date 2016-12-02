import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/line-chart.css'
import {log} from '../../utils'


class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: null
        }
        
    }
    render() {
        if (this.state.chart) {
            this.state.chart.resize(this.state.chart.getOption('width'), this.state.chart.getOption('height'))
        }
        return (
            <div className="chart">                
            </div>
        )
    }
    componentDidMount() {        
        let element = ReactDOM.findDOMNode(this);

        this.state.chart = new Dygraph(element, this.props.data, {})    

    }   
}


export default LineChart