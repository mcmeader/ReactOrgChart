import React, { useState } from 'react';

import styles from './Layout.module.css';
import Center from './Center/Center'
import Sidebar from './Sidebar/Sidebar'
import Employees from '../Layout/CenterComponents/Employees/Employees'
import { sidebarValues } from '../../constants/SidebarValues'
import { getActiveDepartments, createDepartment } from '../../services/DepartmentService';
import Departments from './CenterComponents/Departments/Departments';
import JobTitles from './CenterComponents/JobTitles/JobTitles';
import { createJobTitle } from '../../services/JobTitleService';

const renderCenter = (component) => {
    switch (component) {
        case 'Org Chart':
            return <OrgChart />
        case 'Employees':
            return <Employees />
        case 'Create Employee':
            return <CreateEmployee />
        case 'Departments':
            return <Departments />
        case 'Create Department':
            return <CreateDepartment />
        case 'Job Titles':
            return <CreateJobTitles />
        case 'Create Job Title':
            return <CreateJobTitle />
    }
}

const Layout = () => {
    const [centerComponent, setCenterComponent] = useState(null)
    return (
        <div className={styles.container}>
            <div className={styles.header} />
            <div className={styles.sidebar}>
                <Sidebar tableContent={sidebarValues} />
            </div>
            <div className={styles.content} >
                {renderCenter(centerComponent)}
            </div>
        </div>
    );
};

export default Layout;