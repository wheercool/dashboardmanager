import R from 'ramda'
import simpleGrid from './simpleGrid'

const widgetReducers = {
	'Simple Grid': simpleGrid
};

export function widgetDispatcher(name) {
	var reducer = widgetReducers[name] || R.identity;
	return reducer;
}