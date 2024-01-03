import React from 'react'

const DashboardData = () => {
    return (
        <div className=''>
            <div className='flex flex-col'>
                <div className='flex flex-row justify-center'>
                    <div className='w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl'>
                        Total Appointment :
                        <div>
                        </div>
                    </div>
                    <div className='w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl'>
                        No Of Slots:
                        <div>
                        </div>
                    </div>
                    <div className='w-64 h-20 m-10 rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-2xl'>
                        Total Revenue:
                        <div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DashboardData