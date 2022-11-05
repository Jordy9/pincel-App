import moment from "moment"

export const filterEvaluationGeneral = (evaluacion, changeDateRange, changeDate, selectRange, capacitacion) => {

    const evaluacionsFiltradasPorRango = evaluacion?.filter(
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
      )

      let suma = 0

      const evaluacionFiltroEstadoapacitacion = evaluacionsFiltradasPorRango?.filter(evaluacion => capacitacion?.some(capacitacion => capacitacion?._id === evaluacion?.idCapacitacion && capacitacion?.publicar === true))

      evaluacionFiltroEstadoapacitacion?.map(evaluacion => suma = suma + evaluacion?.calificacion)

      const sumaTotal = suma/evaluacionFiltroEstadoapacitacion?.length

      const porciento = (5*sumaTotal) / 100
    
      return [porciento?.toFixed(1), evaluacionFiltroEstadoapacitacion?.length, evaluacionFiltroEstadoapacitacion]
}

export const EvaluationfiltradasTodosMeses = (evaluacion, SumaEvaluacionPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, capacitacion) => {
    const MonthFilter = (index, evaluacion) => {

        SumaEvaluacionPorMes.push(evaluacion)
        
        let suma = 0

        const evaluacionFiltroEstadoapacitacion = SumaEvaluacionPorMes?.filter(evaluacion => capacitacion?.some(capacitacion => capacitacion?._id === evaluacion?.idCapacitacion && capacitacion?.publicar === true))
    
        evaluacionFiltroEstadoapacitacion?.map(evaluacion => suma = suma + evaluacion?.calificacion)
    
        const totalSumado = suma/evaluacionFiltroEstadoapacitacion?.length
    
        const porcentage = (5*totalSumado) / 100
    
        return (showThreeMonth) ? (index >= Number(showThreeMonths[0] - 1) && index <= Number(showThreeMonths[1] - 1)) ? porcentage : 0 : porcentage
    }

    if (showThreeMonth || showAllMonth) {
        for (let index = 0; index < 12; index++) {
          SumaEvaluacionPorMes = []
      
          evaluacion?.map(evaluacion => (
            (moment(evaluacion.createdAt).format('M') - 1 === index && moment(evaluacion?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
              ?
            calificacionPorMeses[index] = MonthFilter(index, evaluacion)
              :
            null
          ))
        }
    }

    return calificacionPorMeses
}

export const EvaluacionesfiltradasTodosMesesMayorQue = (evaluacion, SumaEvaluacionPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange, capacitacion) => {

    let mes = [moment(changeDate).format('M'), moment(changeDateRange).format('M')]
  
      const MonthFilterNew = (index, evaluacion) => {
  
        SumaEvaluacionPorMes.push(evaluacion)
        
        let suma = 0

        const evaluacionFiltroEstadoapacitacion = SumaEvaluacionPorMes?.filter(evaluacion => capacitacion?.some(capacitacion => capacitacion?._id === evaluacion?.idCapacitacion && capacitacion?.publicar === true))
    
        evaluacionFiltroEstadoapacitacion?.map(evaluacion => suma = suma + evaluacion?.calificacion)
    
        const totalSumado = suma/evaluacionFiltroEstadoapacitacion?.length
  
        const porcentage = (5*totalSumado) / 100
    
        return porcentage
    }
  
    let arregloNuevo = []
  
    let arregloUnion = []
  
    if (mes[0] > mes[1]) {
      for (let index = 0; index < 12; index++) {
        SumaEvaluacionPorMes = []
    
        evaluacion?.map(evaluacion => (
          (moment(evaluacion.createdAt).format('M') - 1 === index && moment(evaluacion?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
            ?
          calificacionPorMeses[index] = MonthFilterNew(index, evaluacion)
            :
          null
        ))
      }
      
      for (let index = 0; index < 12; index++) {
        SumaEvaluacionPorMes = []
    
        evaluacion?.map(evaluacion => (
          (moment(evaluacion.createdAt).format('M') - 1 === index && moment(evaluacion?.createdAt, 'Y').isSame(moment(changeDateRange).format('Y')))
            ?
          arregloNuevo[index] = MonthFilterNew(index, evaluacion)
            :
          null
        ))
      }
  
      arregloUnion = arregloNuevo?.filter(califi => califi !== 0)
  
      for (let index = arregloUnion?.length; index < arregloNuevo.length; index++) {
        
        arregloUnion.push(0)
      }
  
      if (arregloUnion?.length === 0) {
        for (let index = 0; index < 12; index++) {
        
          arregloUnion.push(0)
        }
      }
  
    }
  
    let arregloFinal = []
  
    let resta = (mes[0] - 1) - 11
  
    resta = (~resta + 1)
  
    arregloFinal = calificacionPorMeses.slice(mes[0] - 1, (mes[0]) + resta)
  
    arregloFinal.push(...arregloUnion.slice(0, mes[1]))
  
    return arregloFinal
  }

  export const EvaluacionesfiltradasTodosMesesMayorQueD = (evaluacion, SumaEvaluacionPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange, capacitacion) => {

    let mes = [moment(changeDate).format('M'), moment(changeDateRange).format('M')]
  
      const MonthFilterNew = (index, evaluacion) => {
  
        SumaEvaluacionPorMes.push(evaluacion)

        const evaluacionFiltroEstadoapacitacion = SumaEvaluacionPorMes?.filter(evaluacion => capacitacion?.some(capacitacion => capacitacion?._id === evaluacion?.idCapacitacion && capacitacion?.publicar === true))
        
        let suma = 0
    
        evaluacionFiltroEstadoapacitacion?.map(evaluacion => suma = suma + evaluacion?.calificacion)
    
        const totalSumado = suma/evaluacionFiltroEstadoapacitacion?.length
  
        const porcentage = (5*totalSumado) / 100
    
        return porcentage
    }
  
    let arregloNuevo = []
  
    let arregloUnion = []
  
    if (changeDate > changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y')) {
      for (let index = 0; index < 12; index++) {
        SumaEvaluacionPorMes = []
    
        evaluacion?.map(evaluacion => (
          (moment(evaluacion.createdAt).format('M') - 1 === index && moment(evaluacion?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
            ?
          calificacionPorMeses[index] = MonthFilterNew(index, evaluacion)
            :
          null
        ))
      }
      
      for (let index = 0; index < 12; index++) {
        SumaEvaluacionPorMes = []
    
        evaluacion?.map(evaluacion => (
          (moment(evaluacion.createdAt).format('M') - 1 === index && moment(evaluacion?.createdAt, 'Y').isSame(moment(changeDateRange).format('Y')))
            ?
          arregloNuevo[index] = MonthFilterNew(index, evaluacion)
            :
          null
        ))
      }
  
      arregloUnion = arregloNuevo?.filter(califi => califi !== 0)
  
      for (let index = arregloUnion?.length; index < arregloNuevo.length; index++) {
        arregloUnion.push(0)
      }
  
      if (arregloUnion?.length === 0) {
        for (let index = 0; index < 12; index++) {
          arregloUnion.push(0)
        }
      }
  
    }
  
    let arregloFinal = []
  
    let resta = (mes[0] - 1) - 11
  
    resta = (~resta + 1)
  
    arregloFinal = calificacionPorMeses.slice(mes[0] - 1, Number(mes[0]) + resta)
  
    arregloFinal.push(...arregloUnion.slice(0, mes[1]))
  
    return arregloFinal
  }

  export const EvaluacionesfiltradasTodosMesesMayorQueDUsuarioEquipo = (evaluacion, SumaEvaluacionPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange, usuarioFiltrado, capacitacion) => {

    let mes = [moment(changeDate).format('M'), moment(changeDateRange).format('M')]
  
      const MonthFilterNew = (index, evaluacion) => {
  
        SumaEvaluacionPorMes.push(evaluacion)

        const evaluacionFiltroEstadoapacitacion = SumaEvaluacionPorMes?.filter(evaluacion => capacitacion?.some(capacitacion => capacitacion?._id === evaluacion?.idCapacitacion && capacitacion?.publicar === true))
        
        let suma = 0
    
        evaluacionFiltroEstadoapacitacion?.map(evaluacion => suma = suma + evaluacion?.calificacion)
    
        const totalSumado = suma/evaluacionFiltroEstadoapacitacion?.length
  
        const porcentage = (5*totalSumado) / 100
    
        return porcentage
    }
  
    let arregloNuevo = []
  
    let arregloUnion = []
  
    if (changeDate > changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y')) {
      for (let index = 0; index < 12; index++) {
        SumaEvaluacionPorMes = []
    
        evaluacion?.filter(evaluacion => usuarioFiltrado?.some(usuario => evaluacion?.idUsuario === usuario?.id))?.map(evaluacion => (
          (moment(evaluacion.createdAt).format('M') - 1 === index && moment(evaluacion?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
            ?
          calificacionPorMeses[index] = MonthFilterNew(index, evaluacion)
            :
          null
        ))
      }
      
      for (let index = 0; index < 12; index++) {
        SumaEvaluacionPorMes = []
    
        evaluacion?.filter(evaluacion => usuarioFiltrado?.some(usuario => evaluacion?.idUsuario === usuario?.id))?.map(evaluacion => (
          (moment(evaluacion.createdAt).format('M') - 1 === index && moment(evaluacion?.createdAt, 'Y').isSame(moment(changeDateRange).format('Y')))
            ?
          arregloNuevo[index] = MonthFilterNew(index, evaluacion)
            :
          null
        ))
      }
  
      arregloUnion = arregloNuevo?.filter(califi => califi !== 0)
  
      for (let index = arregloUnion?.length; index < arregloNuevo.length; index++) {
        arregloUnion.push(0)
      }
  
      if (arregloUnion?.length === 0) {
        for (let index = 0; index < 12; index++) {
          arregloUnion.push(0)
        }
      }
  
    }
  
    let arregloFinal = []
  
    let resta = (mes[0] - 1) - 11
  
    resta = (~resta + 1)
  
    arregloFinal = calificacionPorMeses.slice(mes[0] - 1, Number(mes[0]) + resta)
  
    arregloFinal.push(...arregloUnion.slice(0, mes[1]))
  
    return arregloFinal
  }

  export const EvaluacionfiltradasTodosMesesMayorQueMenor = (evaluacion, SumaEvaluacionPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange, capacitacion) => {

    let mes = [moment(changeDate).format('M'), moment(changeDateRange).format('M')]
  
      const MonthFilterNew = (index, evaluacion) => {
  
        SumaEvaluacionPorMes.push(evaluacion)
        
        let suma = 0

        const evaluacionFiltroEstadoapacitacion = SumaEvaluacionPorMes?.filter(evaluacion => capacitacion?.some(capacitacion => capacitacion?._id === evaluacion?.idCapacitacion && capacitacion?.publicar === true))
    
        evaluacionFiltroEstadoapacitacion?.map(evaluacion => suma = suma + evaluacion?.calificacion)
    
        const totalSumado = suma/evaluacionFiltroEstadoapacitacion?.length
  
        const porcentage = (5*totalSumado) / 100
    
        return porcentage
    }
  
    let arregloNuevo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  
    // let arregloUnion = []
  
    if (changeDate < changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y')) {
      for (let index = 0; index < 12; index++) {
        SumaEvaluacionPorMes = []
    
        evaluacion?.map(evaluacion => (
          (moment(evaluacion.createdAt).format('M') - 1 === index && moment(evaluacion?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
            ?
          calificacionPorMeses[index] = MonthFilterNew(index, evaluacion)
            :
          null
        ))
      }
      
      for (let index = 0; index < 12; index++) {
        SumaEvaluacionPorMes = []
    
        evaluacion?.map(evaluacion => (
          (moment(evaluacion.createdAt).format('M') - 1 === index && moment(evaluacion?.createdAt, 'Y').isSame(moment(changeDateRange).format('Y')))
            ?
          arregloNuevo[index] = MonthFilterNew(index, evaluacion)
            :
          null
        ))
      }
      
      // arregloUnion = arregloNuevo?.filter(califi => califi !== 0)
  
      // console.log(arregloUnion)
  
      // for (let index = arregloUnion?.length; index < arregloNuevo.length; index++) {
      //   arregloUnion.push(0)
      // }
  
      // if (arregloUnion?.length === 0) {
      //   for (let index = 0; index < 12; index++) {
      //     arregloUnion.push(0)
      //   }
      // }
  
    }
  
    let arregloFinal = []
  
    let resta = (mes[0] - 1) - 11
  
    resta = (~resta + 1)
  
    arregloFinal = calificacionPorMeses.slice(mes[0] - 1, Number(mes[0]) + resta)
  
    arregloFinal.push(...arregloNuevo.slice(0, mes[1]))
  
    return arregloFinal
  }

  export const EvaluacionfiltradasTodosMesesMayorQueMenorUsuarioEquipo = (evaluacion, SumaEvaluacionPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange, usuarioFiltrado, capacitacion) => {

    let mes = [moment(changeDate).format('M'), moment(changeDateRange).format('M')]
  
      const MonthFilterNew = (index, evaluacion) => {
  
        SumaEvaluacionPorMes.push(evaluacion)
        
        let suma = 0

        const evaluacionFiltroEstadoapacitacion = SumaEvaluacionPorMes?.filter(evaluacion => capacitacion?.some(capacitacion => capacitacion?._id === evaluacion?.idCapacitacion && capacitacion?.publicar === true))
    
        evaluacionFiltroEstadoapacitacion?.map(evaluacion => suma = suma + evaluacion?.calificacion)
    
        const totalSumado = suma/evaluacionFiltroEstadoapacitacion?.length
  
        const porcentage = (5*totalSumado) / 100
    
        return porcentage
    }
  
    let arregloNuevo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  
    // let arregloUnion = []
  
    if (changeDate < changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y')) {
      for (let index = 0; index < 12; index++) {
        SumaEvaluacionPorMes = []
    
        evaluacion?.filter(evaluacion => usuarioFiltrado?.some(usuario => evaluacion?.idUsuario === usuario?.id))?.map(evaluacion => (
          (moment(evaluacion.createdAt).format('M') - 1 === index && moment(evaluacion?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
            ?
          calificacionPorMeses[index] = MonthFilterNew(index, evaluacion)
            :
          null
        ))
      }
      
      for (let index = 0; index < 12; index++) {
        SumaEvaluacionPorMes = []
    
        evaluacion?.filter(evaluacion => usuarioFiltrado?.some(usuario => evaluacion?.idUsuario === usuario?.id))?.map(evaluacion => (
          (moment(evaluacion.createdAt).format('M') - 1 === index && moment(evaluacion?.createdAt, 'Y').isSame(moment(changeDateRange).format('Y')))
            ?
          arregloNuevo[index] = MonthFilterNew(index, evaluacion)
            :
          null
        ))
      }
      
      // arregloUnion = arregloNuevo?.filter(califi => califi !== 0)
  
      // console.log(arregloUnion)
  
      // for (let index = arregloUnion?.length; index < arregloNuevo.length; index++) {
      //   arregloUnion.push(0)
      // }
  
      // if (arregloUnion?.length === 0) {
      //   for (let index = 0; index < 12; index++) {
      //     arregloUnion.push(0)
      //   }
      // }
  
    }
  
    let arregloFinal = []
  
    let resta = (mes[0] - 1) - 11
  
    resta = (~resta + 1)
  
    arregloFinal = calificacionPorMeses.slice(mes[0] - 1, Number(mes[0]) + resta)
  
    arregloFinal.push(...arregloNuevo.slice(0, mes[1]))
  
    return arregloFinal
  }