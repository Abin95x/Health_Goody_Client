import React, { useEffect, useState } from 'react';
import Header from '../../../Components/DoctorComponents/Header/Header';
import Footer from '../../../Components/DoctorComponents/Footer/Footer';
import DashboardData from '../../../Components/DoctorComponents/DashboardData/DashboardData';
import LineChart from '../../../Components/DoctorComponents/LineChart/LineChart';
import PieChart from '../../../Components/DoctorComponents/PieChart/PieChart';
import { chartDetails } from '../../../Api/doctorApi';
import { useSelector } from 'react-redux';
import { doctorReport } from '../../../Api/doctorApi';
import { counts } from '../../../Api/doctorApi';
import Loading from "../../../Components/Loading/Loading";


const Dashboard = () => {
    const { _id } = useSelector((state) => state.reducer.doctorReducer.doctor);
    const [data, setData] = useState()
    const [pieData, setPieData] = useState()
    const [reportData, setReportData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        chartDetails(_id).then((res) => {
            setLoading(false);
            setPieData(res?.data?.obj)
        }).catch((error) => {
            setLoading(false);
            console.log(error.message);
        })
    }, [])

    useEffect(() => {
        const getCount = async () => {
            try {
                const res = await counts(_id)
                setData(res?.data)
            } catch (error) {
                console.log(error.message);
            }
        }

        const getReport = async () => {
            try {
                const report = await doctorReport()
                setReportData(report?.data?.appointmentData);
            } catch (error) {
                console.log(error.message);
            }
        }
        getCount()
        getReport()


    }, []);


    return (
        <>
            <Header />

            <div className="min-h-screen bg-blue-50 ">
                {
                    loading ? (
                        <div className="fixed inset-0 flex items-center justify-center min-h-screen">
                            <div className="spinnerouter">
                                <Loading />
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <div className='mb-10 text-center'>
                                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                                    Doctor <span className="text-blue-600">Dashboard</span>
                                </h1>
                                <div className="mt-2 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
                            </div>

                            <div className='mb-10'>
                                <DashboardData data={data} />
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                                <div className='lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 transition-all hover:shadow-md'>
                                    <div className="flex items-center justify-between mb-6 border-b pb-4">
                                        <h2 className="text-xl font-bold text-gray-800">Appointment Trends</h2>
                                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 uppercase">Monthly View</span>
                                    </div>
                                    <div className="h-[300px] sm:h-[400px]">
                                        <LineChart appointmentsByYear={reportData} />
                                    </div>
                                </div>

                                <div className='bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col transition-all hover:shadow-md'>
                                    <div className="text-center mb-6 border-b pb-4">
                                        <h2 className="text-xl font-bold text-gray-800">Status Overview</h2>
                                    </div>
                                    <div className="flex-grow flex items-center justify-center py-4">
                                        <div className="w-full max-w-[280px]">
                                            <PieChart count={pieData} />
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-6 border-t text-center">
                                        <h3 className='text-sm font-bold text-blue-600 uppercase tracking-widest'>
                                            Appointment Statistics
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">Live data from recent consultations</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }

                <br />
            </div>

            <Footer />
        </>
    );

};

export default Dashboard;