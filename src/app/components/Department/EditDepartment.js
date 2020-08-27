import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import DepartmentForm from "./DepartmentForm";
import {getDepartmentById} from "../../services/DepartmentService";

const EditDepartment = () => {
    const [ department, setDepartment] = useState(null);
    const { id } = useParams()
    const fetchDepartment = async () => {
        try {
            setDepartment(await getDepartmentById(id))
        } catch (e) {

        }
    }

    useEffect(() => {
        fetchDepartment();
    }, [])

    if (!department) {
        return null;
    }

    return (
        <DepartmentForm
            initialDepartment={department}
            action="update"
        />
    );
};

export default EditDepartment;