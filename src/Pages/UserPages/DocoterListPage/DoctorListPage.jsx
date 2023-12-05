import React from 'react';
import DocotrList from '../../../Components/UserComponents/DoctorList/DocotrList';
import Header  from '../../../Components/UserComponents/Header/Header';
import Footer from '../../../Components/UserComponents/Footer/Footer';
const DoctorListPage = () => {
  return (
    <div>
        <Header/>
        <DocotrList/>
        <Footer/>
    </div>
  );
};
export default DoctorListPage;