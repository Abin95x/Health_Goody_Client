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
                        <div>
                            <div className=' bg-blue-50 text-3xl p-6 underline text-black text-center '>
                                <h1>Dashboard</h1>
                            </div>
                                    <div className='flex justify-center'>
                                        <div className='max-w-screen-lg w-full'>
                                            <DashboardData data={data} />
                                        </div>
                                    </div>

                                    <div className='flex flex-col lg:flex-row items-center justify-center gap-10 mt-10 px-4'>
                                        <div className='w-full lg:w-2/3 bg-white p-6 rounded-2xl shadow-xl border border-gray-100'>
                                            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Appointment Trends</h2>
                                            <LineChart appointmentsByYear={reportData} />
                                        </div>
                                        <div className='w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-xl border border-gray-100'>
                                            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2 text-center">Status Overview</h2>
                                            <div className="max-w-[250px] mx-auto">
                                                <PieChart count={pieData} />
                                            </div>
                                            <h1 className='text-center text-lg font-bold text-sky-600 mt-8 uppercase tracking-wide'>
                                                Appointment Statistics
                                            </h1>
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