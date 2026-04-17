import React from 'react';
import { Link } from 'react-router-dom';


const DashboardData = ({ data }) => {
    return (
        data && (
            <div className='p-4'>
                <div className='flex flex-col items-center'>
                    <div className='flex flex-col sm:flex-row justify-center gap-6'>

                        <div className='w-full sm:w-64 h-32 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105'>

                            <Link to={'/doctor/slots'} className="text-center">
                                <span className="text-lg font-medium">Slots Created</span>
                                <div className="text-3xl font-bold mt-2">
                                    {data.totalSlotCount}
                                </div>
                                <span className="text-sm opacity-80">times</span>
                            </Link>
                        </div>
                        <div className='w-full sm:w-64 h-32 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105'>
                            <span className="text-lg font-medium">Total Revenue</span>
                            <div className="text-3xl font-bold mt-2">
                                ₹{data.seventyPercent}
                            </div>
                            <span className="text-sm opacity-80">Earned</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default DashboardData;
