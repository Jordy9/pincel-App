import React from 'react'
import { Rating } from 'react-simple-star-rating'

export const Star = ({input, index, handleTitle, inputTitleChange}) => {
  return (
    <>
        <div className = 'row'>
            <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 mx-auto'>
                <div className="form-group">
                    <input type="text" onChange={({target}) => handleTitle(index, target.value)} placeholder='Titulo de esta reseña' value={inputTitleChange} className='form-control' />

                    <div className='text-center mt-3'>
                        <Rating emptyColor='#828282' readonly size={50} />
                    </div>
                </div>
            </div>
        </div>

        <div className = 'row'>
            {
                (input === 'Input')
                    &&
                <div className = 'col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 mx-auto'>
                    <input type="text" placeholder='Descripción de la Reseña' readOnly className='form-control' />
                </div>
            }

            {
                (input === 'TextareaMediano')
                    &&
                <div className = 'col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 mx-auto'>
                    <textarea readOnly type="text" cols={30} rows={5} style = {{resize: 'none'}} placeholder='Descripción de la Reseña' className='form-control' />
                </div>
            }

            {
                (input === '')
                    &&
                <></>
            }
        </div>
    </>
  )
}
