const initialState = {
  url: 'http://google.com', // source of data to fetch from
  timeBasedMainAxis: true,
  orientation: 'horizontal',
  data: [[0, 0, 12, 21], [1000, 3, 16, 25], [2000, 10, 17, 30]],
  channels: [{
      name: 'Pressure',
      minValue: 0,
      maxValue: 10,
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
export default function lineChart(state = initialState, action) {
  switch (action.type) {

    default: return state
  }
}
