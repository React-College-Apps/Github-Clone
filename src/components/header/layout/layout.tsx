import React from 'react';
import Header from '../header';

interface LayoutProps {
    children: React.ReactNode;
    noLayoutContent?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, noLayoutContent }) => {
    return (
        <>
            <Header />
            {noLayoutContent ? children : <div className='flex justify-center mt-24  mx-auto max-w-7xl  py-3'>
                {children}
            </div>}

        </>
    );
};

export default Layout;
