import React, { Component } from 'react';
import {connect} from 'react-redux'
import R from 'ramda'

import HorizontalLineChart from '../LineChart/HorizontalLineChart'
import Scroller from '../LineChart/Scroller'
import historyService from '../../services/historyService'
import {widgetAction} from '../../actions/common'

import {fetchLineChartData, fetchLineChartDataSuccess} from '../../actions/lineChart'

class LineChartWidget extends Component {
  render() {
    const {id, instanceProperties, width, height, onScroll} = this.props;
    const {url, chartData, totalRecords, labels, ranges, colors, orientation} = instanceProperties(id)
    const chartWidth = width - 40;
    const chartHeight = height - 150;
    const factor = chartData.length? totalRecords /chartData.length
                    : 0;
    const onScrollHandler = onScroll(id)

    return (
      orientation == 'horizontal'? (
        <div>
          <HorizontalLineChart  data={chartData}
                                labels={labels}
                                ranges={ranges}
                                colors={colors}
                                width={chartWidth}
                                height={chartHeight}/>

          <Scroller width={width}
                    orientation="horizontal"
                    factor={factor}
                    onScroll={onScrollHandler}/>
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

        const {data: {values, totalRecords}, settings: {channels, url, timeBasedMainAxis, orientation}} = instanceState;
        const makeDateColumn = (R.map(R.adjust(date, 0)))
        const chartData = timeBasedMainAxis? makeDateColumn(values) : values;
        // debugger;
        const labels = R.pipe(R.map(R.prop('name')),
                              R.insert(0, 'Time'))
                      (channels);
        const pairs = R.map(channel => [channel.name, [channel.minValue, channel.maxValue]], channels);
        const ranges = R.fromPairs(pairs);
        const colorPairs = R.map(channel => [channel.name, channel.color], channels);
        const colors = R.fromPairs(colorPairs)

        return {
          totalRecords,
          chartData: chartData.length? chartData: [R.repeat(0, labels.length)],
          url, labels, ranges, colors,
          orientation
        }
      }
  }
}

const mapDispatchToProps = (dispatch) => ({
  onScroll: (id) => function(offset) {
    dispatch((state) => {
      dispatch(fetchLineChartData());
      historyService(0, offset, 100).then((response) => {
        dispatch(widgetAction(id, fetchLineChartDataSuccess({
          totalRecords: response.totalRecords,
          values: response.groups[0].data
        })))
      })
    })
  }
})

export default  connect(mapStateToProps, mapDispatchToProps)(LineChartWidget)
