import React, { useEffect, useRef } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from '../components/home/Login';
import { useSelector, useDispatch } from 'react-redux'
import { iniciarAutenticacion, iniciarLogout, obtenerUsuarioActivo, obtenerUsuarios } from '../store/auth/thunk';
import { Spinner } from '../components/Spinner';
import moment from 'moment';
import 'moment/locale/es';
import { useSocket } from '../hooks/useSocket';
import { startSocket } from '../store/socket/socketSlice';
import { activeMessage, isTyping } from '../store/chat/chatSlice';
import { cargarNotificaciones } from '../store/notificaciones/thunks';
import { obtenerToResena } from '../store/resena/thunk';
import { obtenerComunicados } from '../store/comunicado/thunk';
import { UserRoute } from './UserRoute';
import { AdminRoute } from './AdminRoute';
import { Evaluacion } from '../components/home/Evaluacion';
import { obtenerCapacitacion } from '../store/capacitacion/thunk';
import { obtenerEvaluacion } from '../store/evaluacion/thunk';
import { obtenerEquipo } from '../store/equipo/thunk';
import { CustomEvaluacion } from '../components/home/CustomEvaluacion';
import { obtenerToShowResena } from '../store/toShowResena/thunk';
import { obtenerCustomResena } from '../store/customResena/thunk';
import { LeaderRoute } from './LeaderRoute';
import { ScrollToTop } from '../components/scrollToTop/ScrollToTop';
import { OlvidasteContrasena } from '../components/home/OlvidasteContrasena';
import { RecuperarContrasena } from '../components/home/RecuperarContrasena';
moment.locale('es');

export const AppRoute = () => {

  const dispatch = useDispatch();

  const { uid, usuarioActivo } = useSelector(state => state.auth);

  const { equipos } = useSelector(state => state.eq);

  let usuariosFiltrado = []

  equipos?.filter(equipo => usuariosFiltrado.push(equipo?.items[0]?.id))

  const isLeader = usuariosFiltrado?.includes(uid)

  const { toShowResena } = useSelector(state => state.to);

  const {socket, online, conectarSocket, desconectarSocket} = useSocket(`${process.env.REACT_APP_API_URL.split('/api')[0]}`)

  const token = localStorage.getItem('token')

  const refIntervalOnClick = useRef()

  const onClick = () => {
    localStorage.setItem('date-click', new Date().getTime())
  }
  
  useEffect(() => {
    window.addEventListener('click', onClick)

    return () => window.removeEventListener('click', onClick)

  }, [])
  
  useEffect(() => {
    let newDateClick = localStorage.getItem('date-click')

    refIntervalOnClick.current && clearInterval(refIntervalOnClick.current)
    refIntervalOnClick.current = setInterval(
      () => {
        if (!!token) {
          newDateClick = localStorage.getItem('date-click')
          if (moment().diff(moment(Number(newDateClick)), 'minutes') >= 15 && moment().diff(moment(Number(newDateClick)), 'minutes') < 27797517) {
            dispatch(iniciarLogout())
          }
        }
      }
      , 300000)
  }, [token, dispatch])

  const refInterval = useRef()

  useEffect(() => {
    let tokenInitDate = localStorage.getItem('token-init-date')

    refInterval.current && clearInterval(refInterval.current)
    refInterval.current = setInterval(
      () => {
        if (!!token) {
          if (moment().diff(moment(Number(tokenInitDate)), 'minutes') >= 10 && moment().diff(moment(Number(tokenInitDate)), 'minutes') < 27797517) {
            dispatch(iniciarAutenticacion())
            tokenInitDate = localStorage.getItem('token-init-date')
          }
        }
      }
      , 1000)
  }, [token, dispatch])
  
  useEffect(() => {
    dispatch(obtenerUsuarios())
    dispatch(iniciarAutenticacion())
    dispatch(cargarNotificaciones())
    dispatch(obtenerToResena())
    dispatch(obtenerCapacitacion())
    dispatch(obtenerComunicados())
    dispatch(obtenerEvaluacion())
    dispatch(obtenerEquipo())
    dispatch(obtenerToShowResena())
    dispatch(obtenerCustomResena())
  }, [dispatch])

  useEffect(() => {
    if (uid && !usuarioActivo) {
      dispatch(obtenerUsuarioActivo())
    }
  }, [dispatch, uid, usuarioActivo])
  
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
    dispatch(startSocket({socket, online}))
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
          {/* <Notificaciones /> */}
          {/* <IconExit /> */}
          <ScrollToTop />

          {
            (usuarioActivo?.role && usuarioActivo?.role === 'Administrador')
              &&
            <AdminRoute uid = {uid} />
          }

          {
            (usuarioActivo?.role && usuarioActivo?.role === 'Usuario')
              &&
            (!isLeader)
              &&
            <UserRoute uid = {uid} />
          }

          {
            (usuarioActivo?.role && usuarioActivo?.role === 'Usuario')
              &&
            (isLeader)
              &&
            <LeaderRoute uid = {uid} />
          }
        </>
          :
        <Routes>
          <Route path='/login' element = {<Login />} />
          <Route path='/olvidasteContrasena' element = {<OlvidasteContrasena />} />
          <Route path='/recuperarContrasena/:id' element = {<RecuperarContrasena />} />
          {/* <Route path='/registro' element = {<Registro />} /> */}
          <Route path='/Evaluacion' element = { (toShowResena[0]?.showResena === 'Normal') ? <Evaluacion /> : <CustomEvaluacion />} />

          <Route path='/*' element = {<Navigate to='/login' />} />
        </Routes>
      }
    </>
  )
}
