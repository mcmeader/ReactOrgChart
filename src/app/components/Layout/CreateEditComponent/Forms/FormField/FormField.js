import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import styles from './FormField.module.css'
import SelectField from './SelectField';
import InputField from './InputField';

const FormField = (props) => {
    let [selectedValue, setSelectedValue] = useState('0')

    useEffect(() => {
        (props.action == 'update' && props.data.type == 'select') ?
            setSelectedValue(props.data.initialSelectOption) : setSelectedValue('0')
    }, [props.data.selectOptions])

    return (
        <div className={styles.container}>
            <label className={styles.text}>
                {props.data.text}
            </label>
            {props.data.type === "select" ?
                <SelectField
                    data={props.data}
                    checkSubmit={props.checkSubmit}
                    setCheckSubmit={props.setCheckSubmit}
                    generateTestId={props.generateTestId}
                    submitted={props.submitted}
                    inputFieldFunction={props.inputFieldFunction}
                    componentName={props.componentName}
                    selectedValue={selectedValue}
                    selectedValueFunction={setSelectedValue}
                />
                : <InputField
                    data={props.data}
                    checkSubmit={props.checkSubmit}
                    submitted={props.submitted}
                    setCheckSubmit={props.setCheckSubmit}
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
    checkSubmit: PropTypes.bool,
    setCheckSubmit: PropTypes.func,
    generateTestId: PropTypes.func,
    inputFieldValue: PropTypes.object,
    inputFieldFunction: PropTypes.func,
    componentName: PropTypes.string,
    action: PropTypes.string,
}

export default FormField;