import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Capacitacion } from '../components/capacitacion/Capacitacion';
import { VideosComponent } from '../components/capacitacion/VideosComponent';
import { Dashboard } from '../components/dashBoard/Dashboard';
import { DashboardAdmin } from '../components/dashBoard/DashboardAdmin';
import { FormularioVideos } from '../components/formularioVideos/FormularioVideos';
import { ListadoVideos } from '../components/ListadoVideos/ListadoVideos';
import { Notificaciones } from '../components/Notificaciones';
import { Perfil } from '../components/perfil/Perfil';

export const AppRoute = () => {
  return (
    <>
      <Notificaciones />
      <Routes>
        <Route path='/pincel' element = {<Dashboard />} />
        <Route path='/pincel-admin' element = {<DashboardAdmin />} />
        <Route path='/capacitacion' element = {<Capacitacion />} />
        <Route path='/formCapacitaciones' element = {<FormularioVideos />} />
        <Route path='/ListCapacitaciones' element = {<ListadoVideos />} />
        <Route path='/capacitacion/:id' element = {<VideosComponent />} />
        <Route path='/perfil' element = {<Perfil />} />

        <Route path='/*' element = {<Navigate to='/pincel' />} />
      </Routes>
    </>
  )
}
