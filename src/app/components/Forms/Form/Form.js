import React, { useReducer } from 'react';
import PropTypes from 'prop-types'

import styles from './Form.module.css';
import FormField from '../FormField/FormField'

const Form = (props) => {
    const [formField, formFieldDispatch] = useReducer(props.reducer, props.initialValue)
    const submitHandler = async () => {
        event.preventDefault()
        await props.createService(formField)
        formFieldDispatch({ type: 'reset' })
        console.log(formField)
    }
    return (
        <form onSubmit={submitHandler}>
            <div className={styles.container}>
                {props.formData.map((data, key) => {
                    return (
                        <FormField
                            text={data.text}
                            type={data.type}
                            inputValue={formField}
                            dispatch={formFieldDispatch}
                            key={key}
                            selectOptions={data.selectOptions}
                            componentName={props.componentName}
                        />
                    )
                })}
                <input data-testid={`create-${props.componentName}-save-button`} type="submit" value="Save" />
            </div>
        </form>
    );
};

Form.propTypes = {
    formData: PropTypes.arrayOf(Object),
    reducer: PropTypes.func,
    initialValue: PropTypes.object,
    createService: PropTypes.func,
    componentName: PropTypes.string,
}

export default Form