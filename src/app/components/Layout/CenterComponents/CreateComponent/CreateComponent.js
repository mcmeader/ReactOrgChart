import React from 'react';
import PropTypes from 'prop-types'

import styles from './CreateComponent.module.css';
import Form from '../../../Forms/Form/Form';
import { getData } from '../../ImportHandler';

const CreateComponent = (props) => {
    let { headerValues, createService, editService, getByIdService, reducer, initialValue } =
        getData(props.componentType)
    let fields = [...headerValues]
    fields.pop()
    let formFields = fields.map(value => ({ text: value, type: "text", selectOption: null }))

    return (
        <div className={styles.container}>
            <Form
                formData={formFields}
                reducer={reducer}
                initialReducerValue={initialValue}
                createService={createService}
                updateService={editService}
                getByIdService={getByIdService}
                componentName={props.componentType}
                action={{ value: "create", id: null }}
            />
        </div>
    );
};

CreateComponent.propTypes = {
    componentType: PropTypes.string
}

export default CreateComponent