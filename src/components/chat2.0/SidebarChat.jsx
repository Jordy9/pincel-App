import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cargarChat } from '../../store/chat/thunk'
import { activeChat } from '../../store/chat/chatSlice'
import perfil1 from '../../heroes/User.png'
import './Chat.css'
import { BorrarNotificaciones } from '../../store/notificaciones/thunks'
// import moment from 'moment'

export const SidebarChat = ({usuarios, istyping}) => {

    const dispatch = useDispatch()

    const {chatActivo, typing} = useSelector(state => state.cht)

    const {uid} = useSelector(state => state.auth)

    const {notificaciones} = useSelector(state => state.nt)

    const onclick = () => {
        dispatch(activeChat(usuarios.id))

        dispatch(cargarChat(usuarios.id))

        if (notificaciones.length !== 0) {
            dispatch(BorrarNotificaciones(uid, chatActivo))
        } else {
            return
        }
    }

    const lol = notificaciones.filter(not => not.from === usuarios.id)

    const notify = lol.filter(not => not.to === uid)

    // const cumple =  moment(usuarios?.date).format('MM-DD') === moment().format('MM-DD')

  return (
    <>
        <div className={`row p-2 my-2 hoverChat bg-white ${(usuarios?.id === chatActivo) && 'focusChat'}`} style={{borderRadius: '20px'}} onClick={onclick}>
            <div className="col-5 col-sm-4 col-md-5 col-lg-6 col-xl-5">
                <div className='d-flex align-items-center'>
                    <div style={{width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden'}}>
                        {
                            (usuarios.urlImage)
                                ?
                            <img src={usuarios.urlImage} alt="sunil" style={{objectFit: 'cover'}} />
                                :
                            <img src={perfil1} alt="sunil" />
                        }
                    </div>

                    <span className={`${(usuarios.online) ? 'translate-middle p-1 bg-success border border-light rounded-circle' : 'translate-middle p-1 bg-danger border border-light rounded-circle'}`}></span>
                </div>
                <span hidden = {notify?.length === 0} className="badge bg-danger translate-middle">{notify?.length}</span>
            </div>

            <div className={`col-7 col-sm-8 col-md-7 col-lg-6 col-xl-7`}>
                <p className='my-2'>{usuarios.name} {usuarios.lastName} {/*(cumple) && '🎂'*/}</p>
                <p className={`my-2 ${usuarios.online ? 'text-success' : 'text-danger'}`}>{usuarios.online ? 'En linea' : 'Sin conexión'}</p>
                {
                    (istyping[0] === usuarios && typing?.typing === false)
                        &&
                    <span className='d-flex my-2 text-secondary'>Escribiendo</span>

                }
            </div>
        </div>
    </>
  )
}
