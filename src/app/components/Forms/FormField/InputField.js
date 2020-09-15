import React from 'react'
import PropTypes from 'prop-types'

import styles from './FormField.module.css'

const InputField = (props) => {
    let testId = props.text.toLowerCase().replace(' ', '-')
    testId = (props.componentName === "department" || props.componentName === "job-title" || props.componentName === undefined) ? "name" : testId

    return (
        <input
            data-testid={`create-${props.componentName}-${testId}`}
            className={styles.input}
            type={props.type}
            value={props.inputValue.name}
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
    text: PropTypes.string,
    type: PropTypes.string,
    field: PropTypes.string
}

export default InputField;
