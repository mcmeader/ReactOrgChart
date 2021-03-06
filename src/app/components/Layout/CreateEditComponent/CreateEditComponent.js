import React, { useState, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './CreateEditComponent.module.css';
import Form from './Forms/Form/Form';
import { getData } from '../ImportHandler';

const CreateEditComponent = (props) => {
    let formFieldData = null, componentType = null, id = null, action = null
    let locationState = useLocation().state

    if (locationState != null) {
        formFieldData = locationState.formFieldData
        componentType = locationState.componentType
    }

    let component = componentType != null && componentType != undefined ? componentType : props.componentType
    action = formFieldData != null ? 'update' : 'create'
    id = formFieldData != null ? formFieldData : null

    let { headerValues, initialValue, reducer, getService, getDepartment, getJobTitle, getByIdService, createService, editService } =
        getData(component)

    const [formFields, setFormFields] = useState([{}])
    const [employees, setEmployees] = useState([{ name: "-" }])
    const [departments, setDepartments] = useState([{ name: "-" }])
    const [jobTitles, setJobTitles] = useState([{ name: "-" }])
    const [inputField, updateInputField] = useReducer(reducer, initialValue)

    const fetchData = async () => {
        setEmployees(await getService())
        setDepartments(await getDepartment())
        setJobTitles(await getJobTitle())
    }

    const fetchCurrentFieldData = async () => {
        let data = await getByIdService(id)
        updateInputField({ type: 'set', data: data })
    }

    const createFormFields = async () => {
        let fields = [...headerValues]
        fields.pop()

        let formFields = fields.map(value => {
            let field = value.replace(' ', '')
            field = field.charAt(0).toLowerCase() + field.slice(1);
            field = ((field === 'jobTitle' && component != "employee") || field === 'departmentName') ? 'name' : field;
            return (
                ({ text: value, type: "text", field: field, maxLength: value == 'Middle Initial' ? 1 : null, selectOption: null }))
        })
        if (component === 'employee') {
            let fieldValue = (action == 'update') ? await getByIdService(id) : null

            let filterEmployee = () => {
                if (fieldValue != null) {
                    return employees.filter(field => (field.isActive === true && field.id != fieldValue.id))
                } else {
                    return employees.filter(field => (field.isActive === true))
                }
            }

            formFields = [...formFields,
            {
                text: "Manager", type: "select", field: 'manager', maxLength: null, selectValueDisplayed: selectValueDisplayed,
                selectOptions: filterEmployee(),
                initialSelectOption: action === 'update' ? fieldValue.manager === null || fieldValue.manage === undefined
                    ? '0' : fieldValue.manager.id.toString() : '0'
            },
            {
                text: "Department", type: "select", field: 'department', maxLength: null, selectValueDisplayed: selectValueDisplayed,
                selectOptions: departments.filter(department => department.isActive === true),
                initialSelectOption: action === 'update' ? fieldValue.department === null || fieldValue.manage === undefined
                    ? '0' : fieldValue.department.id.toString() : '0'
            },
            {
                text: "Job Title", type: "select", field: 'jobTitle', maxLength: null, selectValueDisplayed: selectValueDisplayed,
                selectOptions: jobTitles.filter(jobTitle => jobTitle.isActive === true),
                initialSelectOption: action === 'update' ? fieldValue.jobTitle === null || fieldValue.manage === undefined
                    ? '0' : fieldValue.jobTitle.id.toString() : '0'
            }]
        }

        setFormFields(formFields)
    }

    const initializeFormFieldData = () => {
        if (component === 'employee') {
            fetchData()
        }
        if (action === 'update') {
            fetchCurrentFieldData()
        }
    }

    useEffect(() => {
        initializeFormFieldData()
    }, [])

    useEffect(() => {
        createFormFields()
    }, [employees, departments, jobTitles])

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
                setUp={initializeFormFieldData}
            />
        </div>
    );
};

CreateEditComponent.propTypes = {
    componentType: PropTypes.string
}

export default CreateEditComponent