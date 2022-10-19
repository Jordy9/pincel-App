import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { actualizarResena } from '../../store/toShowResena/thunk'
import { NavbResena } from './NavbResena'
import { Emoji } from './Emoji'
import { Star } from './Star'
import Slider from 'react-slick'
import { useResponsive } from '../../hooks/useResponsive'
import { useRef } from 'react'
export const TipoResenas = () => {

    const dispatch = useDispatch();

    const { toShowResena } = useSelector(state => state.to);

    const [changeResena, setChangeResena] = useState(toShowResena[0]?.showResena)

    const [changeResenaInput, setChangeResenaInput] = useState(toShowResena[0]?.inputType)

    const [inputChangeTitle, setInputChangeTitle] = useState(toShowResena[0]?.title)

    const [inputChangePregunta, setInputChangePregunta] = useState(toShowResena[0]?.pregunta)

    const [inputTitleChange, setInputTitleChange] = useState([{
        title: ''
    }])
    
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

    const [indexEvaluacion, setindexEvaluacion] = useState(0)

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        afterChange: (e) => {setindexEvaluacion(e)},
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
              dots: false
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false
            }
          }
        ]
    };

    const [formEvaluacion, setFormEvaluacion] = useState([{
        title: '',
        emoj: 'emoji',
        input: 'none'
    }])

    const handleEvaluacion = (i, e, param) => {
        let newFormValues = [...formEvaluacion]; 
        if (e?.target?.name) {

        } else {
            newFormValues[i][e] = param;
            setFormEvaluacion(newFormValues)
        }
    }

    const ref = useRef()

    const agregarEvaluacion = () => {
        setFormEvaluacion([...formEvaluacion, {emoj: 'emoji', input: 'none'}])
        ref?.current?.slickNext()
    }

    const eliminarEvaluacion = (i) => {
        let newFormValues = [...formEvaluacion];
        newFormValues.splice(i, 1);
        setFormEvaluacion(newFormValues)
    }

    const [ respWidth ] = useResponsive()
  return (
    <>
        <NavbResena />
        <div className='p-4 mt-5'>

            <h1>Tipo de reseñas</h1>

            {
                (respWidth > 992)
                    &&
                <div className='p-4 shadow bg-white' style={{position: 'fixed', zIndex: 1045, borderRadius: '20px', top: 100, right: 25}}>
                    <button type='button' onClick={() => handleEvaluacion(indexEvaluacion, 'emoj', 'star')} className={`btn ${(formEvaluacion[indexEvaluacion]?.emoj === 'star') ? 'btn-primary' : 'btn-transparent'} mr-2`}>
                        <i data-bs-toggle="tooltip" data-bs-placement="left" title="Al hacer click sobre la estrella, podrá recibir reseñas mediante estas" style={{fontSize: '30px'}} className="bi bi-star-fill text-warning"></i>
                    </button>

                    <button type='button' onClick={() => handleEvaluacion(indexEvaluacion, 'emoj', 'emoji')} className={`btn ${(formEvaluacion[indexEvaluacion]?.emoj === 'emoji') ? 'btn-primary' : 'btn-transparent'} ml-2`}>
                        <i data-bs-toggle="tooltip" data-bs-placement="left" title="Al hacer click sobre el emoji, podrá recibir reseñas mediante estos" style={{fontSize: '30px'}} className="bi bi-emoji-smile-fill text-warning"></i>
                    </button>

                    <button type='button' onClick={() => handleEvaluacion(indexEvaluacion, 'input', 'Input')} className={`btn ${(formEvaluacion[indexEvaluacion]?.input === 'Input') ? 'btn-primary' : 'btn-transparent'} ml-2`}>
                        <i data-bs-toggle="tooltip" data-bs-placement="left" title="Al hacer click sobre el text input, podrá recibir comentarios de las reseña" style={{fontSize: '30px'}} className="bi bi-chat-square-dots-fill text-warning"></i>
                    </button>

                    <button type='button' onClick={() => handleEvaluacion(indexEvaluacion, 'input', 'TextareaMediano')} className={`btn ${(formEvaluacion[indexEvaluacion]?.input === 'TextareaMediano') ? 'btn-primary' : 'btn-transparent'} ml-2`}>
                        <i data-bs-toggle="tooltip" data-bs-placement="left" title="Al hacer click sobre el text input mediano, podrá recibir comentarios de las reseña en un espacio mas grande" style={{fontSize: '30px'}} className="bi bi-chat-square-text-fill text-warning"></i>
                    </button>

                    <button type='button' onClick={() => handleEvaluacion(indexEvaluacion, 'input', 'none')} className={`btn ${(formEvaluacion[indexEvaluacion]?.input === 'none') ? 'btn-primary' : 'btn-transparent'}`}>
                        <i data-bs-toggle="tooltip" data-bs-placement="left" title="Al hacer click sobre el text input vacio, no podrá recibir comentarios de las reseña" style={{fontSize: '30px'}} className="bi bi-chat-square-fill text-warning"></i>
                    </button>
                </div>
            }


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
                    
                    <div className = 'row mb-2'>
                        <div className = 'col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 mx-auto'>
                            <div className="form-group">
                                <label>Titulo principal</label>
                                <input type="text" onChange={({target}) => setInputChangeTitle(target.value)} placeholder='Titulo de esta reseña' value={inputChangeTitle} className='form-control' />
                            </div>
                        </div>
                    </div>

                    {
                        (respWidth < 992)
                            &&
                        <div className="row mb-3">
                            <div className="col-12 mx-auto d-flex">
                                <div className='p-2 shadow bg-white mx-auto' style={{borderRadius: '20px', width: '380px'}}>
                                    <button type='button' onClick={() => handleEvaluacion(indexEvaluacion, 'emoj', 'star')} className={`btn ${(formEvaluacion[indexEvaluacion]?.emoj === 'star') ? 'btn-primary' : 'btn-transparent'} mr-1`}>
                                        <i style={{fontSize: '30px'}} className="bi bi-star-fill text-warning"></i>
                                    </button>
                
                                    <button type='button' onClick={() => handleEvaluacion(indexEvaluacion, 'emoj', 'emoji')} className={`btn ${(formEvaluacion[indexEvaluacion]?.emoj === 'emoji') ? 'btn-primary' : 'btn-transparent'} ml-1`}>
                                        <i style={{fontSize: '30px'}} className="bi bi-emoji-smile-fill text-warning"></i>
                                    </button>
                                    <button type='button' onClick={() => handleEvaluacion(indexEvaluacion, 'input', 'Input')} className={`btn ${(formEvaluacion[indexEvaluacion]?.input === 'Input') ? 'btn-primary' : 'btn-transparent'} ml-1`}>
                                        <i style={{fontSize: '30px'}} className="bi bi-chat-square-dots-fill text-warning"></i>
                                    </button>
                                    <button type='button' onClick={() => handleEvaluacion(indexEvaluacion, 'input', 'TextareaMediano')} className={`btn ${(formEvaluacion[indexEvaluacion]?.input === 'TextareaMediano') ? 'btn-primary' : 'btn-transparent'} ml-1`}>
                                        <i style={{fontSize: '30px'}} className="bi bi-chat-square-text-fill text-warning"></i>
                                    </button>
                                    <button type='button' onClick={() => handleEvaluacion(indexEvaluacion, 'input', 'none')} className={`btn ${(formEvaluacion[indexEvaluacion]?.input === 'none') ? 'btn-primary' : 'btn-transparent'} ml-1`}>
                                        <i style={{fontSize: '30px'}} className="bi bi-chat-square-fill text-warning"></i>
                                    </button>
                                </div>

                            </div>
                        </div>
                    }

                    <div className = 'row'>
                        <Slider swipe = {false} ref = {ref} {...settings}>
                            {
                                formEvaluacion?.map((ev, index) => {
                                    return (
                                        <div className = 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mx-auto'>
                                            <button className='btn btn-primary mb-2'>{index + 1}</button>
                                            {
                                                (ev?.emoj === 'star')
                                                    ?
                                                <Star input = {ev?.input} handleTitle = {handleEvaluacion} index = {index} inputTitle = {ev?.title} />
                                                    :
                                                <Emoji input = {ev?.input} handleTitle = {handleEvaluacion} index = {index} inputTitle = {ev?.title} />
                                            }
                                            <div className="row mt-5">
                                                <div className="col-12">
                                                    {
                                                        (formEvaluacion.length === index + 1)
                                                            &&
                                                        <button onClick={agregarEvaluacion} type='button' className='btn btn-primary mx-1'>
                                                            <i className="bi bi-plus-lg"></i>
                                                        </button>  
                                                    }

                                                    {
                                                        (formEvaluacion.length > 1)
                                                            &&
                                                        <button onClick={() => eliminarEvaluacion(index)} type='button' className='btn btn-primary mx-1'>
                                                            <i className="bi bi-trash-fill"></i>
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>

                    <div className="text-center mt-5">
                        <button type='submit' className='btn btn-primary'>Guardar reseña personalizada</button>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}
