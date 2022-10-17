import moment from "moment"

export const ReseñasfiltradasTodosMeses = (resena, SumaResenasPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate) => {
    const MonthFilter = (index, resena) => {

        SumaResenasPorMes.push(resena)
        const filtroPorMes = SumaResenasPorMes.reduce(
          (previousValue, currentValue) => [...previousValue, ...currentValue?.calificacion],
          ['Alphabet'],
        )
    
        const sinAlphabet = filtroPorMes.splice(1)
    
        let suma = 0
    
        sinAlphabet?.map(resena => suma = suma + resena?.calificacion)
    
        const totalSumado = suma/sinAlphabet?.length
    
        const porcentage = (5*totalSumado) / 100
    
        return (showThreeMonth) ? (index >= Number(showThreeMonths[0] - 1) && index <= Number(showThreeMonths[1] - 1)) ? porcentage : 0 : porcentage
    }

    if (showThreeMonth || showAllMonth) {
        for (let index = 0; index < 12; index++) {
          SumaResenasPorMes = []
      
          resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
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

export const ReseñasfiltradasTodosMesesMayorQue = (resena, SumaResenasPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange) => {

  let mes = [moment(changeDate).format('M'), moment(changeDateRange).format('M')]

    const MonthFilterNew = (index, resena) => {

      SumaResenasPorMes.push(resena)
      const filtroPorMes = SumaResenasPorMes.reduce(
        (previousValue, currentValue) => [...previousValue, ...currentValue?.calificacion],
        ['Alphabet'],
      )
  
      const sinAlphabet = filtroPorMes.splice(1)
  
      let suma = 0
  
      sinAlphabet?.map(resena => suma = suma + resena?.calificacion)
  
      const totalSumado = suma/sinAlphabet?.length

      const porcentage = (5*totalSumado) / 100
  
      return porcentage
  }

  let arregloNuevo = []

  let arregloUnion = []

  if (mes[0] > mes[1]) {
    for (let index = 0; index < 12; index++) {
      SumaResenasPorMes = []
  
      resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
        (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
          ?
        calificacionPorMeses[index] = MonthFilterNew(index, resena)
          :
        null
      ))
    }
    
    for (let index = 0; index < 12; index++) {
      SumaResenasPorMes = []
  
      resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
        (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDateRange).format('Y')))
          ?
        arregloNuevo[index] = MonthFilterNew(index, resena)
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

export const ReseñasfiltradasTodosMesesMayorQueD = (resena, SumaResenasPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange) => {

  let mes = [moment(changeDate).format('M'), moment(changeDateRange).format('M')]

    const MonthFilterNew = (index, resena) => {

      SumaResenasPorMes.push(resena)
      const filtroPorMes = SumaResenasPorMes.reduce(
        (previousValue, currentValue) => [...previousValue, ...currentValue?.calificacion],
        ['Alphabet'],
      )
  
      const sinAlphabet = filtroPorMes.splice(1)
  
      let suma = 0
  
      sinAlphabet?.map(resena => suma = suma + resena?.calificacion)
  
      const totalSumado = suma/sinAlphabet?.length

      const porcentage = (5*totalSumado) / 100
  
      return porcentage
  }

  let arregloNuevo = []

  let arregloUnion = []

  if (changeDate > changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y')) {
    for (let index = 0; index < 12; index++) {
      SumaResenasPorMes = []
  
      resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
        (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
          ?
        calificacionPorMeses[index] = MonthFilterNew(index, resena)
          :
        null
      ))
    }
    
    for (let index = 0; index < 12; index++) {
      SumaResenasPorMes = []
  
      resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
        (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDateRange).format('Y')))
          ?
        arregloNuevo[index] = MonthFilterNew(index, resena)
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

export const ReseñasfiltradasTodosMesesMayorQueDUsuarioEquipo = (resena, SumaResenasPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange, usuarioFiltrado) => {

  let mes = [moment(changeDate).format('M'), moment(changeDateRange).format('M')]

    const MonthFilterNew = (index, resena) => {

      SumaResenasPorMes.push(resena)
      const filtroPorMes = SumaResenasPorMes.reduce(
        (previousValue, currentValue) => [...previousValue, ...currentValue?.calificacion],
        ['Alphabet'],
      )
  
      let sinAlphabet0 = filtroPorMes.splice(1)

      let sinAlphabet = sinAlphabet0?.filter(usuario => usuarioFiltrado?.some(usuarios => usuarios?.id === usuario?.id))
  
      let suma = 0
  
      sinAlphabet?.map(resena => suma = suma + resena?.calificacion)
  
      const totalSumado = suma/sinAlphabet?.length

      const porcentage = (5*totalSumado) / 100
  
      return porcentage
  }

  let arregloNuevo = []

  let arregloUnion = []

  if (changeDate > changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y')) {
    for (let index = 0; index < 12; index++) {
      SumaResenasPorMes = []
  
      resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
        (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
          ?
        calificacionPorMeses[index] = MonthFilterNew(index, resena)
          :
        null
      ))
    }
    
    for (let index = 0; index < 12; index++) {
      SumaResenasPorMes = []
  
      resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
        (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDateRange).format('Y')))
          ?
        arregloNuevo[index] = MonthFilterNew(index, resena)
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

export const ReseñasfiltradasTodosMesesMayorQueMenor = (resena, SumaResenasPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange) => {

  let mes = [moment(changeDate).format('M'), moment(changeDateRange).format('M')]

    const MonthFilterNew = (index, resena) => {

      SumaResenasPorMes.push(resena)
      const filtroPorMes = SumaResenasPorMes.reduce(
        (previousValue, currentValue) => [...previousValue, ...currentValue?.calificacion],
        ['Alphabet'],
      )
  
      const sinAlphabet = filtroPorMes.splice(1)
  
      let suma = 0
  
      sinAlphabet?.map(resena => suma = suma + resena?.calificacion)
  
      const totalSumado = suma/sinAlphabet?.length

      const porcentage = (5*totalSumado) / 100
  
      return porcentage
  }

  let arregloNuevo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  // let arregloUnion = []

  if (changeDate < changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y')) {
    for (let index = 0; index < 12; index++) {
      SumaResenasPorMes = []
  
      resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
        (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
          ?
        calificacionPorMeses[index] = MonthFilterNew(index, resena)
          :
        null
      ))
    }
    
    for (let index = 0; index < 12; index++) {
      SumaResenasPorMes = []
  
      resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
        (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDateRange).format('Y')))
          ?
        arregloNuevo[index] = MonthFilterNew(index, resena)
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

export const ReseñasfiltradasTodosMesesMayorQueMenorUsuarioEquipo = (resena, SumaResenasPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange, usuarioFiltrado) => {

  let mes = [moment(changeDate).format('M'), moment(changeDateRange).format('M')]

    const MonthFilterNew = (index, resena) => {

      SumaResenasPorMes.push(resena)
      const filtroPorMes = SumaResenasPorMes.reduce(
        (previousValue, currentValue) => [...previousValue, ...currentValue?.calificacion],
        ['Alphabet'],
      )

      let sinAlphabet0 = filtroPorMes.splice(1)
  
      let sinAlphabet = sinAlphabet0?.filter(usuario => usuarioFiltrado?.some(usuarios => usuarios?.id === usuario?.id))
  
      let suma = 0
  
      sinAlphabet?.map(resena => suma = suma + resena?.calificacion)
  
      const totalSumado = suma/sinAlphabet?.length

      const porcentage = (5*totalSumado) / 100
  
      return porcentage
  }

  let arregloNuevo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  // let arregloUnion = []

  if (changeDate < changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y')) {
    for (let index = 0; index < 12; index++) {
      SumaResenasPorMes = []
  
      resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
        (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
          ?
        calificacionPorMeses[index] = MonthFilterNew(index, resena)
          :
        null
      ))
    }
    
    for (let index = 0; index < 12; index++) {
      SumaResenasPorMes = []
  
      resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
        (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDateRange).format('Y')))
          ?
        arregloNuevo[index] = MonthFilterNew(index, resena)
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

export const filterResenaRango = (resena, changeDate, changeDateRange, selectRange) => {
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
    
      return resenasFiltradasPorRango?.filter(
        resena => resena?.calificacion?.length !== 0
      )
}