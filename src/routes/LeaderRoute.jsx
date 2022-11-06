import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardAdmin } from '../components/dashBoardLeader/DashboardAdmin'
import { Dashboard } from '../components/dashBoard/Dashboard'
import { Perfil } from '../components/perfil/Perfil'
import { VideosComponent } from '../components/capacitacion/VideosComponent'
import { Capacitacion } from '../components/capacitacion/Capacitacion'
import { EvaluacionPage } from '../components/capacitacion/EvaluacionPage'

export const LeaderRoute = ({capacitacionActiva}) => {
    return (
        <Routes>
            <Route path='/pincel-admin' element = {<DashboardAdmin />} />
            <Route path='/pincel' element = {<Dashboard />} />
            <Route path='/capacitacion' element = {<Capacitacion />} />
            <Route path='/evaluacionCapacitacion/:id' element = {(capacitacionActiva?._id) && <EvaluacionPage />} />
            <Route path='/capacitacion/:id' element = {<VideosComponent />} />
            {/* <Route path='/Aclaraciones' element = {<ChatScreen />} />
            <Route path='/Comunicado' element = {<Comunicado />} />
            <Route path='/ListComunicados' element = {<ListadoComunicados />} /> */}
            <Route path='/perfil' element = {<Perfil />} />
    
            <Route path='/*' element = {<Navigate to='/pincel-admin' />} />
        </Routes>
      )
}
