import React, {useReducer} from 'react';

import styles from './Departments.module.css';
import {createDepartment} from "../../services/DepartmentService";
import departmentReducer, { initialDepartment } from '../../reducers/DepartmentReducer';
import DepartmentForm from "./DepartmentForm";

const CreateDepartment = () => {

    return (
        <DepartmentForm
            initialDepartment={initialDepartment}
            action="create"
        />
    )
};

export default CreateDepartment;