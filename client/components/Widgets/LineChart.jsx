import React, { Component } from 'react';
import {connect} from 'react-redux'
import R from 'ramda'

import HorizontalLineChart from '../LineChart/HorizontalLineChart'
import Scroller from '../LineChart/Scroller'

class LineChartWidget extends Component {
  render() {
    const {id, instanceProperties, width, height} = this.props;
    const {url, data, labels, ranges, colors, orientation} = instanceProperties(id)
    const chartWidth = width - 40;
    const chartHeight = height - 110;

    return (
      orientation == 'horizontal'? (
        <div>
          <HorizontalLineChart  data={data}
                                labels={labels}
                                ranges={ranges}
                                colors={colors}
                                width={chartWidth}
                                height={chartHeight}/>

          <Scroller width={width} orientation="horizontal" factor={2}/>
        </div>
      )
      : (
        <span>Nothing</span>
      )

    )
  }
}

const date = (value) => new Date(value);

const mapStateToProps = (state) => {
  return {
      instanceProperties: (id) => {
        const instanceState = state.panels[id].widget.state;
        const {data, channels, url, timeBasedMainAxis, orientation} = instanceState;
        const makeDateColumn = (R.map(R.adjust(date, 0)))
        const chartData = timeBasedMainAxis? makeDateColumn(data) : data;
        // debugger;
        const labels = R.pipe(R.map(R.prop('name')),
                              R.insert(0, 'Time'))
                      (channels);
        const pairs = R.map(channel => [channel.name, [channel.minValue, channel.maxValue]], channels);
        const ranges = R.fromPairs(pairs);
        const colorPairs = R.map(channel => [channel.name, channel.color], channels);
        const colors = R.fromPairs(colorPairs)
        return {
          data: chartData,
          url, labels, ranges, colors,
          orientation
        }
      }
  }
}

const mapDispatchToProps = (dispatch) => ({

})

export default  connect(mapStateToProps, mapDispatchToProps)(LineChartWidget)
