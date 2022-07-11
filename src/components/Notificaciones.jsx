import React, { useEffect, useState } from 'react'
import { DropdownButton } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

export const Notificaciones = () => {

    const [showBell, setShowBell] = useState(false)
    
    const onBlurBell = () => {
        setShowBell(false)
    }

    const onClickBell = () => {
        if (showBell) {
            setShowBell(false)
        } else {
            setShowBell(true)
        }
    }

    const {pathname} = useLocation()

    const [show, setShow] = useState(false)
    
    useEffect(() => {
        if (pathname === '/capacitacion/1') {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [pathname])

  return (
    <>
        {
            (!show)
                &&
            <DropdownButton
                onBlur = {onBlurBell}
                onClick = {onClickBell}
                style={{position: 'absolute', zIndex: 1045, right: '20px', top: '15px', backgroundColor: 'transparent'}}
                className='mr-2 d-flex align-items-center'
                title = {
                    <>
                        <i style={{fontSize: '20px', cursor: 'pointer', margin: 0, padding: 0}} className={`${(showBell) ? 'i bi-bell-fill' : 'i bi-bell'} btn btn-primary position-relative`}>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                99+
                            </span>
                        </i>
                    </>
                    }
                align={'end'}
                id="input-group-dropdown-1"
            >
                <div style={{overflowY: 'scroll', height: '400px'}}>
                    {/* {
                        notificaciones?.map((notifications, index) => {
                            return (
                                <Dropdown.Item onClick={() => setNotify(notifications)} className='shadow my-2 bg-dark p-3 flex-column image-round' key={notifications+ index} style={{width: 'auto', height: 'auto'}}>
                                    <h6 className='text-white text-center'>{notifications.subtitle}</h6>
                                    <div className="row">
                                        {
                                            (notifications.image)
                                                ?
                                            <>
                                                <div className="col-8">
                                                    <h5 className='text-white' style={{width: '225px'}}>
                                                        {
                                                        (notifications.title.length > 15)
                                                            ?
                                                            notifications.title.slice(0, 15) + '...'
                                                            :
                                                        notifications.title
                                                        }
                                                    </h5>
                                                </div>
                                            
                                                <div className="col-4 d-flex justify-content-end">
                                                    <img className='img-fluid' style={{objectFit: 'cover', width: '50px', height: 'auto', borderRadius: '18px'}} src={notifications.image} alt="" />    
                                                </div>
                                            </>
                                            :
                                            <div className="col-12">
                                                <h4 className='text-white' style={{wordBreak: 'break-word'}}>
                                                    {
                                                        notifications.title
                                                    }
                                                </h4>
                                            </div>
                                        }
                                    </div>
                                    <span style={{fontSize: '14px'}} className='text-white'>{moment(notifications.createdAt).fromNow()}</span>
                                </Dropdown.Item>
                            )
                        })
                    } */}
                </div>
            </DropdownButton>
        }
    </>
  )
}
