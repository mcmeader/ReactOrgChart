import React, {useReducer} from 'react';
import departmentReducer from "../../reducers/DepartmentReducer";
import {createDepartment, updateDepartment} from "../../services/DepartmentService";
import styles from "./Departments.module.css";
import {useToasts} from "react-toast-notifications";

const DepartmentForm = ({ initialDepartment, action }) => {
    const [ department, dispatch ] = useReducer(departmentReducer, initialDepartment)
    const { addToast } = useToasts();

    const handleInputChange = (event) => {
        dispatch({
            type: "update",
            field: event.target.name,
            value: event.target.value
        })
    }

    const getSaveAction = () => {
        switch (action) {
            case "create":
                return createDepartment;
            case "update":
                return updateDepartment;
        }
    }

    const handleSave = async () => {
        try {
            await getSaveAction()(department);

            if (action === "create") {
                dispatch({
                    type: "reset",
                })
            }

            addToast(
                "Department Saved.",
                {
                    appearance: 'success'
                }
            )
        } catch (e) {
            addToast(
                "Failed to save the department.",
                {
                    appearance: 'error'
                }
            )
        }
    }

    return (
        <div className={styles.createForm}>

            <div className={styles.inputGroup}>
                <label>Department Name</label>
                <input data-testid="create-department-name" name="name" value={department.name} onChange={handleInputChange} />
            </div>
            <div className={styles.inputGroup}>
                <button data-testid="create-department-save-button" onClick={handleSave}>Save</button>
            </div>

        </div>
    );
};

export default DepartmentForm;