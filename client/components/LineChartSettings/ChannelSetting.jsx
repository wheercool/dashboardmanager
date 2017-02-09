import React, { Component } from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'


class ChannelSetting extends Component {
  render() {
    const {channel: {name, minValue, maxValue, color}} = this.props;
      return (
        <div className="col-sm-12">
    <FormGroup bsSize="sm">

        <ControlLabel>Scale Min:</ControlLabel>
        <FormControl
            type="text"
            defaultValue={minValue}
            placeholder="Enter text"
          />

          <ControlLabel>Scale Max:</ControlLabel>
        <FormControl
            type="text"
            value={maxValue}
            placeholder="Enter text"
          />

          <ControlLabel>Color:</ControlLabel>
          <FormControl
              type="text"
              value={color}
              placeholder="Enter text"
            />
      </FormGroup>
      </div>
    )
  }
}

export default ChannelSetting
