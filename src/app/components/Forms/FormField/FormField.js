import React from 'react';
import PropTypes from 'prop-types'

import styles from './FormField.module.css'
import { selectField } from './SelectField';
import { inputField } from './InputField';

const FormField = (props) => {
    let field = props.text.replace(' ', '')
    field = field.charAt(0).toLowerCase() + field.slice(1);
    field = ((field === 'jobTitle' && props.componentName != "employee") || field === 'departmentName') ? 'name' : field;
    return (
        <div className={styles.container}>
            <label className={styles.text}>
                {props.text}
            </label>
            {props.type === "select" ? selectField(props, field) : inputField(props, field)}
        </div>
    );
};

FormField.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    inputValue: PropTypes.object,
    dispatch: PropTypes.func,
    componentName: PropTypes.string,
    selectOptions: PropTypes.arrayOf(PropTypes.object)
}

export default FormField;