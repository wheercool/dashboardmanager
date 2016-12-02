export function log(t) {
    console.log(t)
}

export function trace() {
    log(arguments)
}

export function elementSize(e) {
    log(e)
    return {
        width: parseInt(e.style.width, 10),
        height: parseInt(e.style.height, 10)
    }
}

export function copy(v) {
    return Object.assign({}, v);
}
export function copyList(ar)  {
  return ar.map(d => Object.assign({}, d));
}

