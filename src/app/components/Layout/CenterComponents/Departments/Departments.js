import React, { useEffect, useState, useLayoutEffect } from 'react';

import styles from './Departments.module.css';
import Table from '../../../Tables/Table'
import { departmentTableHeaders } from '../../../../constants/DepartmentTableHeaders';
import { getActiveDepartments } from '../../../../services/DepartmentService';

const Departments = () => {
    useLayoutEffect(() => { fetchDepartments() }, [])

    const [departments, setDepartments] = useState(null)

    const fetchDepartments = async () => {
        setDepartments(await getActiveDepartments())
    }

    console.log(departments)
    return (
        <div className={styles.container}>
            <Table headers={departmentTableHeaders} data={departments} />
        </div>
    );
};

export default Departments