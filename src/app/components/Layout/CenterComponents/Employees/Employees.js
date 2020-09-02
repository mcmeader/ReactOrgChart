import React, { useState, useLayoutEffect } from 'react';

import styles from './Employees.module.css';
import Table from '../../../Tables/Table'
import { employeeTableHeaders } from '../../../../constants/EmployeeTableHeaders';
import { getEmployees } from '../../../../services/EmployeeService';

const Employees = () => {
    useLayoutEffect(() => {
        fetchEmployees()
    }, [])

    const [employees, setEmployees] = useState(null)

    const fetchEmployees = async () => {
        setEmployees(await getEmployees())
    }
    return (
        <div className={styles.container}>
            <Table headers={employeeTableHeaders} data={employees} />
        </div>
    );
};



export default Employees