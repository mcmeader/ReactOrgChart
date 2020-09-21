import React from 'react'
import PropTypes from 'prop-types'

import styles from './FormField.module.css'

const InputField = (props) => {
    let testId = props.text.toLowerCase().replace(' ', '-')
    testId = (props.componentName === "department" || props.componentName === "job-title" || props.componentName === undefined) ? "name" : testId

    let inputField = props.text.replace(' ', '')
    inputField = inputField[0].toLowerCase() + inputField.slice(1)
    inputField = (inputField === 'departmentName' || inputField === 'jobTitle') ? 'name' : inputField

    let inputFieldValues = Object.entries(props.inputValue)
    let inputFieldIndex = inputFieldValues.findIndex(value => value[0] === inputField)
    let inputFieldValue = inputFieldValues[inputFieldIndex][1]

    return (
        <input
            data-testid={`create-${props.componentName}-${testId}`}
            className={styles.input}
            type={props.type}
            value={inputFieldValue != null ? inputFieldValue : "-"}
            maxLength={props.text === 'Middle Initial' ? 1 : null}
            onChange={event => {
                props.dispatch({ type: 'update', field: props.field, value: event.target.value })
            }
            }
        >
        </input>
    )

}

InputField.propTypes = {
    inputValue: PropTypes.object,
    componentName: PropTypes.string,
    dispatch: PropTypes.func,
    text: PropTypes.string,
    type: PropTypes.string,
    field: PropTypes.string
}

export default InputField;
