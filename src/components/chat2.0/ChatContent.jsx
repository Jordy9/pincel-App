import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { scrollToBottomAnimated } from '../../helper/PrepareEvents'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'

export const ChatContent = () => {

    const scrollRef = useRef()

    const {mensajes} = useSelector(state => state.cht)
    const {uid} = useSelector(state => state.auth)

    useEffect(() => {
            
        scrollRef.current?.addEventListener('DOMNodeInserted', scrollToBottomAnimated('messages'))

    }, [mensajes])

  return (
      <div ref={scrollRef} id='messages' style={{backgroundColor: 'white', height: '65vh', overflowY: 'auto', overflowX: 'hidden', borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}}>

            {
                mensajes?.filter(msg => msg?.hiddeMessageTo !== uid)?.map( msg => (
                    ( msg.to === uid )
                        ? <IncomingMessage key={ msg._id } msg = {msg} />
                        : <OutgoingMessage key={ msg._id } msg = {msg} />
                ))
            }
            
      </div>
  )
}
