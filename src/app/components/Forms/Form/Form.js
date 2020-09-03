import React, { useReducer } from 'react';
import PropTypes from 'prop-types'

import styles from './Form.module.css';
import FormField from '../FormField/FormField'
import { createJobTitle } from '../../../services/JobTitleService';

const Form = (props) => {
    const [formField, formFieldDispatch] = useReducer(props.reducer, props.initialValue)
    const submitHandler = () => createJobTitle(formField)

    return (
        <form className={styles.container} onSubmit={submitHandler}>
            {props.formData.map((data, key) => {
                return (
                    <FormField text={data.text} type={data.type} inputValue={formField} dispatch={formFieldDispatch} key={key} />
                )
            })}
            <input type="submit" value="Submit" />
        </form>
    );
};

Form.propTypes = {
    data: PropTypes.arrayOf(Object),
    reducer: PropTypes.func,
    initialValue: PropTypes.object
}

export default Form