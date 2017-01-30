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


export const REPLACE_BACKUP_LAYOUT = 'REPLACE_BACKUP_LAYOUT'
export const replaceBackupLayout = function(newBackup) {
	return {
		type: REPLACE_BACKUP_LAYOUT,
		newBackup
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