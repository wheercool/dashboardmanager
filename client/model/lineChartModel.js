
/*
Модель описывает привязку данных с отображением на графиках

*/
// Vocabulary:
// totalDuration - общая продолжительность данных
// offset - смещение относительно начала
// offsetPercent  - смещение относительно начала в %
// zoom - уровень детализации. 0 - минимальный. Каждый след. уровень увеличивает отображаемый интервал в 2 раза
// minDuration - длина отображаемого интервала с zoom = 0;
// min - минимальное значение отображаемого интервала
// max - максимальное значение отображаемого интервала

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
Zoom - на какой порядок размер интервала больше минимального размера интервала
*/

//Подсчет размера интервала
export function intervalLength(interval) {
  return interval.max - interval.min;
}

//Смещение интервала
export function moveInterval(interval, offset) {
  return {
    min: interval.min + offset,
    max: interval.max + offset
  }
}


//Уменьшение размер видимого интервала с сохранением центра
export function zoomInInterval(interval) {
  return {
    min: interval.min + 0.25 * intervalLength(interval),
    max: interval.max - 0.25 * intervalLength(interval)
  }
}
//Увеличение размера видимого интервала с учетом сохранения центра
export function zoomOutInterval(interval) {
  return interval;
}

//Создает видимый интервал с заданным уровнем зума
export function makeDefaultVisibleInterval(minimalIntervalLenght, dataInterval, zoom) {

}
