import React, { Component } from 'react';
import '../../styles/widget-panel.css'
import CloseButton from '../Buttons/CloseButton'
import SettingButton from '../Buttons/SettingButton'
import AvailableWidgets from '../Widgets/AvailableWidgets'
import LineChartSetting from '../Widgets/LineChartSetting'
import {trace} from '../../utils'

/*
 Контейнер для виджетов
 Управляет их настройками и позволяет менять свое содержимое на
 другой виджет
*/
class WidgetPanel extends Component {
    render() {        
        const {id, onPanelRemove, title, isEditing} = this.props;
        const onRemove = onPanelRemove.bind(null, id);
        const dynamicTitle = isEditing? <AvailableWidgets className="pull-left"/>: title;
        const button = isEditing? <CloseButton onClick={onRemove} />: <SettingButton className="pull-right"/>;
        return (
            <div {...this.props} className={`${this.props.className} panel-default`}>
               
                    <div className="panel-heading clearfix-container">{dynamicTitle}{button}<div className="clearfix"/></div>
                    <div className="panel-body">
                        {
                            isEditing? (
                                    <LineChartSetting />
                                )
                            :this.props.children
                        }
                    </div>
             
            </div>
        )
    }
}

export default WidgetPanel