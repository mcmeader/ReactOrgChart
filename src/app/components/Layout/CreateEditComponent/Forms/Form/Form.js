import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import PropTypes from 'prop-types'

import styles from './Form.module.css';
import FormField from '../FormField/FormField'
import { validateFormFields } from './FormValidation';

const Form = (props) => {
    let { addToast } = useToasts()

    let [checkSubmit, setCheckSubmit] = useState(false)

    let submitHandler = async (event) => {
        event.preventDefault()
        try {
            if (validateFormFields(props.data, props.inputFieldValue)) {
                setCheckSubmit(true)
                addToast("Data not saved, some fields are invalid", {
                    appearance: 'warning',
                    autoDismiss: true
                })
            } else {
                props.action === 'update' ? await props.updateService(props.inputFieldValue) : await props.createService(props.inputFieldValue)
                addToast("Data submitted successfully", {
                    appearance: 'success',
                    autoDismiss: true
                })
                props.inputFieldFunction({ type: 'reset' })
                props.setUp()
                setCheckSubmit(false)
            }
        } catch (err) {
            console.log(err)
            addToast("There was an issue submitting the data", {
                appearance: 'error',
                autoDismiss: true,
            })
            setCheckSubmit(false)
        }
    }

    return (
        <form onSubmit={submitHandler} className={styles.container}>
            {props.data.map((data, key) => {
                return (
                    <FormField
                        key={key}
                        data={data}
                        checkSubmit={checkSubmit}
                        generateTestId={props.generateTestId}
                        inputFieldValue={props.inputFieldValue}
                        inputFieldFunction={props.inputFieldFunction}
                        componentName={props.componentName}
                        action={props.action}
                    />
                )
            })}
            <input className={styles.submit} data-testid={`create-${props.componentName}-save-button`} type="submit" value="Save" />
        </form>
    );
};

Form.propTypes = {
    data: PropTypes.arrayOf(Object),
    inputFieldValue: PropTypes.object,
    generateTestId: PropTypes.func,
    inputFieldFunction: PropTypes.func,
    componentName: PropTypes.string,
    createService: PropTypes.func,
    updateService: PropTypes.func,
    action: PropTypes.string,
    setUp: PropTypes.func,
}

export default Form