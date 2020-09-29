import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import styles from './FormField.module.css'
import SelectField from './SelectField';
import InputField from './InputField';

const FormField = (props) => {
    let [selectedValue, setSelectedValue] = useState('0')
    useEffect(() => {
        setSelectedValue('0')
    }, [props.data.selectOptions])

    return (
        <div className={styles.container}>
            <label className={styles.text}>
                {props.data.text}
            </label>
            {props.data.type === "select" ?
                <SelectField
                    data={props.data}
                    generateTestId={props.generateTestId}
                    inputFieldValue={props.inputFieldValue}
                    inputFieldFunction={props.inputFieldFunction}
                    componentName={props.componentName}
                    selectedValue={selectedValue}
                    selectedValueFunction={setSelectedValue}
                />
                : <InputField
                    data={props.data}
                    generateTestId={props.generateTestId}
                    inputFieldValue={props.inputFieldValue}
                    inputFieldFunction={props.inputFieldFunction}
                    componentName={props.componentName}
                />}
        </div>
    );
};

FormField.propTypes = {
    data: PropTypes.object,
    generateTestId: PropTypes.func,
    inputFieldValue: PropTypes.object,
    inputFieldFunction: PropTypes.func,
    componentName: PropTypes.string,
}

export default FormField;