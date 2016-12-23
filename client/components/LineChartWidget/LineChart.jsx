import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/line-chart.css'
import {log} from '../../utils'
import R from 'ramda'
import {scaleLinear} from 'd3-scale'

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
            this.state.chart.updateOptions({'file': this.props.data})
        }
        return (
            <div className="chart">                
            </div>
        )
    }
    componentDidMount() {        
        let element = ReactDOM.findDOMNode(this);
        const {channels} = this.props;
        const indexBySeries = R.indexBy(R.prop('name'));
        const addPlotter = channel => R.assoc('plotter', function(e) {
            
            var scale = scaleLinear().domain([channel.minValue, channel.maxValue]).range([e.plotArea.h, 0])
            e.points.forEach(function(p) {                
                p.canvasy = scale(p.yval);
            })
            Dygraph.Plotters.linePlotter(e);
        }, channel);

        const  makeSeries = R.pipe(R.map(addPlotter), indexBySeries);       
        // console.log({"test": makeSeries(channels)})
        const getLabels = R.pipe(R.map(R.prop('name')), R.values, R.insert(0, 'Time'));

        // console.log({"lineChartProperties":  series})

        this.state.chart = new Dygraph(element, this.props.data, {
                labels: getLabels(channels),
                axes: {
                        y: {
                            drawAxis: true,                        
                            drawGrid: false,
                            pixelsPerLabel: 60
                        },
                        x: {
                            pixelsPerLabel: 30, 
                            drawAxis: true,
                            drawGrid: true,

                        }                    
            },
            series: makeSeries(channels)
        })    

    }   
}


export default LineChart