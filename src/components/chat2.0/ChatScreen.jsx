import React, { useEffect, useState } from 'react'
import { Chat } from './Chat'
import perfil1 from '../../heroes/User.png'
import { SelectChat } from './SelectChat'
import { Sidebar } from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
// import { ModalImage } from './ModalImage'
import { useResponsive } from '../../hooks/useResponsive'
import { chtClearChatActive } from '../../store/chat/chatSlice'
import { Navb } from '../navb/Navb'
// import { ModalImage } from './ModalImage'

export const ChatScreen = () => {

    const dispatch = useDispatch()

    const [respWidth] = useResponsive()

    const {chatActivo, image, usuarios} = useSelector(state => state.cht)

    const user = usuarios?.filter(usuarios => usuarios.id === chatActivo)

    const [first, setfirst] = useState(false);

    useEffect(() => {
        if (respWidth <= 820) {
            if (chatActivo !== null) {
                setfirst(true)
            } else {
                setfirst(false)
            }
        } else {
            setfirst(false)
        }
        
    }, [chatActivo, respWidth]);  

    const click = () => {
        dispatch(chtClearChatActive())
    }

  return (
    <>
        <Navb />
        <div style={{marginTop: '30px', borderRadius: '20px', backgroundColor: 'rgb(209, 202, 202)'}} className='row'>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                <div className="row">
                    <div hidden = {first} className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <div className='flex-column text-black' style={{backgroundColor: 'lightgray'}}>
                            <Sidebar />
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                        <div className='p-2 flex-column text-black'>
                            {
                                (!chatActivo)
                                    ?
                                <SelectChat />
                                    :
                                <>
                                <div className='d-flex align-items-center'>
                                    <i onClick={click} hidden = {(!first)} className="bi bi-arrow-left-circle-fill text-black ml-2 mr-3" style={{margin: 0, cursor: 'pointer', fontSize: '20px'}}></i>
                                    <div style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden'}}>
                                        {
                                            (image)
                                                ?
                                            <img data-bs-toggle="modal" data-bs-target="#exampleModalImageChatUser" src={image} alt="sunil" style={{objectFit: 'cover', cursor: 'pointer'}} />
                                                :
                                            <img data-bs-toggle="modal" data-bs-target="#exampleModalImageChatUser" src={perfil1} style = {{cursor: 'pointer'}} alt="sunil" />
                                        }
                                    </div>
                                    <span style = {{cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModalImageChatUser" className='mx-2'><strong>{user[0].name} {user[0].lastName}</strong></span>
                                    <span className={`${user[0]?.online ? 'text-success' : 'text-danger'}`}>{user[0]?.online ? 'En linea' : 'Sin conexión'}</span>
                                </div>
                                <Chat />
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* {
                (chatActivo)
                    &&
                <ModalImage image={image} perfil = {perfil1} user = {user} />
            } */}
        </div>
    </>
  )
}
