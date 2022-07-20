import React, { useState } from 'react'
import { useResponsive } from '../../hooks/useResponsive'
import {
  Chart as ChartJS,
  // ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  // ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const CardsAdmin = () => {

  const [show, setShow] = useState(true)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Evaluaciones de los empleados',
      },
    },
  };

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Reseñas de los clientes',
      },
    },
  };

  const labels1 = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const labels2 = ['Julio'];

  const labels = (show) ? labels2 : labels1

  const data = {
    labels,
    datasets: [
      {
        label: 'Promedio general',
        data: labels.map(() => '15'),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const data2 = {
    labels,
    datasets: [
      {
        label: 'Reseñas',
        data: labels.map(() => '15'),
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
            <Bar options={options} data={data} />
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 my-2">
          <div className="shadow p-4" style={{borderRadius: '35px'}}>
            <button disabled = {(show === false)} className='btn btn-primary mr-1' onClick={() => setShow(false)}>Todos los meses</button>
            <button disabled = {show} className='btn btn-primary ml-1' onClick={() => setShow(true)}>Mes actual</button>
            <Bar options={options2} data={data2} />
          </div>
        </div>
    </>
  )
}
