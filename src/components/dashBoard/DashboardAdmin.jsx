import React, { useEffect, useState } from 'react'
import { Sidebar } from '../Sidebar'
import { CardsAdmin } from './CardsAdmin'
import { TableAdmin } from './TableAdmin'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useGreeting } from '../../hooks/useGreeting'
import { ModalTeam } from './ModalTeam'
import { MultiSelect } from 'react-multi-select-component'
import { createStaticRanges, DateRange, DateRangePicker, DefinedRange } from 'react-date-range';
import { es } from 'react-date-range/dist/locale'
import { 
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  differenceInCalendarDays,
  startOfYear,
  addYears,
  endOfYear,
 } from 'date-fns'
import { useResponsive } from '../../hooks/useResponsive'

export const DashboardAdmin = () => {
  
  // Importacion de estados
  const { resena } = useSelector(state => state.rs);

  const { name, usuarios } = useSelector(state => state.auth);

  const { equipos } = useSelector(state => state.eq);

  const [showThreeMonth, setShowThreeMonth] = useState(false)

  const [showThreeMonths, setShowThreeMonths] = useState(false)

  // useState Para Manejar los filtros

  const [FiltroChange, setFiltroChange] = useState([])

  const [changeDate, setChangeDate] = useState()

  const [changeDateRange, setChangeDateRange] = useState()
  
  let usuariosToFilter = []

  // Filtro de usuarios para filtrar ya sea por usuario o por equipo

  equipos?.map(equipo => usuariosToFilter.push({label: `Equipo de ${equipo?.name}`, value: equipo.name, team: true}))

  usuarios?.map(usuario => usuariosToFilter.push({label: usuario?.name, value: usuario?.id, team: false}))

  let usuarioFiltrado

  (FiltroChange?.some(filtro => filtro?.team === true)) 
    ?
  usuarioFiltrado = usuarios?.filter(usuario => FiltroChange.some(FiltroChange => usuario?.team?.includes(FiltroChange.value)))
    :
  usuarioFiltrado = usuarios?.filter(usuario => FiltroChange.some(FiltroChange => usuario?.id?.includes(FiltroChange.value)))

  // Filtro de las reseñas por usuario o equipos
  
  let resenasFilterArrayDateAndEstado = []

  let resenasFilterArray = []

  let ArregloFilterDate

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
    moment(resena?.createdAt, 'Y/M').isSame(moment().format('Y/M'))
    
    )

    resenasFilterArrayDateAndEstado.filter(
      resena => resena?.estado === true 
        && 
      resena?.calificacion?.length !== 0
    ).map(resena => (
      [ArregloFilterDate] = resena.calificacion.filter(calificacion => usuarioFiltrado.some(usuario => calificacion.id.includes(usuario.id))),
      (ArregloFilterDate !== undefined)
        &&
      resenasFilterArray.push({calificacion: [ArregloFilterDate]})
    ))

  // Filtro de las resenas por usuarios o equipos de todos los meses

  let SumaResenasPorTodosLosMeses = []

  const MonthFilterTeam = (index, [resena]) => {

    if (resena !== undefined) {
      SumaResenasPorTodosLosMeses.push(resena)
    }
  
    let suma = 0

    SumaResenasPorTodosLosMeses?.map(resena => suma = suma + resena?.calificacion)

    const totalSumado = suma/SumaResenasPorTodosLosMeses?.length

    const porcentage = (5*totalSumado) / 100

    return (showThreeMonth) ? (index >= Number(showThreeMonths[0] - 1) && index <= Number(showThreeMonths[1] - 1)) ? porcentage : 0 : porcentage

  }

  let calificacionPorMesesDeEquipos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  
  for (let index = 0; index < 12; index++) {
    SumaResenasPorTodosLosMeses = []

    resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
      (resena.calificacion.filter(calificacion => usuarioFiltrado.some(usuario => calificacion.id.includes(usuario.id))))
        &&
      (moment(resena.createdAt).format('M') - 1 === index && moment(resena?.createdAt, 'Y').isSame(moment(changeDate).format('Y')))
        ?
      calificacionPorMesesDeEquipos[index] = MonthFilterTeam(index, resena.calificacion.filter(calificacion => usuarioFiltrado.some(usuario => calificacion.id.includes(usuario.id))))
        :
      null
    ))
  }

  // Filtro de las resenas por fecha y rango de fecha en general
  
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
    moment(resena?.createdAt, 'Y/M').isSame(moment().format('Y/M'))
  )

  const resenasFiltradas = resenasFiltradasPorRango?.filter(
    resena => resena?.estado === true
      && 
    resena?.calificacion?.length !== 0
  )

  // Reseñas filtradas por los meses

  let SumaResenasPorMes = []
  
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

  let calificacionPorMeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  useEffect(() => {

    if (showThreeMonth) {
      setShowThreeMonths([moment(changeDate).format('M'), moment(changeDateRange).format('M')])
    }
    
  }, [showThreeMonth, changeDate, changeDateRange])

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

  // Fin de los filtros

  const { greet } = useGreeting()

  const [modalTeam, setModalTeam] = useState(false)

  const defineds = {
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
    startOfLastThreeMonths: startOfMonth(addMonths(new Date(), -3)),
    endOfLastThreeMonths: endOfMonth(addMonths(new Date(), -1)),
    startOfYear: startOfYear(addYears(new Date(), 0)),
    endOfYear: endOfYear(addYears(new Date(), 0)),
  };

  const [selectRange, setSelectRange] = useState(
    {
      startDate: defineds.startOfMonth,
      endDate: defineds.endOfMonth,
      key: 'selection',
      AllMonth: false,
      ThreeMonth: false
    }
  )

  const staticRanges = createStaticRanges([
    {
      label: 'Hoy',
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfToday,
        AllMonth: false,
        ThreeMonth: false
      }),
    },
    {
      label: 'Esta semana',
      range: () => ({
        startDate: defineds.startOfWeek,
        endDate: defineds.endOfWeek,
        AllMonth: false,
        ThreeMonth: false
      }),
    },
    {
      label: 'Semana pasada',
      range: () => ({
        startDate: defineds.startOfLastWeek,
        endDate: defineds.endOfLastWeek,
        AllMonth: false,
        ThreeMonth: false
      }),
    },
    {
      label: 'Este mes',
      range: () => ({
        startDate: defineds.startOfMonth,
        endDate: defineds.endOfMonth,
        AllMonth: false,
        ThreeMonth: false
      }),
    },
    {
      label: 'Mes pasado',
      range: () => ({
        startDate: defineds.startOfLastMonth,
        endDate: defineds.endOfLastMonth,
        AllMonth: false,
        ThreeMonth: false
      }),
    },
    {
      label: 'Hace 3 meses',
      range: () => ({
        startDate: defineds.startOfLastThreeMonths,
        endDate: defineds.endOfLastThreeMonths,
        AllMonth: true,
        ThreeMonth: true
      }),
    },
    {
      label: "Este año",
      range: () => ({
        startDate: defineds.startOfYear,
        endDate: defineds.endOfYear,
        AllMonth: true,
        ThreeMonth: false
      })
    },
    {
      label: "Año pasado",
      range: () => ({
        startDate: moment()
          .subtract(1, "years")
          .startOf("year")
          .toDate(),
        endDate: moment()
          .subtract(1, "years")
          .endOf("year")
          .toDate(),
        AllMonth: true,
        ThreeMonth: false
      })
    }
  ]);

  const [showAllMonth, setShowAllMonth] = useState(false)

  const handledRange = (range) => {
    setSelectRange(range)
    setChangeDate(range.startDate)
    setChangeDateRange(range.endDate)
    setShowAllMonth(range.AllMonth)
    setShowThreeMonth(range.ThreeMonth)
  }

  useEffect(() => {
    if (!showAllMonth && moment(changeDate).format('M') !== moment(changeDateRange).format('M')) {
      setShowAllMonth(true)
      setShowThreeMonth(true)
    }
  }, [showAllMonth, changeDate, changeDateRange])
  

  const [showFilter, setShowFilter] = useState(false)

  const [ respWidth ] = useResponsive()

  return (
    <Sidebar>
        <div className='text-black p-4'>
          <h1>{greet}, <span className='text-muted'>{name}</span></h1>
          {
            (usuariosToFilter)
              &&
            <MultiSelect
              options={usuariosToFilter}
              value={FiltroChange}
              onChange={setFiltroChange}
              labelledBy="Select"
              hasSelectAll = {false}
            />
          }

          {
            (showFilter && respWidth >= 610)
              &&
            <DateRangePicker
              weekStartsOn={0}
              staticRanges={staticRanges}
              inputRanges = {[]}
              locale={es}
              ranges={[selectRange]}
              onChange={(range) => handledRange(range.selection)}
            />
          }

          <div className='my-1' style={{justifyContent: 'space-between', display: 'flex'}}>
            <button onClick={() => setShowFilter(!showFilter)} type='button' className='btn btn-primary'>{(!showFilter) ? 'Filtrar' : 'Cerrar ventana de filtro'}</button>
            <button onClick={() => setModalTeam(true)} type='button' className='btn btn-primary'>Equipos</button>
          </div>

          {
            (showFilter && respWidth <= 609)
              &&
            <>
              <DateRange
                direction='vertical'
                editableDateInputs={true}
                onChange={(range) => handledRange(range.selection)}
                moveRangeOnFirstSelection={false}
                ranges={[selectRange]}
              />

              <DefinedRange
                staticRanges={staticRanges}
                ranges={[selectRange]}
                inputRanges = {[]}
                onChange={(range) => handledRange(range.selection)}
              />
            </>
          }

          <div className="row my-3">
            <CardsAdmin 
              resenasFiltradas = {(resenasFilterArray?.length !== 0) ? resenasFilterArray : (FiltroChange?.length === 0) && resenasFiltradas} 
              mes = {[moment(changeDate).format('M'), moment(changeDateRange).format('M')]} 
              calificacionPorMeses = {(usuarioFiltrado?.length !== 0) ? calificacionPorMesesDeEquipos : calificacionPorMeses}
              show = {showAllMonth}
            />
          </div>

          <div className="row">
            <TableAdmin usuarioFiltrado = {(usuarioFiltrado?.length !== 0) ? usuarioFiltrado : usuarios} />
          </div>
      </div>

      {
        (modalTeam)
          &&
        <ModalTeam modalTeam  = {modalTeam} setModalTeam = {setModalTeam}  />
      }
    </Sidebar>
  )
}
