import React, { useState } from 'react'
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-labels";
import ChartDataLabels from 'chartjs-plugin-datalabels'
import star from '../../heroes/star.png'

export const CardsAdmin = ( { resenasFiltradas, mes } ) => {

  const [show, setShow] = useState(true)

  // console.log(resenasFiltradas)

  const FiltroCalificacionResena = resenasFiltradas.reduce(
    (previousValue, currentValue) => [...previousValue, ...currentValue?.calificacion],
    ['Alphabet'],
  );

  const sinAlphabet = FiltroCalificacionResena.slice(1)

  let suma = 0

  sinAlphabet?.map(resena => suma = suma + resena?.calificacion)

  const totalSumado = suma/sinAlphabet?.length

  const porcentage = (5*totalSumado) / 100

  const options = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
            max: 5.5,
            beginAtZero: true,
            userCallback: function(label, index, labels) {
                // when the floored value is the same as the value we have a whole number
                if (Math.floor(label) === label) {
                    return label;
                }

            },
        }
      }],
    },
    plugins: {
      labels: {
        render: "value",
        fontColor: 'black'
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Evaluaciones de los empleados',
        fontColor: 'black',
      },
      datalabels: {
        anchor: 'end',
        align: 'right',
        offset: 50
    }
    },
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        ticks: {
            max: 5.8,
            beginAtZero: true,
            userCallback: function(label, index, labels) {
                // when the floored value is the same as the value we have a whole number
                if (Math.floor(label) === label) {
                    return label;
                }

            },
        }
      }],
    },
    plugins: {
      labels: {
        render: "image",
        images: [
          {
            src: star,
  
            height: 30,
            width: 30,
          },
          {
            src: star,
            height: 30,
            width: 30
          },
          {
            src: star,
            height: 30,
            width: 30
          },
          {
            src: star,
            height: 30,
            width: 30
          },
          {
            src: star,
            height: 30,
            width: 30
          },
          {
            src: star,
            height: 30,
            width: 30
          },
          {
            src: star,
            height: 30,
            width: 30
          },
          {
            src: star,
            height: 30,
            width: 30
          },
          {
            src: star,
            height: 30,
            width: 30
          },
          {
            src: star,
            height: 30,
            width: 30
          },
          {
            src: star,
            height: 30,
            width: 30
          },
          {
            src: star,
            height: 30,
            width: 30
          },
        ]
      },
      datalabels: {
        anchor: 'center',
        align: 'center',
        color: 'white',
      }
    }
  };

  
  const labels1 = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  const labels3 = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const labels2 = ['Julio'];

  const labels = (show) ? labels2 : labels1

  const data = {
    labels,
    datasets: [
      {
        label: 'Promedio general',
        data: [5, 1, 3, 1, 4, 5, 1, 0, 4.5, 3.2, 1.5, 2],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const data2 = {
    labels: [labels3[mes - 1]],
    datasets: [
      {
        label: 'Reseñas',
        data: [porcentage?.toFixed(1)],
        backgroundColor: 'blue',
      },
    ],
  };

  return (
    <>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 my-2">
          <div className="shadow p-4" style={{borderRadius: '35px'}}>
            <button disabled = {(show === false)} className='btn btn-primary mr-1' onClick={() => setShow(false)}>Todos los meses</button>
            <button disabled = {show} className='btn btn-primary ml-1' onClick={() => setShow(true)}>Mes actual</button>
            <h6 className='text-center my-1'>Evaluaciones de los empleados</h6>
            <Bar options={options} data={data} />
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 my-2">
          <div className="shadow p-4" style={{borderRadius: '35px'}}>
            <button disabled = {(show === false)} className='btn btn-primary mr-1' onClick={() => setShow(false)}>Todos los meses</button>
            <button disabled = {show} className='btn btn-primary ml-1' onClick={() => setShow(true)}>Mes actual</button>
            <h6 className='text-center my-1'>Reseñas de los clientes</h6>
            <Bar options={options2} data={data2} plugins = {ChartDataLabels} />
          </div>
        </div>
    </>
  )
}
