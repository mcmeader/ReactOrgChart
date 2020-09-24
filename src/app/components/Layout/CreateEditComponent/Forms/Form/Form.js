import React, { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import PropTypes from 'prop-types'

import styles from './Form.module.css';
import FormField from '../FormField/FormField'

const Form = (props) => {
    const { addToast } = useToasts()

    const fetchData = async () => {
        let data = await props.getByIdService(props.action.id)
        props.reducer({ type: 'set', data: data })
    }

    const submitHandler = async () => {
        event.preventDefault()
        try {
            props.action.value === 'update' ? await props.updateService(props.reducerValue) : await props.createService(props.reducerValue)
            addToast("Data submitted successfully", {
                appearance: 'success',
                autoDismiss: true
            })
            props.reducer({ type: 'reset' })
            props.fetchData()
        } catch (err) {
            console.log(err)
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
                        inputValue={props.reducerValue}
                        dispatch={props.reducer}
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
    reducerValue: PropTypes.object,
    reducer: PropTypes.func,
    createService: PropTypes.func,
    updateService: PropTypes.func,
    getByIdService: PropTypes.func,
    componentName: PropTypes.string,
    action: PropTypes.object,
    fetchData: PropTypes.func,
}

export default Form