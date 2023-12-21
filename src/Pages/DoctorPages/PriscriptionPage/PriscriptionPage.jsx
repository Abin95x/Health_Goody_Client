import React, { useState } from 'react';
import Priscription from '../../../Components/DoctorComponents/Priscription/Priscription';
import Header from '../../../Components/DoctorComponents/Header/Header'
import Footer from '../../../Components/DoctorComponents/Footer/Footer'



const PrescriptionPage = () => {


    return (
        <div>
            <Header />
            <Priscription />
            <Footer />
        </div>
    );
};

export default PrescriptionPage;
