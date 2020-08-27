import React, {useReducer} from 'react';
import jobTitleReducer from "../../reducers/JobTitleReducer";
import {createJobTitle, updateJobTitle} from "../../services/JobTitleService";
import styles from "./JobTitles.module.css";
import {useToasts} from "react-toast-notifications";

const JobTitleForm = ({ initialJobTitle, action }) => {
    const [jobTitle, dispatch] = useReducer(jobTitleReducer, initialJobTitle);
    const { addToast } = useToasts();

    const onFieldChange = (event) => {
        dispatch({
            type: "update",
            field: event.target.name,
            value: event.target.value,
        })
    }

    const getSaveAction= () => {
        switch (action) {
            case "create":
                return createJobTitle;
            case "update":
                return updateJobTitle;
        }
    }

    const handleSave = async () => {
        try {
            await getSaveAction()(jobTitle);
            dispatch({
                type: "reset"
            })
            addToast(
                "Job Title Saved.",
                {
                    appearance: 'success'
                }
            )
        } catch (e) {
            addToast(
                "Failed to save the job title.",
                {
                    appearance: 'error'
                }
            )
        }
    }
    return (
        <div className={styles.createForm}>
            <div className={styles.inputGroup}>
                <label>Job Title</label>
                <input data-testid="create-job-title-name" name="name" value={jobTitle.name} onChange={onFieldChange} />
            </div>
            <div className={styles.inputGroup}>
                <button data-testid="create-job-title-save-button" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default JobTitleForm;