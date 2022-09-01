import React from 'react'
import { Modal } from 'react-bootstrap'
import ReactPlayer from 'react-player'

export const ModalPreview = ({modalPreview, setModalPreview, preview, previewVideo, setPreviewImage, setPreviewVideo}) => {

    const handleClose = () => {
        setModalPreview(false)
        setPreviewImage()
        setPreviewVideo()
    }

  return (
    <Modal size='lg' centered show={modalPreview} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton></Modal.Header>
        
        <Modal.Body>
            {
                (previewVideo)
                    ?
                <ReactPlayer width='100%' height = '60vh' controls url={previewVideo} />
                // <video controls src={previewVideo} style={{width: '100%', height: '60vh', borderRadius: '20px', objectFit: 'cover'}} />
                    :
                <img src={preview} style = {{width: '100%', height: 'auto', objectFit: 'cover'}} alt="" />
            }
        </Modal.Body>
    </Modal>
  )
}
