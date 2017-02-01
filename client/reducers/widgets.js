import R from 'ramda'
import imageWidget from './image'
import simpleGrid from './simpleGrid'

const widgetReducers = {
	'Simple Grid': simpleGrid,
	'Image': imageWidget
};

/*
Возвращает редьюсер виджета по имени виджета
*/
export function widgetReducerDispatcher(name) {
	var reducer = widgetReducers[name] || ((state, action) => undefined);	
	return reducer;
}
