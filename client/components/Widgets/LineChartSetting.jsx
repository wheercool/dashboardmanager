import React, { Component } from 'react';
import Channels from './Channels'
import Groups from './Groups'

class LineChartSetting extends Component {
    render() {
        return (
            <div>
               <div>
                <div className="col-sm-6">
                    <Channels />
                </div>
                <div className="col-sm-6">
                    <Groups />
                </div>
               </div> 
            </div>
        )
    }
}

export default LineChartSetting