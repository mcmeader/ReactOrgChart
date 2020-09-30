import React, { useState, useEffect, useReducer } from 'react';
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

    let { headerValues, initialValue, reducer, getService, getDepartment, getJobTitle, getByIdService, createService, editService } =
        getData(component)

    const [employees, setEmployees] = useState([{ name: "-" }])
    const [departments, setDepartments] = useState([{ name: "-" }])
    const [jobTitles, setJobTitles] = useState([{ name: "-" }])
    const [inputField, updateInputField] = useReducer(reducer, initialValue)

    let action = formFieldData != null ? 'update' : 'create'
    let fields = [...headerValues]
    fields.pop()

    const fetchData = async () => {
        setEmployees(await getService())
        setDepartments(await getDepartment())
        setJobTitles(await getJobTitle())
    }

    const fetchCurrentFieldData = async () => {
        let data = await getByIdService(id)
        updateInputField({ type: 'set', data: data })
    }

    useEffect(() => {
        if (component === 'employee')
            fetchData()
    }, [])

    useEffect(() => {
        if (action === 'update') {
            fetchCurrentFieldData()
        }
    }, [reducer])


    let formFields = fields.map(value => {
        let field = value.replace(' ', '')
        field = field.charAt(0).toLowerCase() + field.slice(1);
        field = ((field === 'jobTitle' && component != "employee") || field === 'departmentName') ? 'name' : field;
        return (
            ({ text: value, type: "text", field: field, maxLength: value == 'Middle Initial' ? 1 : null, selectOption: null }))
    })

    let selectValueDisplayed = (value) => {
        if (Object.keys(value).includes('firstName')) {
            return `${value.firstName} ${value.lastName}`
        } else {
            return value.name
        }
    }

    let generateTestId = (text) => {
        let filterData = (value) => (value != undefined && value != null) ? value.toLowerCase().trim().replaceAll(' ', '-') : ""
        return (component != 'employee') ? `${filterData(component)}-name` : `employee-${filterData(text)}`
    }

    if (component === 'employee') {
        formFields = [...formFields,
        { text: "Manager", type: "select", field: 'manager', maxLength: null, selectOptions: employees, selectValueDisplayed: selectValueDisplayed },
        { text: "Department", type: "select", field: 'department', maxLength: null, selectOptions: departments, selectValueDisplayed: selectValueDisplayed },
        { text: "Job Title", type: "select", field: 'jobTitle', maxLength: null, selectOptions: jobTitles, selectValueDisplayed: selectValueDisplayed }]
    }

    return (
        <div className={styles.container}>
            <Form
                data={formFields}
                inputFieldValue={inputField}
                generateTestId={generateTestId}
                inputFieldFunction={updateInputField}
                componentName={component}
                createService={createService}
                updateService={editService}
                action={action}
            />
        </div>
    );
};

CreateEditComponent.propTypes = {
    componentType: PropTypes.string
}

export default CreateEditComponent