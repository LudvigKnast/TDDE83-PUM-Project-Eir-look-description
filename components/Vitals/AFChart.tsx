// This component displays a graph of the breathing frequency
import { FC, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './AFChart.css';

import { Chart } from 'chart.js';
import { Skeleton } from '@mui/material';
Chart.register(ChartDataLabels);

interface IProps {
  patientID: number;
  overview: boolean;
}

type AF = {
  AF: number;
  time: string;
};

const AFChart: FC<IProps> = ({ patientID, overview }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [af, setAf] = useState([]);
  const [time, setTime] = useState([]);
  const [color, setColor] = useState<string[]>([]);

  // This function decides the color of the data points depending on the frequency.
  // The interval is based on an adult patient
  function getColor(frequency: any) {
    if (frequency < 26 && frequency > 7) {
      return 'rgb(109, 160, 221)';
    } else if (frequency < 31 && frequency > 25) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  // When the page is loaded we make an API fetch
  useEffect(() => {
    fetch(`/api/getonepatient/${patientID}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // The data is stored in the state variables
        const frequence = data.patient.breathing_frequence.map((a: AF) => a.AF);
        setAf(frequence);
        const time = data.patient.temp.map((a: AF) => a.time);
        setTime(time);

        // The colors are decided and stored in a state variable
        const colors: string[] = [];
        frequence.forEach(function (item: any) {
          colors.push(getColor(item));
        });
        setColor(colors);

        setIsLoading(false);
      });
  }, [patientID]);

  return !isLoading ? (
    // First the graph for the overview page and then for the vitals page
    <div className="af-container">
      {overview === true ? (
        <Line
          data={{
            labels: time,
            datasets: [
              {
                label: 'Andningsfrekvens',
                data: af,
                pointBackgroundColor: 'rgb(109, 160, 221)',
                pointBorderColor: 'rgb(109, 160, 221)',
                pointRadius: 5,
                borderColor: 'rgba(109, 160, 221, 0.8)'
              }
            ]
          }}
          options={{
            plugins: {
              datalabels: {
                // Adds exclamation mark if the value is deviant from normal
                formatter: function (value: number) {
                  let i = '';
                  if (value < 8 || value > 25) {
                    i = ' !\n';
                  }
                  return i + value;
                },
                color: color,
                align: 'end',
                font: {
                  size: 14
                }
              },
              legend: {
                labels: {
                  boxWidth: 0,
                  color: 'rgb(109, 160, 221)',
                  font: {
                    size: 16
                  },
                  padding: 6
                }
              }
            },
            scales: {
              yAxis: {
                min: 0,
                max: 35,
                ticks: {
                  maxTicksLimit: 8
                }
              },
              xAxis: {
                ticks: {
                  maxTicksLimit: 6
                },
                grid: {
                  display: false
                }
              }
            },
            maintainAspectRatio: false
          }}
        />
      ) : (
        <Line
          data={{
            labels: time,
            datasets: [
              {
                label: 'Andningsfrekvens',
                data: af,
                pointBackgroundColor: 'rgb(109, 160, 221)',
                pointBorderColor: 'rgb(109, 160, 221)',
                pointRadius: 5,
                borderColor: 'rgba(109, 160, 221, 0.8)'
              }
            ]
          }}
          options={{
            plugins: {
              datalabels: {
                // Adds exclamation mark if the value is deviant from normal
                formatter: function (value: number) {
                  let i = '';
                  if (value < 8 || value > 25) {
                    i = ' !\n';
                  }
                  return i + value;
                },
                color: color,
                align: 'end',
                font: {
                  size: 18
                }
              },
              legend: {
                labels: {
                  boxWidth: 0,
                  color: 'rgb(109, 160, 221)',
                  font: {
                    size: 30
                  },
                  padding: 15
                }
              }
            },
            scales: {
              yAxis: {
                min: 0,
                max: 35,
                ticks: {
                  maxTicksLimit: 8
                }
              },
              xAxis: {
                ticks: {
                  maxTicksLimit: 6
                },
                grid: {
                  display: false
                }
              }
            },
            maintainAspectRatio: true
          }}
        />
      )}
    </div>
  ) : (
    // Loading animation while the data is fetched
    <Skeleton
      animation="wave"
      variant="rectangular"
      height={'100%'}
      width={'100%'}
    />
  );
};

export default AFChart;
