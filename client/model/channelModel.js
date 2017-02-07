import {belongsInterval} from './interval'
import R from 'ramda'
/*
Point - точка, либо разрыв
*/

export function makePoint(x, y) {
  return {
    x, y
  }
}

//Является ли точка разрывом
export function isGap(point) {
  return isNaN(point.y)
}

//Создать разрыв в точке x
export function makeGap(x) {
  return makePoint(x, NaN);
}

//Создает разрыв между двумя координатами x
export function makeGapBetween(x1, x2) {
  return makeGap((x1 + x2) / 2)
}


//Interval->[Point]->[Point]
/*
  representingInterval - возвращает минимальное множество точек из points, так чтобы
  их было достаточно отобразить interval в виде графике
*/
export function representingInterval(interval, points) {
  const expectedXs = [4, 5, 6, 7, 8, 9, 10, 11],
        exptectedPoints =  expectedXs.map( x => makePoint(x, 10));
  return exptectedPoints
}


/*
Возвращает список точек находящихся внутри интервала
*/
export function pointsBelongs(interval, points) {
  return R.filter(point => belongsInterval(interval, point.x), points)
}

/*
Возвращает точку ближайшую слева от точки x
*/
export function closestLeft(x, points) {
  let lastClosestPoint = null;
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    if (point.x <= x)
      lastClosestPoint = point;
    else return lastClosestPoint;
  }
  return lastClosestPoint;
}
/*
  Возвращает точку ближайшую справа от точки x
*/
export function closestRight(x, points) {
  let lastClosestPoint = null;
  for (let i = points.length - 1; i >= 0; i--) {
    let point = points[i];
    if (point.x >= x)
      lastClosestPoint = point;
    else return lastClosestPoint;
  }
  return lastClosestPoint;
}

/*

*/
export function mergeSeries() {

}
