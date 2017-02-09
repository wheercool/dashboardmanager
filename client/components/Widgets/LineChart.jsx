import React, { Component } from 'react';
import {connect} from 'react-redux'
import R from 'ramda'

import HorizontalLineChart from '../LineChart/HorizontalLineChart'
import Scroller from '../LineChart/Scroller'
import historyService from '../../services/historyService'
import {widgetAction} from '../../actions/common'
import {zoomInVisibleInterval, zoomOutVisibleInterval, moveVisibleInterval} from '../../actions/lineChart'

import {fetchLineChartData, fetchLineChartDataSuccess} from '../../actions/lineChart'
import ZoomInButton from '../Buttons/ZoomInButton'
import ZoomOutButton from '../Buttons/ZoomOutButton'
import {offsetToPercent, getFactor, getScrollerOffset} from '../../model/lineChartModel'
import {embraceIntervals, intervalLength,
      zoomInInterval, zoomOutInterval, moveInterval} from '../../model/interval'

import LineChartSetting from '../LineChartSettings/LineChartSetting'

class LineChartWidget extends Component {
  render() {
    const {id, instanceProperties, width, height,
            isEditing,
            onScroll, onZoomIn, onZoomOut} = this.props;
    const {url, chartData, dataInterval,
          visibleInterval,
          labels, ranges, colors,
          orientation, channels } = instanceProperties(id)

    const chartWidth = width - 40,
          chartHeight = height - 150,
          totalInterval = embraceIntervals(visibleInterval, dataInterval),
          visibleTotalScale = getFactor(intervalLength(visibleInterval),
                      intervalLength(totalInterval)),
          scrollVisibleScale = getFactor(width, intervalLength(visibleInterval)),

          onScrollHandler = onScroll(id, scrollVisibleScale),
          onZoomInHandler = onZoomIn(id),
          onZoomOutHandler = onZoomOut(id),
          offset = visibleInterval.min - totalInterval.min,
          scrollOffset = offset / scrollVisibleScale;
          // localOffset =  //visibleInterval.min * width * factor
          // localOffset = getScrollerOffset(visibleInterval.min - totalInterval.min,
          //         visibleInterval.min,
          //         visibleInterval.max,
          //         width * factor)
    return (
      orientation == 'horizontal'? (
        isEditing
        ? (
          <LineChartSetting channels={[]}
                availableChannels={channels}
                channels={channels}
                currentFilter="All"
                filters={["Sensor Board", "Gyro"]}/>
        )
        : (
          <div>
              <ZoomInButton onClick={onZoomInHandler}/>
              <ZoomOutButton onClick={onZoomOutHandler}/>
              <HorizontalLineChart  data={chartData}
                                    min={visibleInterval.min}
                                    max={visibleInterval.max}
                                    labels={labels}
                                    ranges={ranges}
                                    colors={colors}
                                    width={chartWidth}
                                    height={chartHeight}/>

              <Scroller width={width}
                        orientation="horizontal"
                        factor={visibleTotalScale}
                        offset={scrollOffset}
                        onScroll={onScrollHandler}/>
            </div>
      )
      )
      : (
        <span>Nothing</span>
      )

    )
  }
  componentDidMount() {
    const {widgetCreated, id} = this.props;
    widgetCreated(id);
  }
}

const date = (value) => new Date(value);

const mapStateToProps = (state) => {
  return {
      instanceProperties: (id) => {
        const instanceState = state.panels[id].widget.state;

        const { data: {values, dataInterval, minimalIntervalLenght, requrestedInterval},
                settings: {
                          visibleInterval,
                          channels,
                          url,
                          timeBasedMainAxis,
                          orientation}
              } = instanceState;
        const makeDateColumn = (R.map(R.adjust(date, 0))),
          chartData = timeBasedMainAxis? makeDateColumn(values) : values,

          labels = R.pipe(R.map(R.prop('name')),
                              R.insert(0, 'Time'))
                      (channels),
          pairs = R.map(channel => [channel.name, [channel.minValue, channel.maxValue]], channels),
          ranges = R.fromPairs(pairs),
          colorPairs = R.map(channel => [channel.name, channel.color], channels),
          colors = R.fromPairs(colorPairs);

        return {
          dataInterval,
          visibleInterval,
          minimalIntervalLenght,
          chartData: chartData.length? chartData: [R.repeat(0, labels.length)],
          url, labels, ranges, colors,
          channels,
          orientation
        }
      }
  }
}

const fetchAndRender = (dispatch, id, url, requrestedInterval, channels, zoom) => {
  dispatch(fetchLineChartData());
  historyService(url, requrestedInterval, channels, zoom).then((response) => {
    dispatch(widgetAction(id, fetchLineChartDataSuccess({
      requrestedInterval: requrestedInterval,
      dataInterval: response.dataInterval,
      channels: channels,
      values: response.values
    })))
  })
}
const mapDispatchToProps = (dispatch) => ({
  widgetCreated: (id) => {
      dispatch((dispatch, getState) => {
        const {settings: {channels, visibleInterval, url}, data} = getState().panels[id].widget.state;
        fetchAndRender(dispatch, id, url, visibleInterval, channels, 0)
      });
  },
  onScroll: (id, scale) => function(oldOffset, newOffset) {
    dispatch((dispatch, getState) => {
      const {settings: {channels, visibleInterval, url}, data} = getState().panels[id].widget.state;
      const offset = (newOffset - oldOffset) * scale;
      const requestedInterval = moveInterval(visibleInterval, offset)
      dispatch(widgetAction(id, moveVisibleInterval(offset)));
      fetchAndRender(dispatch, id, url, requestedInterval, channels, 0)
    })
  },
  onZoomIn : (id) => function() {
    dispatch((dispatch, getState) => {
      dispatch(widgetAction(id, zoomInVisibleInterval()))
      const {settings: {channels, visibleInterval, url}, data} = getState().panels[id].widget.state;
      const requestedInterval = zoomInInterval(visibleInterval)
      fetchAndRender(dispatch, id, url, requestedInterval, channels, 0)
    })
  },
  onZoomOut : (id) => function() {
    dispatch((dispatch, getState) => {
      dispatch(widgetAction(id, zoomOutVisibleInterval()))
      const {settings: {channels, visibleInterval, url}, data} = getState().panels[id].widget.state;
      const requestedInterval = zoomOutInterval(visibleInterval)
      fetchAndRender(dispatch, id, url, requestedInterval, channels, 0)
    })
  }
})

export default  connect(mapStateToProps, mapDispatchToProps)(LineChartWidget)
