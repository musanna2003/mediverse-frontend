import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
};

export default Root;