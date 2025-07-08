import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../components/Nav';

const Root = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            TODO FOOTER
        </div>
    );
};

export default Root;