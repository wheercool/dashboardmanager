import R from 'ramda'
import {copyObject} from './common'
import {ADD_LAYOUT_ITEM, REMOVE_LAYOUT_ITEM, REPLACE_LAYOUT, REPLACE_PANELS, REPLACE_BACKUP_PANELS} from '../actions/panels'
import {CHANGE_WIDGET} from '../actions/widget'

const panels = {
	'panel-0': {
		id: 'panel-0',
		layout: {i: "panel-0", x: 7, y: 0, w: 6, h: 12},
		widget: {name: 'Size meter', id: 'panel-0', state: {}, settings: {}}
	}
}

export const panelReducer = function(state = panels, action) {
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
			
			var result = R.mapObjIndexed((value, key) => {
				return R.assoc('layout', R.find(item => item.i == key, 
										action.newLayout), value)
			}, state)			
			return result;

		case REPLACE_PANELS:
			return action.newPanels

		case CHANGE_WIDGET:
			return R.assocPath([action.id, 'widget', 'name'], action.name, state)			

		default: return state;
	}
}

export const backupPanelReducer = (state = {}, action) => {
	switch (action.type) {
		case REPLACE_BACKUP_PANELS:
			return action.newBackup;

		default: return state;
	}
}
