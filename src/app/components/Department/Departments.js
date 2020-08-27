import React, {useEffect, useState} from 'react';

import styles from './Departments.module.css';
import Table from "../Table";
import {deleteDepartment, getActiveDepartments} from "../../services/DepartmentService";
import TableActions from "../TableActions/TableActions";
import {useToasts} from "react-toast-notifications";

const departmentsColumnConfig = [
    {
        title: "Department Name",
        displayValue: "name"
    },
    {
        title: "Manager",
        displayValue: "manager"
    },
    {
        title: "Actions",
        component: TableActions,
        editLink: "/departments/edit",
        handleDelete: deleteDepartment
    }
]

const Departments = () => {
    const [departments, setDepartments] = useState([]);

    const { addToast } = useToasts();

    const fetchDepartments = async () => {
        try {
            setDepartments(await getActiveDepartments())
        } catch (e) {
            addToast(
                "Failed to fetch departments",
                {
                    appearance: 'error'
                }
            )
        }
    }

    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <div className={styles.container}>

            <Table
                data={departments}
                columnConfig={departmentsColumnConfig}
            />
        </div>
    );
};

export default Departments;