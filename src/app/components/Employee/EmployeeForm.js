import React, {useEffect, useReducer, useState} from 'react';
import employeeReducer from "../../reducers/EmployeeReducer";
import {getJobTitles} from "../../services/JobTitleService";
import {getActiveDepartments} from "../../services/DepartmentService";
import {createEmployee, getEmployees, updateEmployee} from "../../services/EmployeeService";
import styles from "./Employee.module.css";
import {useToasts} from "react-toast-notifications";

const EmployeeForm = ({ initialEmployee, action }) => {
    const [ employee, dispatch] = useReducer(employeeReducer, initialEmployee);
    const [ jobTitles, setJobTitles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);

    const { addToast } = useToasts();

    const fetchJobTitles = () => {
        getJobTitles().then(setJobTitles);
    }

    const fetchDepartments = () => {
        getActiveDepartments().then(setDepartments);
    }

    const fetchEmployees = () => {
        getEmployees().then(setEmployees);
    }

    const onFieldChange = (event) => {
        dispatch({
            type: "update",
            field: event.target.name,
            value: event.target.value,
        })
    }

    const onSelectChange = (event) => {
        let collection;
        switch (event.target.name) {
            case "department":
                collection = departments;
                break;
            case "jobTitle":
                collection = jobTitles;
                break;
            case "manager":
                collection = employees;
                break;
        }

        dispatch({
            type: "update",
            field: event.target.name,
            value: collection.find(item => item.id === parseInt(event.target.value))
        });
    }

    const getSaveAction = () => {
        switch (action) {
            case "create":
                return createEmployee;
            case "update":
                return updateEmployee;
        }
    }

    const saveEmployee = async () => {
        try {
            await getSaveAction()(employee);
            dispatch({
                type: "reset"
            })
            addToast(
                "Employee Saved.",
                {
                    appearance: 'success'
                }
            )
        } catch (e) {
            addToast(
                "Failed to save the employee.",
                {
                    appearance: 'error'
                }
            )
        }

    }

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
        fetchJobTitles();
    }, []);

    return (
        <div className={styles.createForm}>
            <div className={styles.inputGroup}>
                <label>First Name</label>
                <input data-testid="create-employee-first-name" name="firstName" value={employee.firstName} onChange={onFieldChange} />
            </div>
            <div className={styles.inputGroup}>
                <label>Last Name</label>
                <input data-testid="create-employee-last-name" name="lastName" value={employee.lastName} onChange={onFieldChange} />
            </div>
            <div className={styles.inputGroup}>
                <label>Middle Initial</label>
                <input data-testid="create-employee-middle-initial" name="middleInitial" maxLength="1" value={employee.middleInitial} onChange={onFieldChange} />
            </div>
            <div className={styles.inputGroup}>
                <label>Job Title</label>
                <select data-testid="create-employee-job-title" name="jobTitle" onChange={onSelectChange}>
                    <option selected={employee.jobTitle && !employee.jobTitle.id} data-testid="create-employee-job-title-option-0" value={0}>-</option>
                    {jobTitles.map(jobTitle => (
                        <option selected={employee.jobTitle && employee.jobTitle.id === jobTitle.id} data-testid={`create-employee-job-title-option-${jobTitle.id}`} key={jobTitle.id} value={jobTitle.id}>{jobTitle.name}</option>
                    ))}
                </select>
            </div>
            <div className={styles.inputGroup}>
                <label>Department</label>
                <select data-testid="create-employee-department" name="department" onChange={onSelectChange}>
                    <option selected={employee.department && !employee.department.id} data-testid="create-employee-department-option-0" value={0}>-</option>
                    {departments.map(department => (
                        <option selected={employee.department && employee.department.id === department.id} data-testid={`create-employee-department-option-${department.id}`} key={department.id} value={department.id}>{department.name}</option>
                    ))}
                </select>
            </div>
            <div className={styles.inputGroup}>
                <label>Manager</label>
                <select data-testid="create-employee-manager" name="manager" onChange={onSelectChange}>
                    <option selected={employee.manager && !employee.manager.id} data-testid="create-employee-manager-option-0" value={0}>-</option>
                    {employees.map(manager => (
                        <option selected={employee.manager && employee.manager.id === manager.id} data-testid={`create-employee-department-option-${manager.id}`} key={manager.id} value={manager.id}>{manager.firstName} {manager.lastName}</option>
                    ))}
                </select>
            </div>

            <div className={styles.inputGroup}>
                <button data-testid="create-employee-save-button" onClick={saveEmployee}>Save</button>
            </div>
        </div>
    );
};

export default EmployeeForm;