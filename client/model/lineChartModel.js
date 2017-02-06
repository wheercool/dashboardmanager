
/*
Преобразует смещение в %
*/
export function offsetToPercent(offset, totalDuration) {
  return totalDuration != 0
            ? offset / totalDuration
            :0;
}
/*
Коэффициент соотношения для Scoller
*/
export function getFactor(count, total) {
  return count != 0
      ? total / count
      : 0;
}

export function getScrollerOffset(value, minValue, maxValue, width) {
  return width * (value - minValue) / (maxValue - minValue);
}



/*
Interval.

Data Interval - интервал существующих данных
Visible Interval - интвервал отображаемый пользователю
Minimal Interval Length - минимальный размер видимого интвервала
Requested Interval - интервал запрошенный из БД
Total Interval - интервал охватывающий Visible Interval и Data Interval
Zoom - на какой порядок размер интервала больше минимального размера интервала
*/

export function makeInterval(min, max) {
  return {
    min, max
  }
}
//Подсчет размера интервала
export function intervalLength(interval) {
  return interval.max - interval.min;
}

//Смещение интервала
export function moveInterval(interval, offset) {
  return makeInterval(interval.min + offset, interval.max + offset)
}


//Уменьшение размер видимого интервала с сохранением центра
export function zoomInInterval(interval) {
  return makeInterval(interval.min + 0.25 * intervalLength(interval),
      interval.max - 0.25 * intervalLength(interval))
}
//Увеличение размера видимого интервала с учетом сохранения центра
export function zoomOutInterval(interval) {
  return makeInterval(interval.min - 0.5 * intervalLength(interval),
    interval.max + 0.5 * intervalLength(interval))
}

export function embraceIntervals(a, b) {
  return makeInterval(Math.min(a.min, b.min),
    Math.max(a.max, b.max))
}
//Создает видимый интервал с заданным уровнем зума
export function makeDefaultVisibleInterval(minimalIntervalLenght, dataInterval, zoom) {

}

export function intervalCenter(interval) {
  return interval.min + 0.5 * (interval.max - interval.min);
}

export function intervalPointAtPercent(interval, percent) {
  return makeInterval(interval.min, interval.max)
}
