import {combineReducers} from 'redux'
import R from 'ramda'

import simpleGrid from './simpleGrid'

import {editMode} from './editMode'

import {panelReducer, backupPanelReducer} from './panels'

const scopes = {
	isEditingMode: editMode,
	panels: panelReducer,
	backupPanels: backupPanelReducer
}

export const dashboardReducer = combineReducers(scopes)
