import React from 'react'
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-labels";
import ChartDataLabels from 'chartjs-plugin-datalabels'
import star from '../../heroes/star.png'  

export const CardsAdmin = ( { resenasFiltradas, mes, calificacionPorMeses, show } ) => {

  const FiltroCalificacionResena = (resenasFiltradas) && resenasFiltradas.reduce(
    (previousValue, currentValue) => [...previousValue, ...currentValue?.calificacion],
    ['Alphabet'],
  );

  const sinAlphabet = (resenasFiltradas) ? FiltroCalificacionResena.slice(1) : []

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
        },
      }],
    },
    plugins: {
      tooltips: {
        callbacks: {
            labelColor: function(tooltipItem, chart) {
                return {
                  tooltipItem,
                  chart,
                    borderColor: 'rgb(255, 0, 0)',
                    backgroundColor: 'rgb(255, 0, 0)'
                }
            }
        }
    },
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
  
  const labels = (!show) ? [labels1[mes - 1]] : labels1

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
    labels,
    datasets: [
      {
        label: 'Promedio',
        data: (!show) ? [porcentage?.toFixed(1)] : calificacionPorMeses?.map(calififacion => calififacion?.toFixed(1)),
        backgroundColor: 'green',
      }
    ],
  };

  return (
    <>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 my-2">
          <div className="shadow p-4" style={{borderRadius: '35px'}}>
            <h6 className='text-center my-1'>Evaluaciones de los empleados</h6>
            <h6 className='text-center'>Total 0</h6>
            <Bar options={options} data={data} />
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 my-2">
          <div className="shadow p-4" style={{borderRadius: '35px'}}>
            <h6 className='text-center my-1'>Reseñas de los clientes</h6>
            <h6 className='text-center'>Total de reseñas {resenasFiltradas?.length}</h6>
            <Bar options={options2} data={data2} plugins = {ChartDataLabels} data-bs-toggle="tooltip" data-bs-placement="left" title="3/10 cursos completados" />
          </div>
        </div>
    </>
  )
}
