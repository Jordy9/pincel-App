import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Capacitacion } from '../components/capacitacion/Capacitacion';
import { VideosComponent } from '../components/capacitacion/VideosComponent';
import { Dashboard } from '../components/dashBoard/Dashboard';
import { DashboardAdmin } from '../components/dashBoard/DashboardAdmin';
import { FormularioVideos } from '../components/formularioVideos/FormularioVideos';
import { ListadoVideos } from '../components/ListadoVideos/ListadoVideos';
import { Perfil } from '../components/perfil/Perfil';
import { ChatScreen } from '../components/chat2.0/ChatScreen';
import { Comunicado } from '../components/comunicado/Comunicado';
import { ListadoComunicados } from '../components/listadoComunicados/ListadoComunicados';


export const AdminRoute = () => {
  return (
    <Routes>
        <Route path='/pincel' element = {<Dashboard />} />
        <Route path='/pincel-admin' element = {<DashboardAdmin />} />
        <Route path='/capacitacion' element = {<Capacitacion />} />
        <Route path='/formCapacitaciones' element = {<FormularioVideos />} />
        <Route path='/ListVideos' element = {<ListadoVideos />} />
        <Route path='/capacitacion/:id' element = {<VideosComponent />} />
        <Route path='/Aclaraciones' element = {<ChatScreen />} />
        <Route path='/Comunicado' element = {<Comunicado />} />
        <Route path='/ListComunicados' element = {<ListadoComunicados />} />
        <Route path='/perfil' element = {<Perfil />} />

        <Route path='/*' element = {<Navigate to='/pincel-admin' />} />
    </Routes>
  )
}
