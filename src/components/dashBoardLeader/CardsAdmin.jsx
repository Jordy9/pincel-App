import React, { useState } from 'react'
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-labels";
import ChartDataLabels from 'chartjs-plugin-datalabels'
import star from '../../heroes/star.png'  
import moment from 'moment';
import { onDoubleTap } from '../../helper/onDoubleTap';
import { ModalResenaPorMes } from './ModalResenaPorMes';

export const CardsAdmin = ( { resenasFiltradas, mes, calificacionPorMeses, show, respWidth, changeShowResena, setChangeShowResena, defineds, changeDate, changeDateRange, showThisWeek, showLastWeek, showThreeMonth, showAllMonth, onlyThreeMonths, usuariosParaAdminLeader, evaluacionFiltradaPorRango, evaluacionFiltroTodosLosMeses, evaluacionCount } ) => {

  let FiltroCalificacionResena

  if (resenasFiltradas && resenasFiltradas[0]?.estado) {
    FiltroCalificacionResena = (resenasFiltradas) && resenasFiltradas?.filter(resena => resena?.estado === true)?.reduce(
      (previousValue, currentValue) => [...previousValue, ...currentValue?.calificacion],
      ['Alphabet'],
    );
  } else {
    FiltroCalificacionResena = (resenasFiltradas) && resenasFiltradas?.reduce(
      (previousValue, currentValue) => [...previousValue, ...currentValue?.calificacion],
      ['Alphabet'],
    );
  }

  let sinAlphabet

  sinAlphabet = (resenasFiltradas) ? FiltroCalificacionResena?.filter(usuario => usuariosParaAdminLeader?.some(usuarios => usuarios?.id === usuario?.id)) : []

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
    tooltips: {
      callbacks: {
          label: function(tooltipItem, data) {
              const monthIndex = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
              var label = data.datasets[tooltipItem.datasetIndex].label || '';
              const resenasFilt = (resenasFiltradas && resenasFiltradas[0]?.estado) ? resenasFiltradas?.filter(resena => resena?.estado === true)?.length : resenasFiltradas?.length || 0

              if (label) {
                label += ': ';
              }

              let ThreeAllmeses

              if (showAllMonth) {
                ThreeAllmeses = calificacionPorMeses[tooltipItem.index][1]
              }

              if (onlyThreeMonths) {
                ThreeAllmeses = (calificacionPorMeses[monthIndex.indexOf(tooltipItem.xLabel)]) && calificacionPorMeses[monthIndex.indexOf(tooltipItem.xLabel)][1]
              }

              return [
                label += Math.round(tooltipItem.yLabel * 100) / 100,
                `Total de resenas ${(!showThreeMonth || !showAllMonth) ? resenasFilt : ThreeAllmeses || 0}`
              ]
          }
      }
    },
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

  const labels = (!show) ? [labels1.slice((mes[0] - 1), (mes[1] || 0))] : labels1

  let resta = (mes[0] - 1) - 11

  resta = (~resta + 1)

  let arregloNuevosLabels = []

  if (mes[0] - 1 > mes[1] && moment(changeDate).format('Y') === moment(changeDateRange).format('Y')) {
    arregloNuevosLabels = labels1.slice(mes[0] - 1, Number(mes[0]) + resta)
    arregloNuevosLabels.push(...labels1.slice(0, Number(mes[1])))
  }

  if (moment(changeDate).format('Y') !== moment(changeDateRange).format('Y')) {
    arregloNuevosLabels = labels1.slice(mes[0] - 1, Number(mes[0]) + resta)
    arregloNuevosLabels.push(...labels1.slice(0, mes[1]))
  }

  const data = {
    labels: ((moment(changeDate, 'M') !== moment(changeDateRange, 'M') && showThisWeek) || (moment(changeDate, 'M') !== moment(changeDateRange, 'M') && showLastWeek))
      ? 
    [`Desde ${moment(changeDate).format('MMMM D')}, hasta ${moment(changeDateRange).format('MMMM D')}`]
      :
    (showThreeMonth)
      ?
    (mes[0] - 1 > mes[1] && moment(changeDate).format('Y') === moment(changeDateRange).format('Y'))
      ?
    arregloNuevosLabels
      :
    (moment(changeDate).format('Y') !== moment(changeDateRange).format('Y'))
      ?
    arregloNuevosLabels
      :
    labels1.slice(mes[0] - 1, mes[1])
      :
    labels,
    datasets: [
      {
        label: 'Promedio general',
        data: (!show) 
          ? 
        [evaluacionFiltradaPorRango]
          : 
        (showThreeMonth) 
          ? 
        (mes[0] - 1 > mes[1] && moment(changeDate).format('Y') === moment(changeDateRange).format('Y')) 
          ? 
        evaluacionFiltroTodosLosMeses?.map(calififacion => calififacion?.toFixed(1))
          : 
        (moment(changeDate).format('Y') !== moment(changeDateRange).format('Y'))
          ?
        evaluacionFiltroTodosLosMeses?.map(calififacion => calififacion?.toFixed(1))
          :
        evaluacionFiltroTodosLosMeses?.slice(mes[0] - 1, mes[1])?.map(calififacion => calififacion?.toFixed(1))
          : 
        evaluacionFiltroTodosLosMeses?.map(calififacion => calififacion?.toFixed(1)),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  const data2 = {
    labels: ((moment(changeDate, 'M') !== moment(changeDateRange, 'M') && showThisWeek) || (moment(changeDate, 'M') !== moment(changeDateRange, 'M') && showLastWeek))
      ? 
    [`Desde ${moment(changeDate).format('MMMM D')}, hasta ${moment(changeDateRange).format('MMMM D')}`]
      :
    (showThreeMonth)
      ?
    (mes[0] - 1 > mes[1] && moment(changeDate).format('Y') === moment(changeDateRange).format('Y'))
      ?
    arregloNuevosLabels
      :
    (moment(changeDate).format('Y') !== moment(changeDateRange).format('Y'))
      ?
    arregloNuevosLabels
      :
    labels1.slice(mes[0] - 1, mes[1])
      :
    labels,
    datasets: [
      {
        label: 'Promedio',
        data: (!show) 
          ? 
        [porcentage?.toFixed(1)] 
          : 
        (showThreeMonth) 
          ? 
        (mes[0] - 1 > mes[1] && moment(changeDate).format('Y') === moment(changeDateRange).format('Y')) 
          ? 
        calificacionPorMeses?.map(calififacion => calififacion[0]?.toFixed(1))
          : 
        (moment(changeDate).format('Y') !== moment(changeDateRange).format('Y'))
          ?
        calificacionPorMeses?.map(calififacion => calififacion[0]?.toFixed(1))
          :
        calificacionPorMeses?.slice(mes[0] - 1, mes[1])?.map(calififacion => calififacion[0]?.toFixed(1))
          : 
        calificacionPorMeses?.map(calififacion => calififacion[0]?.toFixed(1)),
        backgroundColor: 'green',
      }
    ],
  };

  const [showModalResena, setShowModalResena] = useState(false)

  const handledActive = () => {
    setShowModalResena(true)
  }

  return (
    <>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 my-2">
        <div className={`shadow ${(respWidth > 610) ? 'p-4' : 'p-1'} p-4`} style={{borderRadius: '35px'}}>
          <h6 className='text-center my-1'>Evaluaciones de los empleados</h6>
          <h6 className='text-center'>Total {evaluacionCount}</h6>
          <Bar options={options} data={data} width = {((respWidth < 610) && '100%')} height = {((respWidth < 610) && '80%')} />
        </div>
      </div>

      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 my-2">
        <div onTouchStart = {(e) => onDoubleTap(e, handledActive)} onDoubleClick={handledActive} className={`shadow ${(respWidth > 610) ? 'p-4' : 'p-1'}`} style={{borderRadius: '35px', cursor: 'pointer'}}>
          <h6 className='text-center my-1'>Reseñas de los clientes</h6>
          <h6 className='text-center'>Total de reseñas {(resenasFiltradas && resenasFiltradas[0]?.estado) ? resenasFiltradas?.filter(resena => resena?.estado === true)?.length : resenasFiltradas?.length || 0}</h6>
          <Bar options={options2} data={data2} plugins = {ChartDataLabels} width = {((respWidth < 610) && '100%')} height = {((respWidth < 610) && '80%')} />
        </div>
      </div>

      {
        (showModalResena)
          &&
        <ModalResenaPorMes showModalResena = {showModalResena} setShowModalResena = {setShowModalResena} />
      }

    </>
  )
}
