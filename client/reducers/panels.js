import R from 'ramda'
import {copyObject} from './common'
import {ADD_LAYOUT_ITEM, REMOVE_LAYOUT_ITEM, REPLACE_LAYOUT, REPLACE_PANELS, REPLACE_BACKUP_PANELS} from '../actions/panels'
import {CHANGE_WIDGET} from '../actions/widget'
import {widgetDispatcher} from './widgets'

const panels = {
	'panel-0': {
		id: 'panel-0',
		layout: {i: "panel-0", x: 7, y: 0, w: 6, h: 12},
		widget: {name: 'Size meter', id: 'panel-0', state: {}, settings: {}}
	}
}

export const panelReducer = function(state = panels, action) {

	const updateWidgetState = (id) => R.assocPath([id, 'widget', 'state'], 
									widgetDispatcher(state[id].widget.name)(state[id].widget.state, action))

	switch (action.type) {
		case ADD_LAYOUT_ITEM:
			return R.assoc(action.id,
					{
						id: action.id,
						layout: R.assoc('i', action.id, action.item),
						widget: {
							name: '',
							id: action.id,
							state: {},
							settings: {}
						}
					}, state);

		
		case REMOVE_LAYOUT_ITEM:
			return R.dissoc(action.id, state);

		case REPLACE_LAYOUT:
			
			const updateLayout = R.mapObjIndexed((value, key) => {
				return R.assoc('layout', R.find(item => item.i == key, 
										action.newLayout), value)
			})			
			return updateLayout(state);

		case REPLACE_PANELS:
			return action.newPanels

		case CHANGE_WIDGET:
			const updateWidgetName = R.assocPath([action.id, 'widget', 'name'], action.name);
			const updateWidget = R.pipe(	updateWidgetName, updateWidgetState(action.id))			
			return updateWidget(state);
		default: 
			const updateWidgetStates =R.mapObjIndexed((value, key) => {				
				return updateWidgetState(key)(state)[key]
			});
			return updateWidgetStates(state)
	}
}

export const backupPanelReducer = (state = {}, action) => {
	switch (action.type) {
		case REPLACE_BACKUP_PANELS:
			return action.newBackup;

		default: return state;
	}
}
