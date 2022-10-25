import moment from "moment"

export const filterResenaUsuarioEquipoTodosMeses = (resena, SumaResenasPorTodosLosMeses, showThreeMonth, showThreeMonths, usuarioFiltrado, calificacionPorMesesDeEquipos, changeDate) => {
    const MonthFilterTeam = (index, [resena]) => {

        if (resena !== undefined) {
          SumaResenasPorTodosLosMeses.push(resena)
        }
      
        let suma = 0
    
        SumaResenasPorTodosLosMeses?.map(resena => suma = suma + resena?.calificacion)
    
        const totalSumado = suma/SumaResenasPorTodosLosMeses?.length
    
        const porcentage = (5*totalSumado) / 100
    
        return (showThreeMonth) ? (index >= Number(showThreeMonths[0] - 1) && index <= Number(showThreeMonths[1] - 1)) ? [porcentage, SumaResenasPorTodosLosMeses?.length] : 0 : [porcentage, SumaResenasPorTodosLosMeses?.length]
    
    }

    if (usuarioFiltrado?.length !== 0) {
        for (let index = 0; index < 12; index++) {
          SumaResenasPorTodosLosMeses = []
      
          resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
            (resena.calificacion.filter(calificacion => usuarioFiltrado?.some(usuario => calificacion?.id?.includes(usuario?.id))))
              &&
            (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
              ?
            calificacionPorMesesDeEquipos[index] = MonthFilterTeam(index, resena.calificacion.filter(calificacion => usuarioFiltrado?.some(usuario => calificacion?.id?.includes(usuario?.id))))
              :
            null
          ))
        }
    }

    return calificacionPorMesesDeEquipos
}

export const filterResenaUsuarioEquipoRango = (resena, usuarioFiltrado, resenasFilterArrayDateAndEstado, changeDate, changeDateRange, selectRange, ArregloFilterDate, resenasFilterArray) => {
    if (usuarioFiltrado?.length !== 0) {
        resenasFilterArrayDateAndEstado = resena.filter(
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
      
          resenasFilterArrayDateAndEstado.filter(
            resena => resena?.estado === true 
              && 
            resena?.calificacion?.length !== 0
          )?.map(resena => (
            [ArregloFilterDate] = resena?.calificacion.filter(calificacion => usuarioFiltrado?.some(usuario => calificacion?.id?.includes(usuario?.id))),
            (ArregloFilterDate !== undefined)
              &&
            resenasFilterArray.push({calificacion: [ArregloFilterDate]})
          ))
      }
      
    return resenasFilterArray
}