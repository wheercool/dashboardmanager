import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../../styles/scroller.css'
import {trace, log}  from '../../utils'

class Scroller extends Component {
    render() {
        const {width, height, orientation, factor} = this.props;
        let innerStyle;
        if (orientation == 'horizontal') {
            innerStyle = {
                width: Math.max(factor * width, width)
            }
        } else {
            innerStyle = {
                height: Math.max(factor * height, height)
            }
        }
        return (
            <div className="outer-scroll-wrapper">
                <div className="inner-scroll-wrapper" style={innerStyle}>&nbsp;</div>
            </div>);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this), true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this), true);
    }

    handleScroll(e) {
        let target = e.srcElement;
        if (ReactDOM.findDOMNode(this) == target) {
            let innerOffset = $(target.children[0]).offset(),
                outerOffset = $(target).offset();
            var offset = {
                left: outerOffset.left - innerOffset.left,
                top: outerOffset.top - innerOffset.top
            };

            if (this.props.onScroll) {
                this.props.onScroll(this.props.orientation == 'horizontal'? offset.left: offset.top)
            }
        }
    }

}
Scroller.propTypes = {
  factor: React.PropTypes.number, //коэфициент масштабирования
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  orientation: React.PropTypes.oneOf(['horizontal', 'vertical']),
  onScroll: React.PropTypes.func,
}

Scroller.defaultProps = {
  orientation: 'horizontal',
  onScroll: () => {}  
}
export default Scroller;
