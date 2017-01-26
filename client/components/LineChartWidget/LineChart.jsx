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
     

      const getY = R.last
      const getYSeries = R.map(getY)
      const getYData = getYSeries//R.pipe(R.map(getXSeries), R.flatten)
      const maximum = R.reduce(R.max, -Infinity)
      const minimum = R.reduce(R.min, Infinity)
      const maxY = R.pipe(getYData, maximum)
      const minY = R.pipe(getYData, minimum)
      const extentX = d => [minY(d), maxY(d)]
        if (this.state.chart) {
            this.state.chart.resize(this.state.chart.getOption('width') - 30, this.state.chart.getOption('height'));
            this.state.chart.updateOptions({
                  'file':  this.props.data,
                  'valueRange': extentX(this.props.data)
                })
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
            const {minValue, maxValue} = channel;
            const getVisiblePoints = R.filter(d => d >= minValue && d <= maxValue);
        // var scale = scaleLinear().domain([channel.minValue, channel.maxValue]).range([e.plotArea.h, 0])
            var scale = scaleLinear().domain([channel.minValue, channel.maxValue]).range([0, e.plotArea.w]);
            // e.points = getVisiblePoints(e.points);
            e.points.forEach(function(p) {
                // p.canvasy = scale(p.yval);
                p.canvasx = scale(p.xval);
            });
            Dygraph.Plotters.linePlotter(e);
        }, channel);

        const  makeSeries = R.pipe(R.map(addPlotter), indexBySeries);       
        // console.log({"test": makeSeries(channels)})
        const getLabels = R.pipe(R.map(R.prop('name')), R.values, R.insert(0, 'Time'));

        // console.log({"lineChartProperties":  series})

        this.state.chart = new Dygraph(element, this.props.data, {
                labels: getLabels(channels),
                dateWindow: [0, 1], //x-axis range
                axes: {
                        y: {
                            drawAxis: true,                        
                            drawGrid: false,
                            pixelsPerLabel: 60,
                            // valueRange: [1, 111]
                        },
                        x: {
                            connectSeparatedPoints: true,
                            pixelsPerLabel: 30, 
                            drawAxis: false,
                            drawGrid: true,
                            // axisLabelFormatter: () => ""

                        }                    
            },
            series: makeSeries(channels)
        })    

    }   
}


export default LineChart
