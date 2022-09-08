import React, { useState } from 'react'
import { Sidebar } from '../Sidebar'
import { CardsAdmin } from './CardsAdmin'
import { TableAdmin } from './TableAdmin'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useGreeting } from '../../hooks/useGreeting'
import { ModalTeam } from './ModalTeam'

export const DashboardAdmin = () => {

  const { name } = useSelector(state => state.auth);

  const { resena } = useSelector(state => state.rs);

  const resenasFiltradas = resena?.filter(resena => moment(resena?.createdAt).format('M') === moment().format('M') && resena?.estado === true)

  const resenasFiltradasmesPasado = resena?.filter(resena => moment(resena?.createdAt).format('M') === '8')

  const { greet } = useGreeting()

  // const [modalTeam, setModalTeam] = useState(false)

  return (
    <Sidebar>
        <div className='text-black p-4'>
        <h1>{greet}, <span className='text-muted'>{name}</span></h1>
          {/* <button onClick={() => setModalTeam(true)} type='button' className='btn btn-primary d-flex ml-auto'>Equipos</button> */}
          <div className="row my-3">
            <CardsAdmin resenasFiltradas = {resenasFiltradas} mes = {moment().format('M')} resenasFiltradasmesPasado = {resenasFiltradasmesPasado} />
          </div>

          <div className="row">
            <TableAdmin />
          </div>
      </div>

      {/* {
        (modalTeam)
          &&
        <ModalTeam modalTeam  = {modalTeam} setModalTeam = {setModalTeam}  />
      } */}
    </Sidebar>
  )
}
