import {FETCH_LINE_CHART_DATA,
      FETCH_LINE_CHART_DATA_SUCCESS,
      FETCH_LINE_CHART_DATA_FAIL } from '../actions/lineChart'

import {combineReducers} from 'redux'

const initialState = {
  url: 'http://google.com', // source of data to fetch from
  timeBasedMainAxis: true,
  orientation: 'horizontal',
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
  totalRecords: 1000,
  values: [[0, 0, 12, 21], [1000, 3, 16, 25], [2000, 10, 17, 30]]
};

function data(state = initialData, action) {
  switch (action.type) {
    case FETCH_LINE_CHART_DATA_SUCCESS:
      return action.data

    default: return state;
  }
}

export function settings(state = initialState, action) {
  return state;
}

export default combineReducers({
  settings,
  data
});
