import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './CreateEditComponent.module.css';
import Form from './Forms/Form/Form';
import { getData } from '../ImportHandler';

const CreateEditComponent = (props) => {
    let formFieldData = null, componentType = null
    let locationState = useLocation().state

    if (locationState != null) {
        formFieldData = locationState.formFieldData
        componentType = locationState.componentType
    }

    let component = componentType != null ? componentType : props.componentType
    let id = formFieldData != null ? formFieldData : null

    const [employees, setEmployees] = useState(["-"])
    const [departments, setDepartments] = useState(["-"])
    const [jobTitles, setJobTitles] = useState(["-"])

    let { headerValues, initialValue, reducer, getService, getDepartment, getJobTitle, getByIdService, createService, editService } =
        getData(component)

    let action = formFieldData != null ? 'update' : 'create'
    let fields = [...headerValues]
    fields.pop()

    const fetchData = async () => {
        setEmployees(await getService())
        setDepartments(await getDepartment())
        setJobTitles(await getJobTitle())
    }

    useEffect(() => {
        if (props.componentType === 'employee')
            fetchData(formFieldData)
    }, [])

    let formFields = fields.map(value => ({ text: value, type: "text", selectOption: null }))

    if (componentType === 'employee') {
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
                componentName={component}
                action={{ value: action, id: id }}
            />
        </div>
    );
};

CreateEditComponent.propTypes = {
    componentType: PropTypes.string
}

export default CreateEditComponent