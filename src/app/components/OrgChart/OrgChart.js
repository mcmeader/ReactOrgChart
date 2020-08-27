import React, {useEffect, useState} from 'react';
import {getEmployeesByManagerId} from "../../services/EmployeeService";
import {Tree} from "../Tree";
import { Employee } from "../Employee";

import styles from './OrgChart.module.css';
import {useToasts} from "react-toast-notifications";

const OrgChart = () => {
    const [employees, setEmployees] = useState([])
    const { addToast } = useToasts();

    const fetchEmployees = async () => {
        try {
            setEmployees(await getEmployeesByManagerId(0));
        } catch (e) {
            addToast(
                "Failed to fetch employees",
                {
                    appearance: 'error'
                }
            )
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, []);

    return (
        <div className={styles.container}>
            <Tree label="Nexient Org Chart">
                {employees.map(employee => <Employee id={employee.id} employee={employee} /> )}
            </Tree>
        </div>
    );
};

export default OrgChart;