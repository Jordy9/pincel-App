import React from 'react'
import { Modal } from 'react-bootstrap'

export const ModalPreview = ({modalPreview, setModalPreview, preview, previewVideo, setPreviewImage, setPreviewVideo}) => {

    const handleClose = () => {
        setModalPreview(false)
        setPreviewImage()
        setPreviewVideo()
    }

  return (
    <Modal size='lg' centered show={modalPreview} onHide={handleClose}>
        <Modal.Body>
            {
                (previewVideo)
                    ?
                <video controls src={previewVideo} style={{width: '100%', height: '60vh', borderRadius: '20px', objectFit: 'cover'}} />
                    :
                <img src={preview} style = {{width: '100%', height: 'auto', objectFit: 'cover'}} alt="" />
            }
        </Modal.Body>
    </Modal>
  )
}
