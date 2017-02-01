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
