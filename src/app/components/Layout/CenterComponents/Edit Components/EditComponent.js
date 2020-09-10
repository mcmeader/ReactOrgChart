import React from 'react';

import styles from './EditComponent.module.css';


const EditComponent = () => {
    // let fields = [...props.headerValues]
    // fields.pop()
    // let formFields = fields.map(value => ({ text: value, inputText: , type: "text" }))
    // let { data, componentName, editService } = useLocation().state

    return (
        <div className={styles.container}>
            {/* <Form
                formData={formFields}
                reducer={props.reducer}
                initialValue={props.initialValue}
                createService={props.createService}
                editService={props.editService}
                componentName={props.componentName}
                action="edit" /> */}
        </div>
    );
};

export default EditComponent