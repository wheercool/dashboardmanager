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

export const ZOOM_IN_VISIBLE_INTERVAL = 'ZOOM_IN_VISIBLE_INTERVAL'
export const zoomInVisibleInterval = () => {
  return {
    type: ZOOM_IN_VISIBLE_INTERVAL
  }
}

export const ZOOM_OUT_VISIBLE_INTERVAL = 'ZOOM_OUT_VISIBLE_INTERVAL'
export const zoomOutVisibleInterval = () => {
  return {
    type: ZOOM_OUT_VISIBLE_INTERVAL
  }
}

export const MOVE_VISIBLE_INTERVAL = 'MOVE_VISIBLE_INTERVAL'
export const moveVisibleInterval = (offset) => {
  return {
    type: MOVE_VISIBLE_INTERVAL,
    offset
  }
}
