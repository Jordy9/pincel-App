import moment from "moment"

export const filterEvaluacionUsuarioEquipoTodosMeses = (evaluacion, SumaEvaluacionesPorTodosLosMeses, showThreeMonth, showThreeMonths, usuarioFiltrado, calificacionPorMesesDeEquipos, changeDate, capacitacion) => {
    const MonthFilterTeam = (index, evaluacion) => {

        if (evaluacion !== undefined) {
          SumaEvaluacionesPorTodosLosMeses.push(evaluacion)
        }
      
        let suma = 0

        const evaluacionFiltroEstadoapacitacion = SumaEvaluacionesPorTodosLosMeses?.filter(evaluacion => capacitacion?.some(capacitacion => capacitacion?._id === evaluacion?.idCapacitacion && capacitacion?.publicar === true))
    
        evaluacionFiltroEstadoapacitacion?.map(evaluacion => suma = suma + evaluacion?.calificacion)
    
        const totalSumado = suma/evaluacionFiltroEstadoapacitacion?.length
    
        const porcentage = (5*totalSumado) / 100
    
        return (showThreeMonth) ? (index >= Number(showThreeMonths[0] - 1) && index <= Number(showThreeMonths[1] - 1)) ? porcentage : 0 : porcentage
    
    }

    if (usuarioFiltrado?.length !== 0) {
        for (let index = 0; index < 12; index++) {
          SumaEvaluacionesPorTodosLosMeses = []
      
          evaluacion?.filter(evaluacion => usuarioFiltrado?.some(usuario => evaluacion?.idUsuario === usuario?.id))?.map(evaluacion => (
            (moment(evaluacion.createdAt).format('M') - 1 === index && moment(evaluacion?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
              ?
            calificacionPorMesesDeEquipos[index] = MonthFilterTeam(index, evaluacion)
              :
            null
          ))
        }
    }

    return calificacionPorMesesDeEquipos
}

export const filterEvaluacionUsuarioEquipoRango = (evaluacion, usuarioFiltrado, evaluacionFilterArrayDate, changeDate, changeDateRange, selectRange, ArregloFilterDate, evaluacionFilterArray, capacitacion) => {
    if (usuarioFiltrado?.length !== 0) {
        evaluacionFilterArrayDate = evaluacion?.filter(
          evaluacion => (changeDate) 
            ?
          (changeDateRange && changeDate)
            ? 
          (moment(evaluacion?.createdAt, 'Y/M/D').isSameOrBefore(moment(changeDate, 'Y/M/D')) && moment(evaluacion?.createdAt, 'Y/M/D').isSameOrAfter(moment(changeDateRange, 'Y/M/D')))
            ||
          (moment(evaluacion?.createdAt, 'Y/M/D').isSameOrAfter(moment(changeDate, 'Y/M/D')) && moment(evaluacion?.createdAt, 'Y/M/D').isSameOrBefore(moment(changeDateRange, 'Y/M/D')))
            :
          moment(evaluacion?.createdAt, 'Y/M/D').isSame(moment(changeDate).format('Y/M/D'))
            : 
          (moment(evaluacion?.createdAt, 'Y/M/D').isSameOrBefore(moment(selectRange?.startDate, 'Y/M/D')) && moment(evaluacion?.createdAt, 'Y/M/D').isSameOrAfter(moment(selectRange?.endDate, 'Y/M/D')))
            ||
          (moment(evaluacion?.createdAt, 'Y/M/D').isSameOrAfter(moment(selectRange?.startDate, 'Y/M/D')) && moment(evaluacion?.createdAt, 'Y/M/D').isSameOrBefore(moment(selectRange?.endDate, 'Y/M/D')))
        )?.map(evaluacion => (evaluacionFilterArray.push(evaluacion)))
      }

      let suma = 0

      const evaluacionEquipo = evaluacionFilterArray?.filter(evaluacion => usuarioFiltrado?.some(usuario => evaluacion?.idUsuario === usuario?.id && capacitacion?.some(capacitacion => capacitacion?._id === evaluacion?.idCapacitacion && capacitacion?.publicar === true && capacitacion?.team?.some(team => team?.value === usuario?.id || team?.value === usuario?.team))))

      evaluacionEquipo?.map(evaluacion => suma = suma + evaluacion?.calificacion)

      const sumaTotal = suma/evaluacionEquipo?.length

      const porciento = (5*sumaTotal) / 100
      
    return [porciento?.toFixed(1), evaluacionEquipo?.length]
}