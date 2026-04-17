
import { Chart as ChartJS, LinearScale, CategoryScale, LineController, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LinearScale, CategoryScale, LineController, PointElement, LineElement, Title, Tooltip, Legend);
const LineChart = ({ appointmentsByYear }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#1e293b',
                bodyColor: '#475569',
                borderColor: '#e2e8f0',
                borderWidth: 1,
                padding: 12,
                boxPadding: 4,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                beginAtZero: true,
                min: 0,
                ticks: {
                    stepSize: 1,
                    color: '#94a3b8',
                    font: {
                        size: 11
                    }
                },
                grid: {
                    color: '#f1f5f9'
                }
            },
        },
        elements: {
            line: {
                tension: 0.4,
                borderWidth: 3,
                fill: true,
            },
            point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 6,
            }
        }
    };

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Monthly Appointments',
                data: appointmentsByYear,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return <Line options={options} data={data} />;
};

export default LineChart;
