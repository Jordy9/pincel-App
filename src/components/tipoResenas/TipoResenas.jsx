import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { actualizarResena } from '../../store/toShowResena/thunk'
import { Sidebar } from '../Sidebar'

export const TipoResenas = () => {

    const dispatch = useDispatch();

    const { toShowResena } = useSelector(state => state.to);

    const [changeResena, setChangeResena] = useState(toShowResena[0]?.showResena)

    const [changeResenaInput, setChangeResenaInput] = useState(toShowResena[0]?.inputType)

    const [inputChangeTitle, setInputChangeTitle] = useState(toShowResena[0]?.title)

    const [inputChangePregunta, setInputChangePregunta] = useState(toShowResena[0]?.pregunta)
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if (inputChangeTitle?.trim()?.length > 2 && inputChangePregunta?.trim()?.length > 2) {
            dispatch(actualizarResena({
                _id: toShowResena[0]?._id,
                showResena: changeResena,
                title: inputChangeTitle,
                pregunta: inputChangePregunta,
                inputType: changeResenaInput
            }))
        }
    }

  return (
    <Sidebar>
        <div className='p-4'>

            <h1>Tipo de reseñas</h1>

            <h5 className='mt-5'>¿Por cuál reseña le gustaría que los clientes evaluaran el servicio?</h5>

            <form onSubmit={handleSubmit}>
                <div style={{display: 'inline-flex'}}>
                    <div className="form-check">
                        <input value='Normal' onChange={({target}) => setChangeResena(target.value)} defaultChecked = {(changeResena === 'Normal')} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" />
                        <label className="form-check-label" for="exampleRadios1">Reseña normal</label>
                    </div>

                    <div className="form-check mx-3">
                        <input value='Custom' onChange={({target}) => setChangeResena(target.value)} defaultChecked = {(changeResena === 'Custom')} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" />
                        <label className="form-check-label" for="exampleRadios2">Reseña personalizada</label>
                    </div>
                </div>


                <div className = 'container my-5'>
                    
                    <div className = 'row'>
                        <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 mx-auto'>
                            <div className="form-group">
                                <input type="text" onChange={({target}) => setInputChangeTitle(target.value)} placeholder='Titulo de esta reseña' value={inputChangeTitle} className='form-control' />

                                <div className='text-center mt-3'>
                                    <Rating emptyColor='#828282' readonly />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className = 'row mt-5 mb-2'>
                        <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 mx-auto'>
                            <input type="text" onChange={({target}) => setInputChangePregunta(target.value)} placeholder='Pregunta al cliente' value={inputChangePregunta} className='form-control' />
                        </div>
                    </div>

                    <div className = 'row'>
                        <div className = 'col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mx-auto'>
                            <div className="form-check">
                                <input value='Input' onChange={({target}) => setChangeResenaInput(target.value)} defaultChecked = {(changeResenaInput === 'Input')} className="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios3" />
                                <label className="form-check-label" for="exampleRadios3">Input normal</label>
                            </div>
                            <input type="text" placeholder='Descripción de la Reseña' readOnly className='form-control' />
                        </div>

                        <div className = 'col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mx-auto'>
                            <div className="form-check">
                                <input value='TextareaMediano' onChange={({target}) => setChangeResenaInput(target.value)} defaultChecked = {(changeResenaInput === 'TextareaMediano')} className="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios4" />
                                <label className="form-check-label" for="exampleRadios4">Input Mediano</label>
                            </div>
                            <textarea readOnly autoFocus type="text" cols={30} rows={5} style = {{resize: 'none'}} placeholder='Descripción de la Reseña' className='form-control' />
                        </div>

                        <div className = 'col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mx-auto'>
                            <div className="form-check">
                                <input value='TextareaGrande' onChange={({target}) => setChangeResenaInput(target.value)} defaultChecked = {(changeResenaInput === 'TextareaGrande')} className="form-check-input" type="radio" name="exampleRadios3" id="exampleRadios5" />
                                <label className="form-check-label" for="exampleRadios5">Input Grande</label>
                            </div>
                            <textarea readOnly autoFocus type="text" cols={30} rows={10} style = {{resize: 'none'}} placeholder='Descripción de la Reseña' className='form-control' />
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <button type='submit' className='btn btn-primary'>Guardar reseña personalizada</button>
                    </div>
                </div>
            </form>
        </div>
    </Sidebar>
  )
}
