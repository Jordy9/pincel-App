import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export const CustomEvaluacion = () => {

    const [rating, setRating] = useState(0)

  return (
    <div className = 'container'>
        <h1 className='text-center my-5'>¿Cómo te sientes hoy con nosotros?</h1>
        <div className='d-flex justify-content-center'>
            <div className='text-center mt-3'>
                <Rating emptyColor='#828282' onClick={(rate) => setRating(rate)} ratingValue={rating} />
            </div>
        </div>
        
        <div className = 'row my-5'>
            <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mx-auto'>
                <h5 className='text-center'>¿Algo que nos quieras decir?</h5>
                <textarea autoFocus type="text" cols={30} rows={10} style = {{resize: 'none'}} placeholder='Descripción de la Reseña' className='form-control' />
                
                <div className="d-grid gap-2 col-2 mx-auto mt-4">
                    <button className='btn btn-primary btn-lg' style={{height: '50px'}}>Finalizar</button>
                </div>
            </div>
        </div>
    </div>
  )
}
