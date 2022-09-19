let clicks = []
let time = ''

export const onDoubleTap = (e, handledFunction, param) => {
    e.preventDefault()

    clicks.push(new Date().getTime())

    window.clearTimeout(time)

    time = window.setTimeout(() => {
        if (clicks.length > 1 && (clicks[clicks.length - 1] - clicks[clicks.length - 2]) < 500) {
            if (param) {
                handledFunction(param)
            } else {
                handledFunction()
            }
            param = undefined
        }
    }, 300);
}