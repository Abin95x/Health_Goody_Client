import React from 'react';
import Header from '../../../Components/AdminComponents/Header/Header';
import Footer from '../../../Components/AdminComponents/Footer/Footer';
import SideNav from '../../../Components/AdminComponents/SideNav/SideNav';
import UserDetails from '../../../Components/AdminComponents/UserDetails/UserDetails';

const UserDetailsPage = () => {

    return (
        <>
            <Header />
            <div className='flex'>
                <SideNav />
                <div className='flex-grow ' >
                    <UserDetails />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserDetailsPage;
