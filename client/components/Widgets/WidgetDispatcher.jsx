import React, { Component } from 'react'

import DefaultWidget from './DefaultWidget'
import SizeMeter from './SizeMeter'
/*
	Мультикомпонент. Позволяет создавать зарегистрированные виджеты по их имени и id.
	Также обеспечивает корректную обработку их action. 
*/


const registeredWidgets = {
	"Size meter": SizeMeter
}
class WidgetDispatcher extends Component {
	render() {
		const {widgetName, widgetId, width, height, isEditing} = this.props;
		const Widget = registeredWidgets[widgetName] || DefaultWidget
		return <Widget 	width={width}
					 	height={height}
					 	isEditing={isEditing}
					 	id={widgetId}/>
	}
}

WidgetDispatcher.propTypes = {
	 widgetName: React.PropTypes.string.isRequired,
	 widgetId: React.PropTypes.string.isRequired
}

export default WidgetDispatcher