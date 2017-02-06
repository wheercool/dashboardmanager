import R from 'ramda'
import {FETCH_LINE_CHART_DATA,
      FETCH_LINE_CHART_DATA_SUCCESS,
      FETCH_LINE_CHART_DATA_FAIL,
      ZOOM_IN_VISIBLE_INTERVAL,
      ZOOM_OUT_VISIBLE_INTERVAL,
      MOVE_VISIBLE_INTERVAL} from '../actions/lineChart'

import {moveInterval, zoomInInterval, zoomOutInterval} from '../model/lineChartModel'

import {combineReducers} from 'redux'

const initialState = {
  url: 'http://google.com', // source of data to fetch from
  timeBasedMainAxis: false,
  orientation: 'horizontal',
  visibleInterval: {
    min: 0,
    max: 2
  },
  channels: [{
      name: 'Pressure',
      minValue: 0,
      maxValue: 1000000,
      color: 'red',
      measure: 'Pa'
  }, {
      name: 'M',
      minValue: 10,
      maxValue: 20,
      color: 'green',
      measure: 'Pa'
  }, {
      name: 'Temperature',
      minValue: 20,
      maxValue: 30,
      color: 'brown',
      measure: 'C'
  }]
}

const initialData = {
  dataInterval: {
    min: 0,
    max: 4
  },
  requestedInterval: {
    min: 0,
    max: 4
  },
  minimalIntervalLenght: 1,
  values: [[0, 0, 12, 21], [1, 3, 16, 25], [2, 10, 17, 30], [3, 11, 14, 32], [4, 31, 22, 12]]
};

function data(state = initialData, action) {
  switch (action.type) {
    case FETCH_LINE_CHART_DATA_SUCCESS:
      return action.data
    default: return state;
  }
}

export function settings(state = initialState, action) {
  switch (action.type) {
    case MOVE_VISIBLE_INTERVAL:
        return R.assoc('visibleInterval',
                moveInterval(state.visibleInterval, action.offset),
                state)

    case ZOOM_IN_VISIBLE_INTERVAL:
        return R.assoc('visibleInterval',
                  zoomInInterval(state.visibleInterval),
                  state)
    case ZOOM_OUT_VISIBLE_INTERVAL:
        return R.assoc('visibleInterval',
          zoomOutInterval(state.visibleInterval),
          state)

    default:return state;
  }
  return state;
}

export default combineReducers({
  settings,
  data
});
