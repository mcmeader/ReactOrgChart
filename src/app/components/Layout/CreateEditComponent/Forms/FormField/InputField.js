import React from 'react'
import PropTypes from 'prop-types'

import styles from './FormField.module.css'

const InputField = (props) => {
    let inputFieldValues = Object.entries(props.inputFieldValue)
    let inputFieldIndex = inputFieldValues.findIndex(value => value[0] === props.data.field)
    let inputFieldValue = inputFieldValues[inputFieldIndex][1]

    return (
        <input
            data-testid={`create-${props.generateTestId(props.data.text)}`}
            className={styles.input}
            type={props.data.type}
            value={inputFieldValue != null ? inputFieldValue : "-"}
            maxLength={props.data.maxLength}
            onChange={event => {
                props.inputFieldFunction({ type: 'update', field: props.data.field, value: event.target.value })
            }
            }
        >
        </input>
    )

}

InputField.propTypes = {
    data: PropTypes.object,
    generateTestId: PropTypes.func,
    inputFieldValue: PropTypes.object,
    inputFieldFunction: PropTypes.func,
    componentName: PropTypes.string,
}

export default InputField;
