import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from '../components/home/Login';
import { Registro } from '../components/home/Registro';
import { Notificaciones } from '../components/Notificaciones';
import { useSelector, useDispatch } from 'react-redux'
import { iniciarAutenticacion, obtenerUsuarios } from '../store/auth/thunk';
import { Spinner } from '../components/Spinner';
import moment from 'moment';
import 'moment/locale/es';
import { useSocket } from '../hooks/useSocket';
import { startSocket } from '../store/socket/socketSlice';
import { activeMessage, isTyping } from '../store/chat/chatSlice';
import { cargarNotificaciones } from '../store/notificaciones/thunks';
import { IconExit } from '../components/IconExit';
import { obtenerResena } from '../store/resena/thunk';
import { obtenerEvaluacion } from '../store/evaluacion/thunk';
import { obtenerComunicados } from '../store/comunicado/thunk';
import { UserRoute } from './UserRoute';
import { AdminRoute } from './AdminRoute';
import { Evaluacion } from '../components/home/Evaluacion';
moment.locale('es');

export const AppRoute = () => {

  const dispatch = useDispatch();

  const { uid, usuarioActivo } = useSelector(state => state.auth);

  const {socket, online, conectarSocket, desconectarSocket} = useSocket(`${process.env.REACT_APP_API_URL.split('/api')[0]}`)

  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(obtenerUsuarios())
    dispatch(iniciarAutenticacion())
    dispatch(cargarNotificaciones())
    dispatch(obtenerResena())
    dispatch(obtenerEvaluacion())
    dispatch(obtenerComunicados())
  }, [dispatch])

  useEffect(() => {
    if (uid) {
        conectarSocket()
    }
  }, [uid, conectarSocket])

  useEffect(() => {
      if (!uid) {
          desconectarSocket()
      }
  }, [uid, desconectarSocket])

  useEffect(() => {
      dispatch(startSocket(socket, online))
  }, [dispatch, socket, online])

  useEffect(() => {
      socket?.on('mensaje-personal', (mensaje) => {
          dispatch(activeMessage(mensaje))
      })
  }, [socket, dispatch])

  useEffect(() => {
      socket?.on('escribiendo', (typing) => {
          dispatch(isTyping(typing))
      })
  }, [socket, dispatch])

  return (
    <>
      {
        (!!token)
          ?
        (!uid)
          ?
        <Spinner />
          :
        <>
          <Notificaciones />
          <IconExit />

          {
            (usuarioActivo?.role && usuarioActivo?.role === 'Usuario')
              ?
            <UserRoute />
              :
            <AdminRoute />
          }
        </>
          :
        <Routes>
          <Route path='/login' element = {<Login />} />
          <Route path='/registro' element = {<Registro />} />
          <Route path='/Evaluacion' element = {<Evaluacion />} />

          <Route path='/*' element = {<Navigate to='/login' />} />
        </Routes>
      }
    </>
  )
}
