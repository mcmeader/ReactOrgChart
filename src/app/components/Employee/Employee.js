import React, {useEffect, useState} from 'react';
import {TreeNode} from "../Tree";
import {getEmployeesByManagerId} from "../../services/EmployeeService";
import EmployeeContext from "./EmployeeContext";

const Employee = ({ employee }) => {
    const [ managedEmployees, setManagedEmployees] = useState([]);

    const fetchManagedEmployees = async () => {
        try {
            setManagedEmployees(await getEmployeesByManagerId(employee.id))
        } catch (e) {

        }
    };

    const hideManagedEmployees = () => {
        setManagedEmployees([]);
    };

    return (
        <EmployeeContext.Provider
            value={{
                managedEmployees,
                setManagedEmployees: fetchManagedEmployees,
                hideManagedEmployees
            }}
        >
            <TreeNode employee={employee}>
                {managedEmployees.map(subordinate => <Employee key={subordinate.id} employee={subordinate} />)}
            </TreeNode>
        </EmployeeContext.Provider>
    );
};

export default Employee;