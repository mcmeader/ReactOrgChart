import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

import styles from './CreateEmployee.module.css';
import Form from '../../../Forms/Form/Form';
import { getEmployees } from '../../../../services/EmployeeService';
import { getActiveDepartments } from '../../../../services/DepartmentService';
import { getJobTitles } from '../../../../services/JobTitleService';
import { getData } from '../../ImportHandler';

const CreateEmployee = (props) => {
    let { createService, editService, getByIdService, headerValues, reducer, initialValue } =
        getData("employee")

    useEffect(() => {
        fetchData()
    }, [])

    const [employees, setEmployees] = useState(["-"])
    const [departments, setDepartments] = useState(["-"])
    const [jobTitles, setJobTitles] = useState(["-"])

    const fetchData = async () => {
        setEmployees(await getEmployees())
        setDepartments(await getActiveDepartments())
        setJobTitles(await getJobTitles())
    }

    let fields = [...headerValues]
    fields.pop()

    let formFields = fields.map(value => ({ text: value, type: "text", selectOption: null }))
    formFields = [...formFields,
    { text: "Manager", type: "select", selectOptions: employees },
    { text: "Department", type: "select", selectOptions: departments },
    { text: "Job Title", type: "select", selectOptions: jobTitles }]

    return (
        <div className={styles.container}>
            <Form
                formData={formFields}
                reducer={reducer}
                initialReducerValue={initialValue}
                createService={createService}
                updateService={editService}
                getByIdService={getByIdService}
                componentName={props.componentType}
                action={{ value: "create", id: null }}
            />
        </div>
    );
};

CreateEmployee.propTypes = {
    componentType: PropTypes.string,
}

export default CreateEmployee