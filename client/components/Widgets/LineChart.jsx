import React, { Component } from 'react';
import {connect} from 'react-redux'
import R from 'ramda'

import HorizontalLineChart from '../LineChart/HorizontalLineChart'
import Scroller from '../LineChart/Scroller'
import historyService from '../../services/historyService'
import {widgetAction} from '../../actions/common'
import {changeZoom, changeOffset} from '../../actions/lineChart'

import {fetchLineChartData, fetchLineChartDataSuccess} from '../../actions/lineChart'
import ZoomInButton from '../Buttons/ZoomInButton'
import ZoomOutButton from '../Buttons/ZoomOutButton'
import {offsetToPercent, getFactor, getScrollerOffset} from '../../model/lineChartModel'


class LineChartWidget extends Component {
  render() {
    const {id, instanceProperties, width, height, onScroll, onZoomIn, onZoomOut} = this.props;
    const {url, chartData, totalDuration,
          zoom, offset, offsetPercent,
          labels, ranges, colors,
          orientation }= instanceProperties(id)

    const duration = Math.pow(2, zoom),
          minValue = offset,
          maxValue = offset + duration,

          chartWidth = width - 40,
          chartHeight = height - 150,
          factor = getFactor(duration, totalDuration),

          onScrollHandler = onScroll(id),
          onZoomInHandler = onZoomIn(id),
          onZoomOutHandler = onZoomOut(id),
          // localOffset = offsetPercent * width * factor
          localOffset = getScrollerOffset(offset, Math.min(0, minValue), totalDuration, width * factor)
          console.log('offset: ' + offset)
          console.log('localOffset : ' + localOffset)
          console.log('offsetPercent : ' + offsetPercent)
    return (
      orientation == 'horizontal'? (
      <div>
          <ZoomInButton onClick={onZoomInHandler}/>
          <ZoomOutButton onClick={onZoomOutHandler}/>
          <HorizontalLineChart  data={chartData}
                                min={minValue}
                                max={maxValue}
                                labels={labels}
                                ranges={ranges}
                                colors={colors}
                                width={chartWidth}
                                height={chartHeight}/>

          <Scroller width={width}
                    orientation="horizontal"
                    factor={factor}
                    offset={localOffset}
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

        const { data: {values, totalDuration},
                settings: {zoom,
                          offsetPercent,
                          channels,
                          url,
                          timeBasedMainAxis,
                          orientation}
              } = instanceState;
        const offset = totalDuration * offsetPercent;
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
          totalDuration,
          zoom, offsetPercent, offset,
          chartData: chartData.length? chartData: [R.repeat(0, labels.length)],
          url, labels, ranges, colors,
          orientation
        }
      }
  }
}

const fetchAndRender = (dispatch, id, offset, zoom) => {
  dispatch(fetchLineChartData());
  historyService(zoom, offset).then((response) => {
    dispatch(widgetAction(id, fetchLineChartDataSuccess({
      totalDuration: response.totalDuration,
      values: response.groups[0].data
    })))
  })
}
const mapDispatchToProps = (dispatch) => ({

  onScroll: (id) => function(offset, percent) {
    console.log('On scroll:' + offset + '/' + percent)
    dispatch((dispatch, getState) => {
      const {settings, data} = getState().panels[id].widget.state;
      dispatch(widgetAction(id, changeOffset(percent)));
      //fetchAndRender(dispatch, id, offset, state.zoom)
    })
  },
  onZoomIn : (id) => function() {
    dispatch((dispatch, getState) => {
      const {settings, data} = getState().panels[id].widget.state;
      const duration = Math.pow(2, settings.zoom),
            prevOffset = settings.offsetPercent * data.totalDuration,
            zoom = settings.zoom - 1,
            offset = prevOffset + 0.25 * duration,
            offsetPercent = offset / data.totalDuration
      dispatch(widgetAction(id, changeZoom(zoom, offsetPercent)))
      // fetchAndRender(dispatch, id, offset, zoom)
    })
  },
  onZoomOut : (id) => function() {
    dispatch((dispatch, getState) => {
      const {settings, data} = getState().panels[id].widget.state;

      const duration = Math.pow(2, settings.zoom),
            zoom = settings.zoom + 1,
            prevOffset = settings.offsetPercent * data.totalDuration,
            offset = prevOffset - 0.5 * duration,
            offsetPercent = offset / data.totalDuration

      dispatch(widgetAction(id, changeZoom(zoom, offsetPercent)))
      // fetchAndRender(dispatch, id, offset, zoom)
    })
  }
})

export default  connect(mapStateToProps, mapDispatchToProps)(LineChartWidget)
