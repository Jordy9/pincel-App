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
  
  const [FiltroChange, setFiltroChange] = useState([])
  
  const { name, usuarios } = useSelector(state => state.auth);

  const { equipos } = useSelector(state => state.eq);

  let usuariosToFilter = []

  equipos?.map(equipo => usuariosToFilter.push({label: `Equipo de ${equipo?.name}`, value: equipo.name, team: true}))

  usuarios?.map(usuario => usuariosToFilter.push({label: usuario?.name, value: usuario?.id, team: false}))

  const { resena } = useSelector(state => state.rs);

  let usuarioFiltrado

  (FiltroChange?.some(filtro => filtro?.team === true)) 
    ?
  usuarioFiltrado = usuarios?.filter(usuario => FiltroChange.some(FiltroChange => usuario?.team?.includes(FiltroChange.value)))
    :
  usuarioFiltrado = usuarios?.filter(usuario => FiltroChange.some(FiltroChange => usuario?.id?.includes(FiltroChange.value)))

  let resenasFilterArray = []

  let resenasFilterArrayMesPasado = []

  let lol

  resena.filter(resena => moment(resena?.createdAt).format('M') === moment().format('M') && resena?.estado === true && resena?.calificacion.length !== 0).map(resena => (
    [lol] = resena.calificacion.filter(calificacion => usuarioFiltrado.some(usuario => calificacion.id.includes(usuario.id))),
    (lol !== undefined)
      &&
    resenasFilterArray.push({calificacion: [lol]})
  ))

  resena.filter(resena => moment(resena?.createdAt).format('M') === '8' && resena?.estado === true && resena?.calificacion.length !== 0).map(resena => (
    [lol] = resena.calificacion.filter(calificacion => usuarioFiltrado.some(usuario => calificacion.id.includes(usuario.id))),
    (lol !== undefined)
      &&
    resenasFilterArrayMesPasado.push({calificacion: [lol]})
  ))

  console.log(resenasFilterArrayMesPasado)
  
  const resenasFiltradas = resena?.filter(resena => moment(resena?.createdAt).format('M') === moment().format('M') && resena?.estado === true)

  const resenasFiltradasmesPasado = resena?.filter(resena => moment(resena?.createdAt).format('M') === '8')

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

          <button onClick={() => setModalTeam(true)} type='button' className='btn btn-primary d-flex ml-auto'>Equipos</button>
          <div className="row my-3">
            <CardsAdmin resenasFiltradas = {(resenasFilterArray?.length !== 0) ? resenasFilterArray : resenasFiltradas} mes = {moment().format('M')} resenasFiltradasmesPasado = {(resenasFilterArrayMesPasado?.length !== 0) ? resenasFilterArrayMesPasado : resenasFiltradasmesPasado} />
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
