import { useFormik } from 'formik'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { sendBirthday } from '../../action/sendBirthday'
import Arrow from '../../heroes/3682321.png'

export const ModalImageSendBirthday = ({openModal, setOpenModal, user}) => {

    const dispatch = useDispatch()

    const onHideModal = () => {
        setOpenModal(false)
    }

    const {handleSubmit, resetForm, getFieldProps} = useFormik({
        initialValues: {
            message: ''
        },
        enableReinitialize: true,
        onSubmit: ({message}) => {

            dispatch(sendBirthday(message, user))

            resetForm({
                message: ''
            })

            setOpenModal(false)

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              return Toast.fire({
                icon: 'success',
                title: 'Felicitacion enviada'
              })

        },
        validationSchema: Yup.object({
            message: Yup.string()
                        .min(3, ('Debe de contener mínimo 3 caracter para enviar un mensaje'))
                        .required('Requerido')
        })
    })

    const NextRow = getFieldProps('message')?.value?.length >= 74

    const clickSubmit = () => {
        document.querySelector('#clickSubmitLink').click()
    }
    
  return (
    <Modal
    contentClassName='bg-dark'
    centered
    size="md"
    show={openModal}
    onHide={() => onHideModal()}
    aria-labelledby="example-modal-sizes-title-lg"
>
    <Modal.Header id='modal-header-video' closeButton>
    </Modal.Header>
    <Modal.Body> 
    <form onSubmit={handleSubmit} style={{height: 'auto'}}>

        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <h1 className='text-center'>Por favor ingrese su mensaje de felicitaciones</h1>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <div className='mx-2 p-2 d-flex align-items-center'>
                            <textarea autoFocus {...getFieldProps('message')} className='mx-2 rounded p-3' style={{backgroundColor: '#181818', color: 'white', resize: 'none', border: 'none', outline: 'none'}} cols = '80' rows={`${(NextRow ? '2' : '1')}`}></textarea>
                            <img onClick={clickSubmit} src = {Arrow} style = {{width: '30px', height: '30px', cursor: 'pointer'}} alt="" />
                            <button hidden id='clickSubmitLink' type='submit'></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    </Modal.Body>
</Modal>
  )
}
