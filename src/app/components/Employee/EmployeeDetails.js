import React, {useContext} from 'react';

import styles from './Employee.module.css';
import EmployeeContext from "./EmployeeContext";

const EmployeeDetails = ({ employee }) => {
    const employeeContext = useContext(EmployeeContext);

    return (
        <div className={styles.employeeDetails}>
            <p data-testid={`${employee.id}-display-name`}>{employee.firstName} {employee.lastName}</p>
            <p data-testid={`${employee.id}-job-title`}>{employee.jobTitle.name}</p>

            {employeeContext.managedEmployees.length > 0
                ? <div data-testid={`${employee.id}-hide-employees-button`} className={styles.showHideToggle} onClick={employeeContext.hideManagedEmployees}>Hide Employees</div>
                : <div data-testid={`${employee.id}-show-employees-button`} className={styles.showHideToggle}  onClick={employeeContext.setManagedEmployees}>Show Employees</div>
            }
        </div>
    );
};

export default EmployeeDetails;