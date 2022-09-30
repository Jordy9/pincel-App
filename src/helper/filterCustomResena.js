import moment from "moment"

export const filterCustomResena = (resena, changeDate, changeDateRange, selectRange) => {

    const resenasFiltradasPorRango = resena?.filter(
        resena => (changeDate) 
          ?
        (changeDateRange && changeDate)
          ? 
        (moment(resena?.createdAt, 'Y/M/D').isSameOrBefore(moment(changeDate, 'Y/M/D')) && moment(resena?.createdAt, 'Y/M/D').isSameOrAfter(moment(changeDateRange, 'Y/M/D')))
          ||
        (moment(resena?.createdAt, 'Y/M/D').isSameOrAfter(moment(changeDate, 'Y/M/D')) && moment(resena?.createdAt, 'Y/M/D').isSameOrBefore(moment(changeDateRange, 'Y/M/D')))
          :
        moment(resena?.createdAt, 'Y/M/D').isSame(moment(changeDate).format('Y/M/D'))
          : 
        (moment(resena?.createdAt, 'Y/M/D').isSameOrBefore(moment(selectRange?.startDate, 'Y/M/D')) && moment(resena?.createdAt, 'Y/M/D').isSameOrAfter(moment(selectRange?.endDate, 'Y/M/D')))
          ||
        (moment(resena?.createdAt, 'Y/M/D').isSameOrAfter(moment(selectRange?.startDate, 'Y/M/D')) && moment(resena?.createdAt, 'Y/M/D').isSameOrBefore(moment(selectRange?.endDate, 'Y/M/D')))
      )
    
      const resenasFiltradas = resenasFiltradasPorRango?.filter(
        resena => resena?.estado === true
          && 
        resena?.calificacion?.length !== 0
      )

    return resenasFiltradas
}

export const filterCustomResenaTodosMeses = (resena, showThreeMonth, changeDate, changeDateRange, showThreeMonths, showAllMonth) => {

    let SumaResenasPorMes = []
  
  const MonthFilter = (index, resena) => {

    SumaResenasPorMes.push(resena)

    let suma = 0

    SumaResenasPorMes?.map(resena => suma = suma + resena?.calificacion)

    const totalSumado = suma/SumaResenasPorMes?.length

    const porcentage = (5*totalSumado) / 100

    return (showThreeMonth) ? (index >= Number(showThreeMonths[0] - 1) && index <= Number(showThreeMonths[1] - 1)) ? porcentage : 0 : porcentage
  }

  let calificacionPorMeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  if (showThreeMonth || showAllMonth) {
    for (let index = 0; index < 12; index++) {
      SumaResenasPorMes = []
  
      resena?.filter(resena => resena?.estado === true).map(resena => (
        (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
          ?
        calificacionPorMeses[index] = MonthFilter(index, resena)
          :
        null
      ))
    }
  }

  return calificacionPorMeses
}