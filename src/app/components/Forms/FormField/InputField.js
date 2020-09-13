import React from 'react'
import styles from './FormField.module.css'

export const inputField = (props, field) => {
    let testId = props.text.toLowerCase().replace(' ', '-')
    testId = (props.componentName === "department" || props.componentName === "job-title" || props.componentName === undefined) ? "name" : testId
    return (
        <input
            data-testid={`create-${props.componentName}-${testId}`}
            className={styles.input}
            type={props.type}
            value={props.inputValue.name}
            onChange={event => {
                props.dispatch({ type: 'update', field: field, value: event.target.value })
            }
            }
        >
        </input>
    )
}
