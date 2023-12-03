import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { makeAppointment } from '../../../Api/userApi';


const PaymentSuccess = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    // Retrieve the query parameters
    const _id = queryParams.get('_id');
    const date = queryParams.get('date');
    const select = queryParams.get('select');
    const drId = queryParams.get('drId');
    const [render, setRender] = useState(false)

    const appointment = async () => {
        try {
            const response = await makeAppointment({ drId, select, date, _id })


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
    
         appointment()

    }, [])



    return (
        <div className="text-center bg-">
            <div className="text-green-500 text-7xl pt-60">PAYMENT SUCCESSFUL</div>
            <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                </path>
            </svg>
            <div className="py-10 text-center">


                <Link to={'/'} className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
