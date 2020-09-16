import React from 'react'
import PropTypes from 'prop-types'

import styles from './FormField.module.css'

const SelectField = (props) => {
    let selectChoices = [...props.selectOptions]
    selectChoices.unshift({ name: "-" })

    let testId = props.text.toLowerCase().replace(' ', '-')
    testId = (props.componentName === "departments" || props.componentName === "job-titles") ? "name" : testId

    return (
        <select
            data-testid={`create-${props.componentName}-${testId}`}
            className={styles.input}
            onChange={event =>
                props.dispatch({
                    type: 'update', field: props.field, value: selectChoices.filter(choice => choice.id == event.target.value)[0]
                })} >
            {
                selectChoices.map((optionValue, key) => {
                    let selectText = Object.keys(optionValue).includes("firstName") ? optionValue.firstName + " " + optionValue.lastName : optionValue.name
                    return (<option key={key} value={optionValue.id}> {selectText}</option>)
                })
            }
        </select>
    )
}

SelectField.propTypes = {
    componentName: PropTypes.string,
    selectOptions: PropTypes.arrayOf(PropTypes.object),
    dispatch: PropTypes.func,
    text: PropTypes.string,
    field: PropTypes.string
}

export default SelectField;