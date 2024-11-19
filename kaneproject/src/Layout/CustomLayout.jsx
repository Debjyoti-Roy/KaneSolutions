import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomHeader from './Customheader';

const CustomLayout = () => {
    return (
        <>
            <CustomHeader />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default CustomLayout;
