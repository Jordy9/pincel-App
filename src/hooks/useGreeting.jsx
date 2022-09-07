import moment from 'moment'

export const useGreeting = () => {

    const greeting = moment().hour()
        let greet
        if (greeting >= 0 && greeting <= 11) {
            greet = '🌄 Buenos días'
        } else if (greeting >= 12 && greeting <= 18) {
            greet = '☀️ Buenas tardes'
        } else if (greeting >= 19 && greeting <= 23) {
            greet = '🌙 Buenas noches'
        }

  return {
    greet
  }
}
