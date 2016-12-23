import React, { Component } from 'react';

const defaultChannels = [];
for (var i = 0; i< 4; i++) {
    defaultChannels.push({name: 'Channel' + i})
}

class Channels extends Component {

    render() {
        const {channels = defaultChannels} = this.props;

        return (  
            <div>  
                <h4>Channels:</h4>
                <ul className="list-group">
                    {channels.map(this.renderListItem.bind(this))}
                </ul>
            </div>
        )
    }
    renderListItem(channel, id) {
        return ( <li key={id} className="list-group-item">{channel.name}
                    <button className="btn btn-default pull-right">
                        <span className="glyphicon glyphicon-arrow-right"></span>
                    </button>
                    <div className="clearfix" />
                </li>)
    }
}

export default Channels