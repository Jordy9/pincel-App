import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Charts = ({tipo}) => {

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

  return (
    <>
        <div className="col-6 my-2">
            <div className='shadow p-4 d-flex flex-column align-items-center' style={{width: '100%', height: '300px', borderRadius: '3px'}}>
                <h4 className='text-black'>Calificaciones</h4>
                {
                  (tipo === 'Doughnut')
                    ?
                  <Doughnut data={data} />
                    :
                  <Pie data={data} />
                }
            </div>
        </div>

        {/* <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 my-2">
            <div className='shadow p-4 d-flex flex-column align-items-center' style={{width: '100%', height: 'auto', borderRadius: '3px', backgroundColor: '#F6F6F6'}}>
                <h4 className='text-black'>Indice general</h4>
                <Pie data={data} />
            </div>
        </div> */}
    </>
  )
}
