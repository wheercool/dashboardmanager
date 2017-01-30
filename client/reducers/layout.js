import {copyArray} from './common'
import {ADD_LAYOUT_ITEM, REMOVE_LAYOUT_ITEM, REPLACE_LAYOUT, REPLACE_BACKUP_LAYOUT} from '../actions/layout'

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

export const backupLayoutReducer = (state = [], action) => {
	switch (action.type) {
		case REPLACE_BACKUP_LAYOUT:
			return action.newBackup;

		default: return state;
	}
}
