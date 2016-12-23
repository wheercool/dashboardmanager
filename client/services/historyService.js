import {delay} from '../utils'

export default function(zoom, offset, count) {
    var url = '/ajax/' + offset + '/' + (offset + 2000);
    var response = {
        totalRecords: 1000000,
        groups: [{
            channels: [{
                name: 'Temperature',
                minValue: 0,
                maxValue: 0.3,
                measure: 'C',
                color: 'red'                
            }],
            data: []
        }]
    }
    for (var i = 0; i < response.totalRecords; i++) {
        response.groups[0].data.push([i, (i / 1000) * (i / 1000)]);
    }
    response.groups[0].data = response.groups[0].data.slice(offset, offset + count)
    return delay(1, response);
    // return fetch(url); 

}