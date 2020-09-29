import React from 'react'
import PropTypes from 'prop-types'

import styles from './FormField.module.css'

const SelectField = (props) => {
    let selectChoices = [...props.data.selectOptions]
    selectChoices.unshift({ name: "-", id: 0 })

    return (
        <select
            data-testid={`create-${props.generateTestId(props.data.text)}`}
            className={styles.input}
            value={props.selectedValue}
            onChange={event => {
                props.selectedValueFunction(event.target.value)
                props.inputFieldFunction({
                    type: 'update', field: props.data.field, value: selectChoices.filter(choice => choice.id != 0 ? choice.id == event.target.value : "")[0]
                })
            }} >
            {
                selectChoices.map((optionValue, key) => {
                    return (<option key={key} value={optionValue.id}> {props.data.selectValueDisplayed(optionValue)}</option>)
                })
            }
        </select>
    )
}

SelectField.propTypes = {
    data: PropTypes.object,
    selectValue: PropTypes.object,
    generateTestId: PropTypes.func,
    inputFieldValue: PropTypes.object,
    inputFieldFunction: PropTypes.func,
    selectedValue: PropTypes.string,
    selectedValueFunction: PropTypes.func,
    componentName: PropTypes.string
}

export default SelectField;
