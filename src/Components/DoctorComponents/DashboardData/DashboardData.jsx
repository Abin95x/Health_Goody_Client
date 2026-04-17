import React from 'react';
import { Link } from 'react-router-dom';


const DashboardData = ({ data }) => {
    return (
        data && (
            <div className='py-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    <div className='rounded-3xl bg-white border border-gray-100 p-6 shadow-sm transition-all hover:shadow-md flex flex-col items-center justify-center text-center'>
                        <Link to={'/doctor/slots'} className="group">
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Slots Created</span>
                            <div className="text-4xl font-extrabold text-blue-600 mt-2 group-hover:scale-110 transition-transform">
                                {data.totalSlotCount}
                            </div>
                            <span className="text-xs text-gray-400 mt-1 block">Active Sessions</span>
                        </Link>
                    </div>

                    <div className='rounded-3xl bg-white border border-gray-100 p-6 shadow-sm transition-all hover:shadow-md flex flex-col items-center justify-center text-center'>
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Revenue</span>
                        <div className="text-4xl font-extrabold text-green-600 mt-2 hover:scale-110 transition-transform">
                            ₹{data.seventyPercent}
                        </div>
                        <span className="text-xs text-gray-400 mt-1 block">Net Earnings</span>
                    </div>

                    {/* Placeholder for other metrics to balance the grid */}
                    <div className='rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 shadow-lg flex flex-col items-center justify-center text-center text-white'>
                        <span className="text-sm font-semibold opacity-80 uppercase tracking-wider">Profile Status</span>
                        <div className="text-2xl font-bold mt-2">Verified</div>
                        <span className="text-xs opacity-60 mt-1 block">Certified Doctor</span>
                    </div>

                    <div className='rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 p-6 shadow-lg flex flex-col items-center justify-center text-center text-white'>
                        <span className="text-sm font-semibold opacity-80 uppercase tracking-wider">Patient Trust</span>
                        <div className="text-2xl font-bold mt-2">100%</div>
                        <span className="text-xs opacity-60 mt-1 block">Feedback Score</span>
                    </div>
                </div>
            </div>
        )
    );
};

export default DashboardData;
