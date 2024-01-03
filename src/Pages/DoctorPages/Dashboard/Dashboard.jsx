import React from 'react';
import Header from '../../../Components/DoctorComponents/Header/Header';
import Footer from '../../../Components/DoctorComponents/Footer/Footer';
import DashboardData from '../../../Components/DoctorComponents/DashboardData/DashboardData';
import LineChart from '../../../Components/DoctorComponents/LineChart/LineChart';
import PieChart from '../../../Components/DoctorComponents/PieChart/PieChart';


const Dashboard = () => {
    return (
        <>
            <Header />
            <div className='text-center bg-blue-50 text-3xl text-black c pt-10'>
                <h1>Dashboard</h1>
            </div>
            <div className="hero min-h-screen bg-blue-50 ">
                <div>
                    <DashboardData />
                    <LineChart />
                    <PieChart />
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Dashboard;