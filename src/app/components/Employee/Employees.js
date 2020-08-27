import React, {useEffect, useState} from 'react';

import styles from './Employee.module.css';
import Table from "../Table";
import {deleteEmployee, getEmployees} from "../../services/EmployeeService";
import TableActions from "../TableActions/TableActions";
import {useToasts} from "react-toast-notifications";

const employeeTableColumnConfig = [
    {
        title: "First Name",
        displayValue: "firstName"
    },
    {
        title: "Last Name",
        displayValue: "lastName"
    },
    {
        title: "Middle Initial",
        displayValue: "middleInitial"
    },
    {
        title: "Actions",
        component: TableActions,
        editLink: "/employees/edit",
        handleDelete: deleteEmployee
    }
];

const Employees = () => {
    const [ employees, setEmployees ] = useState([]);
    const { addToast } = useToasts();

    const fetchEmployees = async () => {
        try {
            setEmployees(await getEmployees());
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
        fetchEmployees();
    }, []);

    return (
        <div className={styles.container}>

            <Table
                columnConfig={employeeTableColumnConfig}
                data={employees}
            />
        </div>
    );
};

export default Employees;