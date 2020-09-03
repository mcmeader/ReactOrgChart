import React from 'react';
import PropTypes from 'prop-types'

import styles from './FormField.module.css'

const FormField = (props) => {
    console.log(props.inputValue.name)
    return (
        <label>
            {props.text}
            <input
                className={styles.input}
                type={props.type}
                onChange={event => props.dispatch({ type: 'update', field: 'name', value: event.target.value })}
            />
        </label>
    );
};

FormField.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    dispatch: PropTypes.func,
    inputValue: PropTypes.object
}

export default FormField;