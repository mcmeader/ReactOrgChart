import React from 'react';
import { initialEmployee } from "../../reducers/EmployeeReducer";
import EmployeeForm from "./EmployeeForm";

const CreateEmployee = () => {

    return (
        <EmployeeForm
            initialEmployee={initialEmployee}
            action="create"
        />
    )
};

export default CreateEmployee;