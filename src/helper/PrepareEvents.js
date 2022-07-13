import moment from 'moment'
import {animateScroll} from 'react-scroll'

export const prepareEvents = (events) => {
    return events.map(
        (e) => ({
            ...e,
            date: moment(e.date).toDate()
        })
    )
}

export const timeMonth = (date) => {
    const todayMonth = moment(date)

    return todayMonth.format('HH:mm a | MMMM Do')
}

export const scrollToBottom = (id) => {
    animateScroll.scrollToBottom({
        containerId: id,
        duration: 0
    })
}

export const scrollToBottomAnimated = (id) => {
    animateScroll.scrollToBottom({
        containerId: id,
        duration: 250
    })
}