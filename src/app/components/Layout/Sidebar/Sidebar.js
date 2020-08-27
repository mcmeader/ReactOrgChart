import React from 'react';

import styles from './Sidebar.module.css'
import {NavLink as Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link exact activeClassName={styles.active} data-testid="org-chart-link" to="/">Org Chart</Link>
                </li>
                <li className={styles.navItem}>
                    <Link activeClassName={styles.active} data-testid="employees-link" to="/employees">Employees</Link>
                    <ul className={styles.subList}>
                        <li className={styles.navItem}>
                            <Link activeClassName={styles.active} data-testid="create-employee-link" to="/employees/create">Create Employee</Link>
                        </li>
                    </ul>
                </li>
                <li className={styles.navItem}>
                    <Link activeClassName={styles.active} data-testid="departments-link" to="/departments">Departments</Link>
                    <ul className={styles.subList}>
                        <li className={styles.navItem}>
                            <Link activeClassName={styles.active} data-testid="create-department-link" to="/departments/create">Create Department</Link>
                        </li>
                    </ul>
                </li>
                <li className={styles.navItem}>
                    <Link activeClassName={styles.active} data-testid="job-titles-link" to="/job-titles">Job Titles</Link>
                    <ul className={styles.subList}>
                        <li className={styles.navItem}>
                            <Link activeClassName={styles.active} data-testid="create-job-title-link" to="/job-titles/create">Create Job Title</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;