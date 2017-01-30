import R from 'ramda'

import {ENTER_EDIT_MODE, CANCEL_EDIT_MODE,

		ADD_LAYOUT_ITEM, REMOVE_LAYOUT_ITEM, REPLACE_LAYOUT, 
		REPLACE_BACKUP_LAYOUT,

		UPDATE_PANEL_SIZES} from '../actions/dashboard'


import simpleGrid from './simpleGrid'

import {combineReducers} from 'redux'

const copyArray = R.map(R.identity);

const initialState = {
	layout: null, // расположение виджетов на панели. Активен когда isEditingMode = false
	editingLayout: null, // расположение виджетов когда включен режим редактирования
	isEditingMode: null, // включен ли режим редактирования (true/false).	
	panelSizes: null, //реальные размеры панелей виджетов в пикселях
	editingPanelSizes: null //размеры панелей виджетов в режиме редактирования
}

function makeScopedReducer(reducerFunction, reducerName) {
    return (state, action) => {
        const {scope} = action;
        const isInitializationCall = state === undefined;
        if(name !== reducerName && !isInitializationCall) return state;

        return reducerFunction(state, action);    
    }
}

export const modeReducer = function (state = false, action) {	
	switch (action.type) {
		case ENTER_EDIT_MODE:
			return true

		case CANCEL_EDIT_MODE:
			return false

		default: return state

	}
}


const layout = [
          {i: "panel-1", x: 7, y: 0, w: 6, h: 12},
          {i: "panel-2", x: 0, y: 1, w: 12, h: 12}
        ];

export const layoutReducer = function(state = layout, action) {
	switch (action.type) {
		case ADD_LAYOUT_ITEM:
			return R.append(
					R.assoc('i', 'panel-' + action.id || state.length, action.item),
				   state);

		case REMOVE_LAYOUT_ITEM:
			return R.reject(item => item.i == action.id, state);

		case REPLACE_LAYOUT:
			return copyArray(action.newLayout);

		default: return state;
	}
}

export const panelSizesReducer = function(state = [], action) {
	switch (action.type) {
		case UPDATE_PANEL_SIZES:
			return copyArray(action.newSizes)

		default: return state
	}
} 

export const backupLayoutReducer = (state = [], action) => {
	switch (action.type) {
		case REPLACE_BACKUP_LAYOUT:
			return action.newBackup;

		default: return state;
	}
}
const scopes = {
	isEditingMode: modeReducer, 
	layout: layoutReducer,
	backupLayout: backupLayoutReducer
}

export const dashboardReducer = combineReducers(scopes)

// export const dashboardReducer = function (state, action) {
// 	if (action.scope) {
// 		return R.assoc(action.scope, 
// 			scopes[action.scope](state, action), 
// 			dashboardReducer_(state, {}))
// 	} else return dashboardReducer_(state, action)
// }
// Где расположить логику в компоненте или в редьюсере?
