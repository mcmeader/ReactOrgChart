import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getJobTitle} from "../../services/JobTitleService";
import JobTitleForm from "./JobTitleForm";

const EditJobTitle = () => {
    const [ jobTitle, setJobTitle] = useState(null);
    const { id } = useParams()
    const fetchJobTitle = async () => {
        try {
            setJobTitle(await getJobTitle(id))
        } catch (e) {

        }
    }

    useEffect(() => {
        fetchJobTitle();
    }, [])

    if (!jobTitle) {
        return null;
    }

    return (
        <JobTitleForm
            initialJobTitle={jobTitle}
            action="update"
        />
    );
};

export default EditJobTitle;