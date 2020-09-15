import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import styles from './CreateComponent.module.css';
import Form from '../../Forms/Form/Form';
import { getData } from '../ImportHandler';

const CreateComponent = (props) => {
    const [employees, setEmployees] = useState(["-"])
    const [departments, setDepartments] = useState(["-"])
    const [jobTitles, setJobTitles] = useState(["-"])

    let { headerValues, initialValue, reducer, getService, getDepartment, getJobTitle, getByIdService, createService, editService } =
        getData(props.componentType)

    let fields = [...headerValues]
    fields.pop()

    const fetchData = async () => {
        setEmployees(await getService())
        setDepartments(await getDepartment())
        setJobTitles(await getJobTitle())
    }

    useEffect(() => {
        if (props.componentType === 'employee')
            fetchData()
    }, [])

    let formFields = fields.map(value => ({ text: value, type: "text", selectOption: null }))

    if (props.componentType === 'employee') {
        formFields = [...formFields,
        { text: "Manager", type: "select", selectOptions: employees },
        { text: "Department", type: "select", selectOptions: departments },
        { text: "Job Title", type: "select", selectOptions: jobTitles }]
    }

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

CreateComponent.propTypes = {
    componentType: PropTypes.string
}

export default CreateComponent