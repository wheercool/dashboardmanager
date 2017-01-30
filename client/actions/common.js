import R from'ramda'

export function makeScoped(actionCreator, scope) {
	return (action) => actionCreator(R.assoc('scope', scope, action))
}

export function simpleAction(type) {
	return () => {
		return {type}
	}
}