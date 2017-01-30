import R from 'ramda'
export const copyArray = R.map(R.identity);
export const copyObject = (obj) => Object.assign(obj, {})