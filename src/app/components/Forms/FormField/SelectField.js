import React from 'react'
import styles from './FormField.module.css'

export const selectField = (props, field) => {
    let selectChoices = [...props.selectOptions]
    selectChoices.unshift({ name: "-" })

    let testId = props.text.toLowerCase().replace(' ', '-')
    testId = (props.componentName === "department" || props.componentName === "job-title") ? "name" : testId

    return (
        <select
            data-testid={`create-${props.componentName}-${testId}`}
            className={styles.input}
            onChange={event =>
                props.dispatch({ type: 'update', field: field, value: event.target.value })} >
            {
                selectChoices.map((optionValue, key) => {
                    let selectText = Object.keys(optionValue).includes("firstName") ? optionValue.firstName + " " + optionValue.lastName : optionValue.name
                    return (<option key={key} value={optionValue}> {selectText}</option>)
                })
            }
        </select>
    )
}