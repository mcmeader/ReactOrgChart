import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import styles from './FormField.module.css'
import SelectField from './SelectField';
import InputField from './InputField';

const FormField = (props) => {
    let [selectedValue, setSelectedValue] = useState('0')

    let field = props.text.replace(' ', '')
    field = field.charAt(0).toLowerCase() + field.slice(1);
    field = ((field === 'jobTitle' && props.componentName != "employee") || field === 'departmentName') ? 'name' : field;

    useEffect(() => {
        setSelectedValue('0')
    }, [props.selectOptions])

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
                    onSelectValue={setSelectedValue}
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