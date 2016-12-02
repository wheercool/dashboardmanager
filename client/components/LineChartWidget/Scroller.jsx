import React, { Component } from 'react';
import '../../styles/scroller.css'
class Scroller extends Component {
    render() {
        const {width, height, orientation, factor} = this.props;
        let innerStyle;
        if (orientation == 'horizontal') {
            innerStyle = {
                width: factor * width
            }
        }
        return (
            <div className="outer-scroll-wrapper">
                <div className="inner-scroll-wrapper" style={innerStyle}>&nbsp;</div>
            </div>);
    }
}

export default Scroller;