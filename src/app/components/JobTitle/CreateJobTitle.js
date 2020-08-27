import React from 'react';
import  { initialJobTitle } from "../../reducers/JobTitleReducer";
import JobTitleForm from "./JobTitleForm";


const CreateJobTitle = () => {
    return (
        <JobTitleForm
            initialJobTitle={initialJobTitle}
            action="create"
        />
    )
};

export default CreateJobTitle;