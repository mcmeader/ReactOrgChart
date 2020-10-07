import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import styles from './FormField.module.css'

const InputField = (props) => {
    let inputFieldValues = Object.entries(props.inputFieldValue)
    let inputFieldIndex = inputFieldValues.findIndex(value => value[0] === props.data.field)
    let inputFieldValue = inputFieldIndex != -1 ? inputFieldValues[inputFieldIndex][1] : null

    let [errorText, setErrorText] = useState("")

    let validateFormInput = (input) => {
        let invalidCharacters = new RegExp(/^[a-z .A-Z]+$/)
        let errorMessage = !invalidCharacters.test(input) && input != '' ? "field contains an invalid character" : ""
        setErrorText(errorMessage)
    }

    useEffect(() => {
        if (props.checkSubmit && inputFieldValue === '')
            setErrorText("field cannot be blank")
    }, [props.checkSubmit])

    return (
        <div className={styles.input}>
            <input
                data-testid={`create-${props.generateTestId(props.data.text)}`}
                type={props.data.type}
                value={inputFieldValue != null ? inputFieldValue : "-"}
                maxLength={props.data.maxLength}
                onChange={event => {
                    props.inputFieldFunction({ type: 'update', field: props.data.field, value: event.target.value })
                    validateFormInput(event.target.value)
                }
                }
            />
            <div className={styles.error}>
                {errorText}
            </div>
        </div>
    )

}

InputField.propTypes = {
    data: PropTypes.object,
    checkSubmit: PropTypes.bool,
    generateTestId: PropTypes.func,
    inputFieldValue: PropTypes.object,
    inputFieldFunction: PropTypes.func,
    componentName: PropTypes.string,
}

export default InputField;
