import moment from "moment"

export const filterCapacitacionGeneral = (capacitacion, changeDateRange, changeDate, selectRange) => {

    const capacitacionsFiltradasPorRango = capacitacion?.filter(
        capacitacion => (changeDate) 
          ?
        (changeDateRange && changeDate)
          ? 
        (moment(capacitacion?.createdAt, 'Y/M/D').isSameOrBefore(moment(changeDate, 'Y/M/D')) && moment(capacitacion?.createdAt, 'Y/M/D').isSameOrAfter(moment(changeDateRange, 'Y/M/D')))
          ||
        (moment(capacitacion?.createdAt, 'Y/M/D').isSameOrAfter(moment(changeDate, 'Y/M/D')) && moment(capacitacion?.createdAt, 'Y/M/D').isSameOrBefore(moment(changeDateRange, 'Y/M/D')))
          :
        moment(capacitacion?.createdAt, 'Y/M/D').isSame(moment(changeDate).format('Y/M/D'))
          : 
        (moment(capacitacion?.createdAt, 'Y/M/D').isSameOrBefore(moment(selectRange?.startDate, 'Y/M/D')) && moment(capacitacion?.createdAt, 'Y/M/D').isSameOrAfter(moment(selectRange?.endDate, 'Y/M/D')))
          ||
        (moment(capacitacion?.createdAt, 'Y/M/D').isSameOrAfter(moment(selectRange?.startDate, 'Y/M/D')) && moment(capacitacion?.createdAt, 'Y/M/D').isSameOrBefore(moment(selectRange?.endDate, 'Y/M/D')))
      )

    let capacitacionFiltradaFinal = []
    
    capacitacionFiltradaFinal = capacitacionsFiltradasPorRango?.filter(capacitacion => capacitacion?.publicar === true)
    
    return capacitacionFiltradaFinal
}