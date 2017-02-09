import React, { Component } from 'react';
import Channels from './Channels'
import ChannelsFilter from './ChannelsFilter'
import { Accordion, Panel} from 'react-bootstrap'
import ChannelSetting from './ChannelSetting'
import CloseButton from '../Buttons/CloseButton'

class LineChartSetting extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        const {availableChannels, channels, onChannelAdd,
              filters, currentFilter, onFilterChange} = this.props

        return (
            <div className="">
                <div className="col-sm-4">
                    <h4>Available Channels:</h4>
                    <ChannelsFilter currentFilter={currentFilter} filters={filters} onFilterChange={onFilterChange}/>
                    <Channels channels={availableChannels} title=""/>
                </div>
                <div className="col-sm-8">
                    <Accordion>
                      {channels.map((channel, key) =>
                          <Panel key={key} eventKey={key} header={this.panelHeader.bind(this)(channel)}>
                              <ChannelSetting  channel={channel}/>
                          </Panel>)}
                    </Accordion>
                </div>
            </div>
        )
    }
    panelHeader(channel) {
      return <div>{channel.name}<CloseButton onClick={this.onClick.bind(this, channel)}/></div>;
    }
    onClick(channel, e) {
      e.stopPropagation();
      this.props.onChannelRemove(channel);
    }
}
LineChartSetting.propTypes = {
  availableChannels: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    route: React.PropTypes.string
  })),
  channels:  React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    route: React.PropTypes.string
  })),

  filters: React.PropTypes.arrayOf(React.PropTypes.string),
  currentFilter: React.PropTypes.string,

  onChannelAdd: React.PropTypes.func,
  onChannelRemove: React.PropTypes.func,
  onFilterChange: React.PropTypes.func
}

LineChartSetting.defaultProps = {
  title: 'Availabel Channels:',
  onChannelAdd: () => {},
  onChannelRemove: () => {}
}


export default LineChartSetting
