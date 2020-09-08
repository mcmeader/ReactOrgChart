import React from 'react';
import PropTypes from 'prop-types'

import styles from './FormField.module.css'

const selectField = (props, field) => {
    props.selectOptions.unshift("-")
    return (
        <select
            className={styles.input}
            onChange={event =>
                props.dispatch({ type: 'update', field: field, value: event.target.value })} >
            {
                props.selectOptions.map((optionValue, key) => {
                    return (<option key={key} value={optionValue}> {optionValue}</option>)
                })
            }
        </select>
    )
}

const inputField = (props, field) => {
    let testId = props.text.toLowerCase().replace(' ', '-')
    testId = (props.componentName === "department" || props.componentName === "job-title") ? "name" : testId

    return (
        <input
            data-testid={`create-${props.componentName}-${testId}`}
            className={styles.input}
            type={props.type}
            onChange={event =>
                props.dispatch({ type: 'update', field: field, value: event.target.value })
            }
        >
        </input>
    )
}

const FormField = (props) => {
    let field = props.text.replace(' ', '')
    field = field.charAt(0).toLowerCase() + field.slice(1);
    field = (field === 'jobTitle' && !props.componentName === "employee" || field === 'departmentName') ? 'name' : field;

    return (
        <div className={styles.container}>
            <label>
                {props.text}
                {props.type === "select" ? selectField(props, field) : inputField(props, field)}
            </label>
        </div>
    );
};

FormField.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    dispatch: PropTypes.func,
    componentName: PropTypes.string,
    selectOptions: PropTypes.arrayOf(PropTypes.string)
}

export default FormField;