import {delay} from '../utils'

const dataInterval = {min: 0, max: 1000}
const channelsData = {
  // "Temperature": [],
  // "Pressure": []
};
const data = []
for (var i = dataInterval.min; i < dataInterval.max / 3; i++) {
  const time = i,
        temperature = i,
        pressure = i + 2,
        torque = i * 2;
  data.push([time, temperature, pressure, torque])
}

for (var i = dataInterval.max / 3; i < dataInterval.max / 2; i++) {
  const time = i,
        temperature = dataInterval.max /3 - i,
        pressure = temperature + 2,
        torque = temperature * 2;
  data.push([time, temperature, pressure, torque])
}

for (var i = dataInterval.max / 2; i < dataInterval.max; i++) {
  const time = i,
        temperature = i,
        pressure = temperature + 2,
        torque = temperature * 2;
  data.push([time, temperature, pressure, torque])
}

export default function(url, requrestedInterval, channels, zoom) {
    // var url = '/ajax/' + offset + '/' + (offset + 2000);
    var response = {
        requrestedInterval,
        dataInterval,
        channels,
        values: data.filter(d => d[0] >= requrestedInterval.min && d[0] <= requrestedInterval.max)
    }
    return delay(100, response);
    // return fetch(url);

}
