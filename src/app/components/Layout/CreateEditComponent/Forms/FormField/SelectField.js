import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import styles from './FormField.module.css'

const SelectField = (props) => {

    let selectChoices = [...props.data.selectOptions]
    selectChoices.unshift({ name: "-", id: 0 })

    let [errorText, setErrorText] = useState("")

    let validateFormInput = (input) => {
        let errorMessage = input === '0' ? "chosen value cannot be selected" : ""
        setErrorText(errorMessage)
    }

    useEffect(() => {
        if (props.checkSubmit && props.selectedValue === '0') {
            setErrorText("chosen value cannot be selected")
        }
    }, [props.checkSubmit])

    return (
        <div className={styles.error}>
            <select
                data-testid={`create-${props.generateTestId(props.data.text)}`}
                className={styles.input}
                value={props.selectedValue}
                onChange={event => {
                    validateFormInput(event.target.value)
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
            {errorText}
        </div>
    )
}

SelectField.propTypes = {
    data: PropTypes.object,
    checkSubmit: PropTypes.bool,
    generateTestId: PropTypes.func,
    inputFieldFunction: PropTypes.func,
    selectedValue: PropTypes.string,
    selectedValueFunction: PropTypes.func,
    componentName: PropTypes.string
}

export default SelectField;
