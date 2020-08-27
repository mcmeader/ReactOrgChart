import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getEmployeeById} from "../../services/EmployeeService";
import EmployeeForm from "./EmployeeForm";

const EditEmployee = () => {
    const [ employee, setEmployee] = useState(null);
    const { id } = useParams()
    const fetchEmployee = async () => {
        try {
            setEmployee(await getEmployeeById(id))
        } catch (e) {

        }
    }

    useEffect(() => {
        fetchEmployee();
    }, [])

    if (!employee) {
        return null;
    }

    return (
        <EmployeeForm
            initialEmployee={employee}
            action="update"
        />
    );
};

export default EditEmployee;