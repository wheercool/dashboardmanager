import {simpleAction} from './common'

export const FETCH_LINE_CHART_DATA_SUCCESS = 'FETCH_LINE_CHART_DATA_SUCCESS'
export function fetchLineChartDataSuccess(data) {
  return {
    type: FETCH_LINE_CHART_DATA_SUCCESS,
    data
  }
}

export const FETCH_LINE_CHART_DATA = 'FETCH_LINE_CHART_DATA'
export const fetchLineChartData = simpleAction(FETCH_LINE_CHART_DATA)

export const FETCH_LINE_CHART_DATA_FAIL = 'FETCH_LINE_CHART_DATA_FAIL'
export function fetchLineChartDataFail(error) {
  return {
    type: FETCH_LINE_CHART_DATA_FAIL,
    error
  }
}

export const CHANGE_ZOOM = 'CHANGE_ZOOM'
export const changeZoom = (zoom, offset) => {
  return {
    type: CHANGE_ZOOM,
    zoom, offset
  }
}

export const CHANGE_OFFSET = 'CHANGE_OFFSET'
export const changeOffset = (offset) => {
  return {
    type: CHANGE_OFFSET,
    offset
  }
}
