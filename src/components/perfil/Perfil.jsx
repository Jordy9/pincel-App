import React from 'react'
import { Sidebar } from '../Sidebar'

export const Perfil = () => {

    const onClickImage = () => {
        document.getElementById('fileSelector').click()
    }

  return (
    <Sidebar>
        <div className="row">
            <div className="col-12">
                <div className = 'p-4 flex-column text-black'>
                    <h1 className="text-black">Información personal</h1>
                    <form className='my-5'>
                        <div className="row">
                            <div className="col form-group">
                                <label>Nombre</label>
                                <input type="text" placeholder = 'Juan' className = 'form-control bg-transparent text-black' />
                            </div>

                            <div className="col form-group">
                                <label>Apellido</label>
                                <input type="text" placeholder = 'Taveras' className = 'form-control bg-transparent text-black' />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col form-group">
                                <label>Correo Electrónico</label>
                                <input type="text" placeholder = 'Ejemplo@hotmail.com' className = 'form-control bg-transparent text-black ' />
                            </div>

                            <div className="col form-group">
                                <label>Imagen</label>
                                <button type='button' onClick={onClickImage} className='btn btn-primary form-control'>Seleccionar foto de perfil <i className="bi bi-images btn-primary mx-1"></i></button>
                                <input accept="image/*" id='fileSelector' hidden = {true} type="file" className='form-control bg-transparent text-black' name='image' />
                            </div>

                        </div>

                        <div className="row">

                            <div className="col form-group">
                                <label>Cambiar contraseña</label>
                                <input type="text" placeholder = '********' className = 'form-control bg-transparent text-black ' />
                            </div>

                            <div className="col form-group">
                                <label>Confirmar contraseña</label>
                                <input type="text" placeholder = '********' className = 'form-control bg-transparent text-black ' />
                            </div>
                        </div>
                        
                        <div className='d-grid gap-2 col-6 mx-auto'>
                            <button type='submit' className = 'btn btn-primary  my-2'>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Sidebar>
  )
}
