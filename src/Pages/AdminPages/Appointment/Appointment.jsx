import React from 'react'
import Header from '../../../Components/AdminComponents/Header/Header'
import SideNav from '../../../Components/AdminComponents/SideNav/SideNav'
import Footer from '../../../Components/AdminComponents/Footer/Footer'




const Appointment = () => {



    return (
        <>
            <Header />
            <div className='flex'>
                <SideNav />
                <div className='flex-grow ' >
                   
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Appointment