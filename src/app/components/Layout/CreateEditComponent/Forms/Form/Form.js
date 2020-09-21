import React, { useReducer, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import PropTypes from 'prop-types'

import styles from './Form.module.css';
import FormField from '../FormField/FormField'

const Form = (props) => {
    const { addToast } = useToasts()
    const [inputField, updateInputField] = useReducer(props.reducer, props.initialReducerValue)

    const fetchData = async () => {
        let data = await props.getByIdService(props.action.id)
        updateInputField({ type: 'set', data: data })
    }

    const submitHandler = async () => {
        event.preventDefault()
        try {
            props.action.value === 'update' ? await props.updateService(inputField) : await props.createService(inputField)
            addToast("Data submitted successfully", {
                appearance: 'success',
                autoDismiss: true
            })
            updateInputField({ type: 'reset' })
        } catch (err) {
            addToast("There was an issue submitting the data", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    useEffect(() => {
        if (props.action.value === 'update') {
            fetchData()
        }
    }, [])

    return (
        <form onSubmit={submitHandler} className={styles.container}>
            {props.formData.map((data, key) => {
                return (
                    <FormField
                        key={key}
                        text={data.text}
                        type={data.type}
                        inputValue={inputField}
                        dispatch={updateInputField}
                        selectOptions={data.selectOptions}
                        componentName={props.componentName}
                    />
                )
            })}
            <input data-testid={`create-${props.componentName}-save-button`} type="submit" value="Save" />
        </form>
    );
};

Form.propTypes = {
    formData: PropTypes.arrayOf(Object),
    reducer: PropTypes.func,
    initialReducerValue: PropTypes.object,
    createService: PropTypes.func,
    updateService: PropTypes.func,
    getByIdService: PropTypes.func,
    componentName: PropTypes.string,
    action: PropTypes.object
}

export default Form