import React, { useState } from 'react';

import styles from './Layout.module.css';
import Sidebar from './Sidebar/Sidebar'
import Employees from '../Layout/CenterComponents/Employees/Employees'
import { sidebarValues } from '../../constants/SidebarValues'
import Departments from './CenterComponents/Departments/Departments';

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header} />
            <div className={styles.sidebar}>
                <Sidebar tableContent={sidebarValues} />
            </div>
            <div className={styles.content} >
                {children}
            </div>
        </div>
    );
};

export default Layout;