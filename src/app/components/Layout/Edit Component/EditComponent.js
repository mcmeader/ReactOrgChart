import React from 'react';

import styles from './EditComponent.module.css';
import Form from '../../Forms/Form/Form';
import { getData } from '../ImportHandler';
import { useLocation } from 'react-router-dom';

const EditComponent = () => {
    let { formFieldData, componentType } = useLocation().state
    let { headerValues, createService, editService, reducer, getByIdService, initialValue } =
        getData(componentType)

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
                componentName={componentType}
                action={{ value: "update", id: formFieldData }}
            />
        </div>
    );
};

export default EditComponent