import React from 'react';
import PropTypes from 'prop-types'

import styles from './FormField.module.css'
import SelectField from './SelectField';
import InputField from './InputField';

const FormField = (props) => {
    let field = props.text.replace(' ', '')
    field = field.charAt(0).toLowerCase() + field.slice(1);
    field = ((field === 'jobTitle' && props.componentName != "employee") || field === 'departmentName') ? 'name' : field;

    let currentField = Object.entries(props.inputValue).filter(value => value[0] === field)[0]
    let selectedValue = (props.type === "select" && currentField != undefined) ?
        (currentField[1] != null ? currentField[1].id : 0) : 0

    return (
        <div className={styles.container}>
            <label className={styles.text}>
                {props.text}
            </label>
            {props.type === "select" ?
                <SelectField
                    componentName={props.componentName}
                    selectOptions={props.selectOptions}
                    dispatch={props.dispatch}
                    text={props.text}
                    field={field}
                    selectedValue={selectedValue}
                />
                : <InputField
                    inputValue={props.inputValue}
                    componentName={props.componentName}
                    dispatch={props.dispatch}
                    text={props.text}
                    type={props.type}
                    field={field}
                />}
        </div>
    );
};

FormField.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    inputValue: PropTypes.object,
    dispatch: PropTypes.func,
    componentName: PropTypes.string,
    selectOptions: PropTypes.arrayOf(PropTypes.object),
}

export default FormField;