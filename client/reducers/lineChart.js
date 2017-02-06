import R from 'ramda'
import {FETCH_LINE_CHART_DATA,
      FETCH_LINE_CHART_DATA_SUCCESS,
      FETCH_LINE_CHART_DATA_FAIL,
      CHANGE_ZOOM, CHANGE_OFFSET} from '../actions/lineChart'

import {combineReducers} from 'redux'

const initialState = {
  url: 'http://google.com', // source of data to fetch from
  timeBasedMainAxis: false,
  orientation: 'horizontal',
  zoom: 0,
  offsetPercent: 0.1,
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
  totalDuration: 10,
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
    case CHANGE_OFFSET:
        return R.assoc('offsetPercent', action.offset, state)

    case CHANGE_ZOOM:
        return R.merge(state, {
            zoom: action.zoom,
            offsetPercent: action.offset
          })
    default:return state;
  }
  return state;
}

export default combineReducers({
  settings,
  data
});
