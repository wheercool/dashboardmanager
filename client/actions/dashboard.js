export const ENTER_EDIT_MODE = 'ENTER_EDIT_MODE'
export const enterEditMode = simpleAction(ENTER_EDIT_MODE)

export const CANCEL_EDIT_MODE = 'CANCEL_EDIT_MODE'
export const cancelEditMode = simpleAction(CANCEL_EDIT_MODE)

export const ADD_LAYOUT_ITEM  = 'ADD_LAYOUT_ITEM'
export const addLayoutItem = function(item) {
	const {x = 0, y = 0, w = 12, h = 12} = item || {};
	return {
		type: ADD_LAYOUT_ITEM,
		item: {x, y, w, h}
	}
}

export const REMOVE_LAYOUT_ITEM = 'REMOVE_LAYOUT_ITEM'
export const removeLayoutItem = function(id) {
	return {
		type: REMOVE_LAYOUT_ITEM,
		id		
	}
}

export const REPLACE_LAYOUT = 'REPLACE_LAYOUT'
export const replaceLayout = function(newLayout, scope) {
	return {
		type: REPLACE_LAYOUT,
		newLayout,
		scope
	}
}
export const REPLACE_BACKUP_LAYOUT = 'REPLACE_BACKUP_LAYOUT'
export const replaceBackupLayout = function(newBackup) {
	return {
		type: REPLACE_BACKUP_LAYOUT,
		newBackup
	}
}

export const UPDATE_PANEL_SIZES = 'UPDATE_PANEL_SIZES'
export const updatePanelSizes = function(newSizes) {
	return {
		type: UPDATE_PANEL_SIZES,
		newSizes
	}
}

function simpleAction(type) {
	return () => {
		return {type}
	}
}