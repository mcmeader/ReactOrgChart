import React from 'react';

import styles from './Layout.module.css';
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            <Sidebar />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Layout;