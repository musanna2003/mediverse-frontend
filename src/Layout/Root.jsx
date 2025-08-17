import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div className='min-h-screen flex flex-col justify-between'>
            <Nav></Nav>
            <div className="">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
};

export default Root;