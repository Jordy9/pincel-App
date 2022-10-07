import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Rating } from 'react-simple-star-rating'
import { crearCustomResena } from '../../store/customResena/thunk'

export const CustomEvaluacion = () => {

    const dispatch = useDispatch()

    const [rating, setRating] = useState(0)

    const { toShowResena } = useSelector(state => state.to);

    const [comenzar, setComenzar] = useState(true)

    const [descripcion, setDescripcion] = useState('')

    const [disableButtom, setDisableButtom] = useState(false)

    let titulo = toShowResena[0]?.title

    const handleSubmit = (e) => {
        e.preventDefault()
        setDisableButtom(true)
        dispatch(crearCustomResena(titulo, rating, descripcion, setComenzar, setDisableButtom))
        setDescripcion('')
        setRating(0)
    }

  return (
    <div className = 'container d-flex align-items-center justify-content-center' style={{height: '100vh'}}>

        <div hidden = {!comenzar} className='text-center'>
            <span className='text-center' style={{fontSize: '50px', fontWeight: '600'}}>Nos gustaría que nos dijeras cómo le atendimos hoy</span>
            <div className="row">
                <div className='d-grid gap-2 col-2 mx-auto'>
                    <button type='button' className = 'btn btn-primary btn-lg my-5' onClick={() => setComenzar(false)} style={{height: 'auto', fontSize: '30px'}}>Comenzar</button>
                </div>
            </div>
        </div>


        <div hidden = {comenzar}>
            <form onSubmit={handleSubmit}>
                <h1 className='text-center my-5'>{toShowResena[0]?.title}</h1>
                <div className='d-flex justify-content-center'>
                    <div className='text-center mt-3'>
                        <Rating emptyColor='#828282' onClick={(rate) => setRating(rate)} ratingValue={rating} />
                    </div>
                </div>
                
                <div className = 'row my-5'>
                    <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mx-auto'>
                        <h5 className='text-center'>{toShowResena[0]?.pregunta}</h5>

                        {
                            (toShowResena[0]?.inputType === 'Input')
                                &&
                            <input autoFocus value={descripcion} onChange={({target}) => setDescripcion(target.value)} type="text" placeholder='Descripción de la Reseña' className='form-control' />
                        }

                        {
                            (toShowResena[0]?.inputType === 'TextareaMediano')
                                &&
                            <textarea value={descripcion} onChange={({target}) => setDescripcion(target.value)} autoFocus type="text" cols={30} rows={5} style = {{resize: 'none'}} placeholder='Descripción de la Reseña' className='form-control' />
                        }

                        {
                            (toShowResena[0]?.inputType === 'TextareaGrande')
                                &&
                            <textarea value={descripcion} onChange={({target}) => setDescripcion(target.value)} autoFocus type="text" cols={30} rows={10} style = {{resize: 'none'}} placeholder='Descripción de la Reseña' className='form-control' />
                        }
                        
                        <div className="d-grid gap-2 col-2 mx-auto mt-4">
                            <button disabled = {disableButtom} className='btn btn-primary btn-lg' style={{height: '50px'}}>Finalizar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
