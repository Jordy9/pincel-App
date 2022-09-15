import React, { useState } from 'react'
import { Sidebar } from '../Sidebar'
import { CardsAdmin } from './CardsAdmin'
import { TableAdmin } from './TableAdmin'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useGreeting } from '../../hooks/useGreeting'
import { ModalTeam } from './ModalTeam'
import { MultiSelect } from 'react-multi-select-component'

export const DashboardAdmin = () => {
  
  // Importacion de estados
  const { resena } = useSelector(state => state.rs);

  const { name, usuarios } = useSelector(state => state.auth);

  const { equipos } = useSelector(state => state.eq);

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

  let resenasFilterArray = []

  let resenasFilterArrayMesPasado = []

  let lol

  resena.filter(resena => moment(resena?.createdAt).format('M') === moment().format('M') && resena?.estado === true && resena?.calificacion.length !== 0).map(resena => (
    [lol] = resena.calificacion.filter(calificacion => usuarioFiltrado.some(usuario => calificacion.id.includes(usuario.id))),
    (lol !== undefined)
      &&
    resenasFilterArray.push({calificacion: [lol]})
  ))

  // Filtro de las resenas por usuarios o equipos del mes anterior

  resena.filter(resena => moment(resena?.createdAt).format('M') === '8' && resena?.estado === true && resena?.calificacion.length !== 0).map(resena => (
    [lol] = resena.calificacion.filter(calificacion => usuarioFiltrado.some(usuario => calificacion.id.includes(usuario.id))),
    (lol !== undefined)
      &&
    resenasFilterArrayMesPasado.push({calificacion: [lol]})
  ))

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
    moment(resena?.createdAt).format('Y/M/D') === moment(changeDate).format('Y/M/D')
      : 
    moment(resena?.createdAt).format('Y/M') === moment().format('Y/M')
  )

  const resenasFiltradas = resenasFiltradasPorRango?.filter(
    resena => resena?.estado === true 
      && 
    resena?.calificacion?.length !== 0
  )

  // Reseñas filtradas por los meses

  let SumaResenasPorMes = []
  
  const MonthFilter = (resena) => {

    SumaResenasPorMes.push(resena)
    const filtroPorMes = SumaResenasPorMes.reduce(
      (previousValue, currentValue) => [...previousValue, ...currentValue?.calificacion],
      ['Alphabet'],
    )

    const sinAlphabet = filtroPorMes.slice(1)

    let suma = 0

    sinAlphabet?.map(resena => suma = suma + resena?.calificacion)

    const totalSumado = suma/sinAlphabet?.length

    const porcentage = (5*totalSumado) / 100

    return porcentage
  }

  let calificacionPorMeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  for (let index = 0; index < 12; index++) {
    SumaResenasPorMes = []

    resena.filter(resena => resena?.estado === true && resena?.calificacion?.length !== 0).map(resena => (
      (moment(resena.createdAt).format('M') - 1 === index)
        ?
      calificacionPorMeses[index] = MonthFilter(resena)
        :
      null
    ))
  }

  // Fin de los filtros

  console.log(resenasFiltradas)

  const { greet } = useGreeting()

  const [modalTeam, setModalTeam] = useState(false)

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

          <input type="date" onChange={({target}) => setChangeDate(target.value)} />

          <input type="date" onChange={({target}) => setChangeDateRange(target.value)} />

          <button onClick={() => setModalTeam(true)} type='button' className='btn btn-primary d-flex ml-auto'>Equipos</button>
          <div className="row my-3">
            <CardsAdmin 
              resenasFiltradas = {(resenasFilterArray?.length !== 0) ? resenasFilterArray : (FiltroChange?.length === 0) && resenasFiltradas} 
              mes = {moment().format('M')} 
              calificacionPorMeses = {calificacionPorMeses}
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
