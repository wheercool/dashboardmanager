import React, { Component } from 'react';

const availableWidgets = ['History Data', 'Size meter', 'Speedometer']

class AvailableWidgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            currentWidget: 0
        }
    }
    render() {
        const openState = this.state.opened? 'show': 'hidden';
        const {widgets = availableWidgets} = this.props;
        return (
            <div {...this.props}>
                <div className="dropdown">
                  <button onClick={this.changeMenu.bind(this, !this.state.opened)} className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    {availableWidgets[this.state.currentWidget]} <span className="caret"></span>
                  </button>
                  <ul className={"dropdown-menu " + openState}>
                    {
                        availableWidgets.map(this.renderWidgetItem.bind(this))
                    }               
                  </ul>
                </div>
            </div>
        )
    }

    renderWidgetItem(item, idx) {
        return (<li key={idx} onClick={this.onCurrentWidgetChanged.bind(this, idx)}><a href="#">{item}</a></li>)
    }

    onCurrentWidgetChanged(id) {
        this.setState({
            currentWidget: id,
            opened: false
        })
    }
    changeMenu(isOpened, e) {        
        this.setState({opened: isOpened})
    }
}

export default AvailableWidgets;