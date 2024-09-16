<<<<<<< HEAD
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const CharByDate = () => {
    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Tổng doanh thu',
        backgroundColor: 'blue',
        borderColor: 'blue',
        data: [3000, 8050, 2500, 10000, 900, 1000, 0],
        tension: 0.4,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
  };

  return (
    <div>
      <Line data={data} options={config} />
    </div>
  );
};

=======
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const CharByDate = () => {
    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Tổng doanh thu',
        backgroundColor: 'blue',
        borderColor: 'blue',
        data: [3000, 8050, 2500, 10000, 900, 1000, 0],
        tension: 0.4,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
  };

  return (
    <div>
      <Line data={data} options={config} />
    </div>
  );
};

>>>>>>> a6c8c6b71b9ef510265e306c33775a3a4e7adc4d
export default CharByDate;