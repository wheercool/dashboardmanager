import {combineReducers} from 'redux'
import R from 'ramda'

import simpleGrid from './simpleGrid'

import {editMode} from './editMode'

import {layoutReducer, backupLayoutReducer} from './layout'

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

const scopes = {
	isEditingMode: editMode, 
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
