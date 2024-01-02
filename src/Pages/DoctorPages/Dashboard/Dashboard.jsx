import React from 'react';
import Header from '../../../Components/DoctorComponents/Header/Header';
import Footer from '../../../Components/DoctorComponents/Footer/Footer';
import DashboardData from '../../../Components/DoctorComponents/DashboardData/DashboardData';


const Dashboard = () => {
    return (
        <>
            <Header />
            <div className="hero min-h-screen bg-blue-50">
                <DashboardData />


            </div>
            <Footer />
        </>
    );
};

export default Dashboard;