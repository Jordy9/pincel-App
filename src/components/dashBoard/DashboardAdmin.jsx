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
import { useDispatch } from 'react-redux'
import { filterResenaSlice, showFilter0 } from '../../store/resena/resenaSlice'
import { filterCustomResena, filterCustomResenaTodosMeses } from '../../helper/filterCustomResena'
import { CardsAdminCustomResena } from './CardsAdminCustomResena'
import { filterResenaRango, ReseñasfiltradasTodosMeses, ReseñasfiltradasTodosMesesMayorQue, ReseñasfiltradasTodosMesesMayorQueD, ReseñasfiltradasTodosMesesMayorQueDUsuarioEquipo, ReseñasfiltradasTodosMesesMayorQueMenor, ReseñasfiltradasTodosMesesMayorQueMenorUsuarioEquipo, ReseñasfiltradasTodosMesesMenorQue } from '../../helper/filterResena'
import { filterResenaUsuarioEquipoRango, filterResenaUsuarioEquipoTodosMeses } from '../../helper/filterResenaTeamUser'
import { filterCustomResenaSlice } from '../../store/customResena/customResenaSlice'
import { obtenerResena, showError } from '../../store/resena/thunk'
import { EvaluacionesfiltradasTodosMesesMayorQue, EvaluacionesfiltradasTodosMesesMayorQueD, EvaluacionesfiltradasTodosMesesMayorQueDUsuarioEquipo, EvaluacionfiltradasTodosMesesMayorQueMenor, EvaluacionfiltradasTodosMesesMayorQueMenorUsuarioEquipo, EvaluationfiltradasTodosMeses, filterEvaluationGeneral } from '../../helper/filterEvaluation'
import { filterEvaluacionUsuarioEquipoTodosMeses, filterEvaluacionUsuarioEquipoRango } from '../../helper/filterEvaluationTeamUser'
import { filterCapacitacionGeneral, filterCapacitacionGeneralVideos } from '../../helper/filterCapacitacion'
import { filterCapacitacionSlice, filterCapacitacionVideoSlice } from '../../store/capacitacion/capacitacionSlice'
import { filterEvaluacionSlice } from '../../store/evaluacion/evaluacionSlice'

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

export const DashboardAdmin = () => {

  const dispatch = useDispatch()
  
  // Importacion de estados
  const { resena } = useSelector(state => state.rs);

  const { name, usuarios } = useSelector(state => state.auth);

  const { equipos } = useSelector(state => state.eq);

  const { toShowResena, showResena } = useSelector(state => state.to);

  const { evaluacion } = useSelector(state => state.ev);

  const { capacitacion } = useSelector(state => state.cp);

  const [changeShowResena, setChangeShowResena] = useState('Normal')

  // useEffect(() => {
  //   setChangeShowResena(toShowResena[0]?.showResena)
  // }, [toShowResena])
  
  const { resena: customResena } = useSelector(state => state.cr);

  const [showThreeMonth, setShowThreeMonth] = useState(false)

  const [showThreeMonths, setShowThreeMonths] = useState(false)

  const [chargeUsersTeam, setChargeUsersTeam] = useState(false)

  const [showAllMonth, setShowAllMonth] = useState(false)

  const [showThisWeek, setShowThisWeek] = useState(false)

  const [showLastWeek, setShowLastWeek] = useState(false)

  const [onlyThreeMonths, setOnlyThreeMonths] = useState(false)

  const [selectRange, setSelectRange] = useState(
    {
      startDate: defineds?.startOfMonth,
      endDate: defineds?.endOfMonth,
      key: 'selection',
      AllMonth: false,
      ThreeMonth: false
    }
  )

  // useState Para Manejar los filtros

  const [FiltroChange, setFiltroChange] = useState([])

  const [changeDate, setChangeDate] = useState()

  const [changeDateRange, setChangeDateRange] = useState()
  
  let usuariosToFilter = []

  // Filtro de usuarios para filtrar ya sea por usuario o por equipo

  if (chargeUsersTeam) {
    equipos?.map(equipo => usuariosToFilter.push({label: `Equipo de ${equipo?.name}`, value: equipo.name, team: true}))
    usuarios?.filter(usuarios => !usuarios?.name?.includes('Jordy') && usuarios?.estado === true)?.map(usuario => usuariosToFilter.push({label: usuario?.name, value: usuario?.id, team: false}))
  }

  let mes = [moment(changeDate).format('M'), moment(changeDateRange).format('M')]

  let usuarioFiltrado

  (FiltroChange?.some(filtro => filtro?.team === true))
    ?
  usuarioFiltrado = usuarios?.filter(usuario => FiltroChange?.some(FiltroChange => usuario?.team?.includes(FiltroChange?.value)))
    :
  usuarioFiltrado = usuarios?.filter(usuario => FiltroChange?.some(FiltroChange => usuario?.id?.includes(FiltroChange?.value)))

  // Filtro de las reseñas por usuario o equipos
  
  let resenasFilterArrayDateAndEstado = []

  let resenasFilterArray = []

  let ArregloFilterDate

  resenasFilterArray = filterResenaUsuarioEquipoRango(resena, usuarioFiltrado, resenasFilterArrayDateAndEstado, changeDate, changeDateRange, selectRange, ArregloFilterDate, resenasFilterArray)

  // Filtro de las resenas por usuarios o equipos de todos los meses

  let SumaResenasPorTodosLosMeses = []

  let calificacionPorMesesDeEquipos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  calificacionPorMesesDeEquipos = filterResenaUsuarioEquipoTodosMeses(resena, SumaResenasPorTodosLosMeses, showThreeMonth, showThreeMonths, usuarioFiltrado, calificacionPorMesesDeEquipos, changeDate)

  // Filtro de las resenas por fecha y rango de fecha en general

  const resenasFiltradas = resena

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    if (selectRange.startDate && selectRange.endDate) {
      dispatch(obtenerResena(
        moment(selectRange.startDate).format('YYYY-MM-DDTHH:mm:ss'),
        moment(selectRange.endDate).format('YYYY-MM-DDTHH:mm:ss'),
        setIsLoading
      ))
    }
    
  }, [dispatch, selectRange.startDate, selectRange.endDate])

  // Reseñas filtradas por los meses

  let SumaResenasPorMes = []

  useEffect(() => {

    if (showThreeMonth) {
      setShowThreeMonths([moment(changeDate).format('M'), moment(changeDateRange).format('M')])
    }
    
  }, [showThreeMonth, changeDate, changeDateRange])

  useEffect(() => {
    if (moment(changeDateRange , 'M/YY').diff(moment(changeDate, 'M/YY'), 'months') > 0 || moment(changeDate , 'M/YY').diff(moment(changeDateRange, 'M/YY'), 'months') > 0) {
      setShowThreeMonth(true)
      setShowAllMonth(true)
    }
  }, [changeDate, changeDateRange])

  const [calificacionPorMeses, setcalificacionPorMeses] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {
    let calificacionPorMeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    if ((showThreeMonth || showAllMonth) && moment(changeDate).format('Y') === moment(changeDateRange).format('Y')) {
      setcalificacionPorMeses(ReseñasfiltradasTodosMeses(resena, SumaResenasPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange))
    }
  
    if (mes[0] - 1 > mes[1] && moment(changeDate).format('Y') === moment(changeDateRange).format('Y')) {
      setcalificacionPorMeses(ReseñasfiltradasTodosMesesMayorQue(resena, SumaResenasPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange))
    }
  
    if (changeDate > changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y') && usuarioFiltrado?.length === 0) {
      setcalificacionPorMeses(ReseñasfiltradasTodosMesesMayorQueD(resena, SumaResenasPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange))
    }
  
    if (changeDate > changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y') && usuarioFiltrado?.length !== 0) {
      setcalificacionPorMeses(ReseñasfiltradasTodosMesesMayorQueDUsuarioEquipo(resena, SumaResenasPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange, usuarioFiltrado))
    }
  
    if (changeDate < changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y') && usuarioFiltrado?.length === 0) {
      setcalificacionPorMeses(ReseñasfiltradasTodosMesesMayorQueMenor(resena, SumaResenasPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange))
    }
  
    if (changeDate < changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y') && usuarioFiltrado?.length !== 0) {
      setcalificacionPorMeses(ReseñasfiltradasTodosMesesMayorQueMenorUsuarioEquipo(resena, SumaResenasPorMes, showThreeMonth, showThreeMonths, showAllMonth, calificacionPorMeses, changeDate, changeDateRange, usuarioFiltrado))
    }
  }, [resena])
 
  // Fin de los filtros de resena

  // Filtros de las evaluaciones
  
  // Filtro general por rango

  const evaluacionFiltradaPorRango = filterEvaluationGeneral(evaluacion, changeDateRange, changeDate, selectRange, capacitacion)

  const capacitacionFiltradaPorRango = filterCapacitacionGeneral(capacitacion, changeDateRange, changeDate, selectRange)

  const capacitacionFiltradaPorRangoDeVideo = filterCapacitacionGeneralVideos(capacitacion, changeDateRange, changeDate, selectRange)

  // Filtro todos los meses

  let SumaEvaluacionPorMes = []

  let CalificacionEvaluacionPorMes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  if ((showThreeMonth || showAllMonth) && moment(changeDate).format('Y') === moment(changeDateRange).format('Y')) {
    CalificacionEvaluacionPorMes = EvaluationfiltradasTodosMeses(evaluacion, SumaEvaluacionPorMes, showThreeMonth, showThreeMonths, showAllMonth, CalificacionEvaluacionPorMes, changeDate, capacitacion)
  }

  if (mes[0] - 1 > mes[1] && moment(changeDate).format('Y') === moment(changeDateRange).format('Y')) {
    CalificacionEvaluacionPorMes = EvaluacionesfiltradasTodosMesesMayorQue(evaluacion, SumaEvaluacionPorMes, showThreeMonth, showThreeMonths, showAllMonth, CalificacionEvaluacionPorMes, changeDate, changeDateRange, capacitacion)
  }

  if (changeDate > changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y') && usuarioFiltrado?.length === 0) {
    CalificacionEvaluacionPorMes = EvaluacionesfiltradasTodosMesesMayorQueD(evaluacion, SumaEvaluacionPorMes, showThreeMonth, showThreeMonths, showAllMonth, CalificacionEvaluacionPorMes, changeDate, changeDateRange, capacitacion)
  }

  if (changeDate > changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y') && usuarioFiltrado?.length !== 0) {
    CalificacionEvaluacionPorMes = EvaluacionesfiltradasTodosMesesMayorQueDUsuarioEquipo(evaluacion, SumaEvaluacionPorMes, showThreeMonth, showThreeMonths, showAllMonth, CalificacionEvaluacionPorMes, changeDate, changeDateRange, usuarioFiltrado, capacitacion)
  }

  if (changeDate < changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y') && usuarioFiltrado?.length === 0) {
    CalificacionEvaluacionPorMes = EvaluacionfiltradasTodosMesesMayorQueMenor(evaluacion, SumaEvaluacionPorMes, showThreeMonth, showThreeMonths, showAllMonth, CalificacionEvaluacionPorMes, changeDate, changeDateRange, capacitacion)
  }

  if (changeDate < changeDateRange && moment(changeDate).format('Y') !== moment(changeDateRange).format('Y') && usuarioFiltrado?.length !== 0) {
    CalificacionEvaluacionPorMes = EvaluacionfiltradasTodosMesesMayorQueMenorUsuarioEquipo(evaluacion, SumaEvaluacionPorMes, showThreeMonth, showThreeMonths, showAllMonth, CalificacionEvaluacionPorMes, changeDate, changeDateRange, usuarioFiltrado, capacitacion)
  }

  // Filtros de evaluaciones por equipo o usuario por todos los meses

  let SumaEvaluacionesPorTodosLosMeses = []

  let calificacionEvaluacionPorMesesDeEquipos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  let evaluacionFilterArrayDate = []

  let evaluacionFilterArray = []

  let ArregloFilterDateEvaluacion

  evaluacionFilterArray = filterEvaluacionUsuarioEquipoRango(evaluacion, usuarioFiltrado, evaluacionFilterArrayDate, changeDate, changeDateRange, selectRange, ArregloFilterDateEvaluacion, evaluacionFilterArray, capacitacion)

  calificacionEvaluacionPorMesesDeEquipos = filterEvaluacionUsuarioEquipoTodosMeses(evaluacion, SumaEvaluacionesPorTodosLosMeses, showThreeMonth, showThreeMonths, usuarioFiltrado, calificacionEvaluacionPorMesesDeEquipos, changeDate, capacitacion)

  // Fin de los filtros de las evaluaciones

  const { greet } = useGreeting()

  const [modalTeam, setModalTeam] = useState(false)

  const staticRanges = createStaticRanges([
    {
      label: 'Este mes',
      range: () => ({
        startDate: defineds?.startOfMonth,
        endDate: defineds?.endOfMonth,
        AllMonth: false,
        ThreeMonth: false,
        thisWeek: false,
        lastWeek: false,
        onlyThreeMonth: false,
        key: 'selection',
      }),
    },
    {
      label: 'Hoy',
      range: () => ({
        startDate: defineds?.startOfToday,
        endDate: defineds?.endOfToday,
        AllMonth: false,
        ThreeMonth: false,
        thisWeek: false,
        lastWeek: false,
        onlyThreeMonth: false,
        key: 'selection',
      }),
    },
    {
      label: 'Esta semana',
      range: () => ({
        startDate: defineds?.startOfWeek,
        endDate: defineds?.endOfWeek,
        AllMonth: false,
        ThreeMonth: false,
        thisWeek: true,
        lastWeek: false,
        onlyThreeMonth: false,
        key: 'selection',
      }),
    },
    {
      label: 'Semana pasada',
      range: () => ({
        startDate: defineds?.startOfLastWeek,
        endDate: defineds?.endOfLastWeek,
        AllMonth: false,
        ThreeMonth: false,
        thisWeek: false,
        lastWeek: true,
        onlyThreeMonth: false,
        key: 'selection',
      }),
    },
    {
      label: 'Mes pasado',
      range: () => ({
        startDate: defineds?.startOfLastMonth,
        endDate: defineds?.endOfLastMonth,
        AllMonth: false,
        ThreeMonth: false,
        thisWeek: false,
        lastWeek: false,
        onlyThreeMonth: false,
        key: 'selection',
      }),
    },
    {
      label: 'Hace 3 meses',
      range: () => ({
        startDate: defineds?.startOfLastThreeMonths,
        endDate: defineds?.endOfLastThreeMonths,
        AllMonth: false,
        ThreeMonth: true,
        thisWeek: false,
        lastWeek: false,
        onlyThreeMonth: true,
        key: 'selection',
      }),
    },
    {
      label: "Este año",
      range: () => ({
        startDate: defineds?.startOfYear,
        endDate: defineds?.endOfYear,
        AllMonth: true,
        ThreeMonth: false,
        thisWeek: false,
        lastWeek: false,
        onlyThreeMonth: false,
        key: 'selection',
      })
    }
  ]);

  const [showFilter, setShowFilter] = useState(false)

  const [markButton, setMarkButton ] = useState('Este mes')

  const handledRange = (range, label) => {
    setSelectRange(range)
    setChangeDate(range?.startDate)
    setChangeDateRange(range?.endDate)
    setShowAllMonth(range?.AllMonth)
    setShowThreeMonth(range?.ThreeMonth)
    setShowThisWeek(range?.thisWeek)
    setShowLastWeek(range?.lastWeek)
    setOnlyThreeMonths(range?.onlyThreeMonth)

    if (range?.startDate !== range?.endDate) {
      setShowFilter(false)
    }

    if (label) {
      setMarkButton(label)
    }
  }

  useEffect(() => {
    if (!showAllMonth && moment(changeDate).format('M') !== moment(changeDateRange).format('M') && moment(defineds.endOfMonth, 'M/D/YY').diff(changeDate, 'days') === 7) {
      setShowAllMonth(true)
      setShowThreeMonth(true)
    }
  }, [showAllMonth, changeDate, changeDateRange])

  const [ respWidth ] = useResponsive()

  const [showFloat, setShowFloat] = useState(false)

  const [showTransp, setShowTransp] = useState(false)

  useEffect(() => {
    if (changeShowResena === 'Normal') {
      dispatch(filterResenaSlice(resenasFiltradas))
    }
    
  }, [changeDate, changeDateRange, dispatch])

  useEffect(() => {
    if (capacitacionFiltradaPorRango) {
      dispatch(filterCapacitacionSlice(capacitacionFiltradaPorRango))
      dispatch(filterCapacitacionVideoSlice(capacitacionFiltradaPorRangoDeVideo))
    }
    
  }, [changeDate, changeDateRange, dispatch])

  useEffect(() => {
    if (evaluacionFiltradaPorRango[2]) {
      dispatch(filterEvaluacionSlice(evaluacionFiltradaPorRango[2]))
    }
    
  }, [changeDate, changeDateRange, dispatch])

  useEffect(() => {
    if (moment(changeDateRange).diff(changeDate, 'days') > 364) {
      setSelectRange(
        {
          startDate: defineds?.startOfMonth,
          endDate: defineds?.endOfMonth,
          AllMonth: false,
          ThreeMonth: false,
          thisWeek: false,
          lastWeek: false,
          key: 'selection',
        }
      )

      setChangeDate(defineds?.startOfMonth)
      setChangeDateRange(defineds?.endOfMonth)

      dispatch(showError())
    }
  }, [changeDateRange, changeDate, dispatch])

  useEffect(() => {
    if (usuarioFiltrado?.length !== 0) {
      dispatch(showFilter0(false))
    } else {
      dispatch(showFilter0(true))
    }
  }, [usuarioFiltrado, dispatch])

  // Filtro por rango de las reseñas personalizadas

  const customResenaPorRango = filterCustomResena(customResena, changeDate, changeDateRange, selectRange)

  useEffect(() => {

    if (changeShowResena === 'Custom') {
      dispatch(filterCustomResenaSlice(customResenaPorRango))
    }
    
  }, [changeDate, changeDateRange, dispatch, selectRange.startDate])

  // Filtro por todos los meses de las reseñas personalizadas
  
  const customResenaTodosLosMeses = filterCustomResenaTodosMeses(customResena, showThreeMonth, changeDate, changeDateRange, showThreeMonths, showAllMonth)
  
  return (
    <Sidebar>
        <div className='text-black p-4'>
          <h1>{greet}, <span className='text-muted'>{name}</span></h1>
          <div className='shadow p-2 my-1' id={`${(showFloat) && 'floatFilter'}`} style={{borderRadius: '35px', backgroundColor: (showTransp) ? 'transparent' : 'white'}}>

            <div className='d-flex justify-content-end mr-2' style={{display: 'inline-flex'}}>
              <div className="form-check">
                <input className="form-check-input" onClick={() => setShowFloat(!showFloat)} type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label mr-4" for="flexCheckDefault">
                  Activar barra flotante
                </label>
              </div>

              {
                (showFloat)
                  &&
                <div className="form-check">
                  <input className="form-check-input" onClick={() => setShowTransp(!showTransp)} type="checkbox" value="" id="flexCheckChecked" />
                  <label className="form-check-label" for="flexCheckChecked">
                    Activar transparencia
                  </label>
                </div>
              }

            </div>

            {
              (usuariosToFilter && changeShowResena === 'Normal')
                &&
                <MultiSelect
                  isLoading = {(chargeUsersTeam && usuariosToFilter?.length === 0)}
                  onMenuToggle={(e) => setChargeUsersTeam(e)}
                  options={usuariosToFilter}
                  value={FiltroChange}
                  onChange={setFiltroChange}
                  labelledBy="Select"
                  hasSelectAll = {false}
                />
            }

            {
              (showFilter)
                &&
              // <div>
              //   <DateRangePicker
              //     weekStartsOn={0}
              //     staticRanges={[]}
              //     inputRanges = {[]}
              //     locale={es}
              //     ranges={[selectRange]}
              //     onChange={(range) => handledRange(range?.selection)}
              //   />

              <div>
                <DateRange
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  staticRanges={[]}
                  inputRanges = {[]}
                  color = 'rgb(89, 7, 211)'
                  rangeColors={[]}
                  locale={es}
                  ranges={[selectRange]}
                  onChange={(range) => handledRange(range?.selection)}
                />
              </div>
            }

            <div className='p-1 mt-2' style={{justifyContent: 'space-between', display: 'flex'}}>
              <button onClick={() => setShowFilter(!showFilter)} type='button' className='btn btn-primary'>{(!showFilter) ? (changeDate && changeDateRange) ? `Desde ${moment(changeDate).format('MMMM D')}, hasta ${moment(changeDateRange).format('MMMM D')}` : 'Filtrar por rango' : 'Cerrar ventana de filtro'}</button>
              <button onClick={() => setModalTeam(true)} type='button' className='btn btn-primary'>Equipos</button>
            </div>
            <div div className='p-1 my-2' style={{justifyContent: 'space-between', display: 'flex', overflowX: 'auto'}}>
                {
                  staticRanges?.map((e) => {
                    return (
                      <div key={e.label}>
                        <button disabled = {(e.label === markButton)} style={{opacity: (e.label === markButton) && 0.5, width: (e.label === 'Semana pasada') ? '150px' :  '135px'}} className='btn btn-primary mx-1' onClick={() => handledRange(e.range(), e.label)}>
                          {e.label}
                        </button>
                      </div>
                    )
                  })
                }
            </div>
          </div>

          <div className={`row ${(showFloat) ? 'mb-3' : 'my-3'}`} style = {{marginTop: (showFloat) && '220px'}}>
            {
              (changeShowResena === 'Normal')
                ?
              <CardsAdmin 
                resenasFiltradas = {(resenasFilterArray?.length !== 0) ? resenasFilterArray : (FiltroChange?.length === 0) && resenasFiltradas} 
                mes = {[moment(changeDate).format('M'), moment(changeDateRange).format('M')]} 
                calificacionPorMeses = {(usuarioFiltrado?.length !== 0 && mes[0] - 1 < mes[1]) ? calificacionPorMesesDeEquipos : calificacionPorMeses}
                show = {showAllMonth}
                respWidth = { respWidth }
                changeShowResena = {changeShowResena}
                setChangeShowResena = {setChangeShowResena}
                defineds = {defineds.endOfMonth}
                changeDate = {changeDate}
                changeDateRange = {changeDateRange}
                showThisWeek = {showThisWeek}
                showLastWeek = {showLastWeek}
                showThreeMonth = {showThreeMonth}
                showAllMonth = {showAllMonth}
                onlyThreeMonths = {onlyThreeMonths}
                evaluacionFiltradaPorRango = {(evaluacionFilterArray?.length !== 0 && usuarioFiltrado?.length !== 0) ? evaluacionFilterArray[0] : evaluacionFiltradaPorRango[0]}
                evaluacionFiltroTodosLosMeses = {(usuarioFiltrado?.length !== 0 && mes[0] - 1 < mes[1]) ? calificacionEvaluacionPorMesesDeEquipos : CalificacionEvaluacionPorMes}
                evaluacionCount = {(usuarioFiltrado?.length !== 0) ? evaluacionFilterArray[1] : evaluacionFiltradaPorRango[1]}
                isLoading = {isLoading}
              />
                :
              <CardsAdminCustomResena 
                resenasFiltradas = {(customResenaPorRango?.length !== 0) ? customResenaPorRango : []} 
                mes = {[moment(changeDate).format('M'), moment(changeDateRange).format('M')]} 
                calificacionPorMeses = {(customResenaTodosLosMeses?.length !== 0) && customResenaTodosLosMeses}
                show = {showAllMonth}
                respWidth = { respWidth }
                changeShowResena = {changeShowResena}
                setChangeShowResena = {setChangeShowResena}
                defineds = {defineds.endOfMonth}
                changeDate = {changeDate}
                changeDateRange = {changeDateRange}
                showThisWeek = {showThisWeek}
                showLastWeek = {showLastWeek}
                showThreeMonth = {showThreeMonth}
              />
            }

          </div>

          <div className="row">
            <TableAdmin usuarioFiltrado = {(usuarioFiltrado?.length !== 0) ? usuarioFiltrado : usuarios} toShowResena = {toShowResena} changeShowResena = {changeShowResena} />
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
