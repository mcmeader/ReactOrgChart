import React from 'react';
import { useToasts } from 'react-toast-notifications';
import PropTypes from 'prop-types'

import styles from './Form.module.css';
import FormField from '../FormField/FormField'

const Form = (props) => {
    const { addToast } = useToasts()

    const submitHandler = async () => {
        event.preventDefault()
        try {
            props.action === 'update' ? await props.updateService(props.inputFieldValue) : await props.createService(props.inputFieldValue)
            addToast("Data submitted successfully", {
                appearance: 'success',
                autoDismiss: true
            })
            props.inputFieldFunction({ type: 'reset' })
            props.setUp()
        } catch (err) {
            console.log(err)
            addToast("There was an issue submitting the data", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    }

    return (
        <form onSubmit={submitHandler} className={styles.container}>
            {props.data.map((data, key) => {
                return (
                    <FormField
                        key={key}
                        data={data}
                        generateTestId={props.generateTestId}
                        inputFieldValue={props.inputFieldValue}
                        inputFieldFunction={props.inputFieldFunction}
                        componentName={props.componentName}
                    />
                )
            })}
            <input data-testid={`create-${props.componentName}-save-button`} type="submit" value="Save" />
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