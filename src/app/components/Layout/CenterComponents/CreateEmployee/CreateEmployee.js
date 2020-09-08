import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

import styles from './CreateEmployee.module.css';
import Form from '../../../Forms/Form/Form';
import { getEmployees } from '../../../../services/EmployeeService';
import { getActiveDepartments } from '../../../../services/DepartmentService';
import { getJobTitles } from '../../../../services/JobTitleService';

const CreateEmployee = (props) => {
    useEffect(() => {
        fetchData()
    }, [employees, departments, jobTitles])

    const [employees, setEmployees] = useState(["-"])
    const [departments, setDepartments] = useState(["-"])
    const [jobTitles, setJobTitles] = useState(["-"])

    const fetchData = async () => {
        setEmployees(await getEmployees())
        setDepartments(await getActiveDepartments())
        setJobTitles(await getJobTitles())
    }

    let fields = [...props.headerValues]
    fields.pop()

    let formFields = fields.map(value => ({ text: value, type: "text", selectOption: null }))
    formFields = [...formFields,
    { text: "Manager", type: "select", selectOption: employees.map(employee => employee.firstName + (employee.middleInitial === null ? "" : " " + employee.middleInitial) + " " + employee.lastName) },
    { text: "Department", type: "select", selectOption: departments.map(department => department.name) },
    { text: "Job Title", type: "select", selectOption: jobTitles.map(jobTitle => jobTitle.name) }]

    return (
        <div className={styles.container}>
            <Form
                formData={formFields}
                reducer={props.reducer}
                initialValue={props.initialValue}
                createService={props.createService}
                isEmployee={true}
                componentName="employee" />
        </div>
    );
};

CreateEmployee.propTypes = {
    headerValues: PropTypes.arrayOf(String),
    reducer: PropTypes.func,
    initialValue: PropTypes.object,
    postCall: PropTypes.func
}

export default CreateEmployee