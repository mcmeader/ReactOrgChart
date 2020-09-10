import React from 'react';
import PropTypes from 'prop-types'

import styles from './CreateComponent.module.css';
import Form from '../../../Forms/Form/Form';

const CreateComponent = (props) => {
    let fields = [...props.headerValues]
    fields.pop()
    let formFields = fields.map(value => ({ text: value, type: "text" }))
    return (
        <div className={styles.container}>
            <Form
                formData={formFields}
                reducer={props.reducer}
                initialValue={props.initialValue}
                createService={props.createService}
                componentName={props.componentName} />
        </div>
    );
};

CreateComponent.propTypes = {
    headerValues: PropTypes.arrayOf(String),
    reducer: PropTypes.func,
    initialValue: PropTypes.object,
    postCall: PropTypes.func,
    componentName: PropTypes.string,
}

export default CreateComponent