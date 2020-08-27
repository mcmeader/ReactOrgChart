import React from 'react';

import styles from './Tree.module.css';
import { EmployeeDetails } from "../Employee";

const TreeNode = ({ children, employee, label, className}) => {
    return (
        <div className={styles.nodeContainer}>
            { label ? label : <EmployeeDetails employee={employee}  /> }
            {React.Children.count(children) > 0 && (
                <div className={styles.childContainer}>{children}</div>
            )}
        </div>
    );
};

export default TreeNode;