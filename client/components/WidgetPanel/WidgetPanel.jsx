import React, { Component } from 'react';
import R from 'ramda'
import {trace} from '../../utils'

import '../../styles/widget-panel.css'

import CloseButton from '../Buttons/CloseButton'
import SettingButton from '../Buttons/SettingButton'
import AvailableWidgets from '../Widgets/AvailableWidgets'
import LineChartSetting from '../Widgets/LineChartSetting'
import WidgetDispatcher from '../Widgets/WidgetDispatcher'
/*
 Контейнер для виджетов
 Управляет их настройками и позволяет менять свое содержимое на
 другой виджет
*/
class WidgetPanel extends Component {
    render() {        
        const {id, onPanelRemove, title, isEditing, className, style, widgetName} = this.props;
        const onRemove = onPanelRemove.bind(null, id);
        const dynamicTitle = isEditing? <AvailableWidgets className="pull-left"/>: title;
        const button = isEditing? <CloseButton onClick={onRemove} />: <SettingButton className="pull-right"/>;
        return (
            <div {...this.props} className={`${this.props.className} panel-default widget-panel`}>
               
                    <div className="panel-heading clearfix-container">{dynamicTitle}{button}<div className="clearfix"/></div>
                    <div className="panel-body">
                        <WidgetDispatcher widgetName={widgetName}
                                          widgetId={id}
                                          width={parseInt(style.width, 10)}
                                          height={parseInt(style.height, 10)}
                                          isEditing={isEditing}/>
                        {this.props.children}
                    </div>
             
            </div>
        )
    }
}

WidgetPanel.propTypes = {
    title: React.PropTypes.string,
    widgetName: React.PropTypes.string.isRequired, //название виджета
    isEditing: React.PropTypes.bool, //находится ли в режиме настройки виджет
    id: React.PropTypes.string, //уникальный идентификатор виджета

}
export default WidgetPanel