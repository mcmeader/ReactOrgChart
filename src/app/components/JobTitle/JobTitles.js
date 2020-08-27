import React, {useEffect, useState} from 'react';
import Table from "../Table";

import styles from './JobTitles.module.css';
import {deleteJobTitle, getJobTitles} from "../../services/JobTitleService";
import TableActions from "../TableActions/TableActions";
import {useToasts} from "react-toast-notifications";

const jobTitleColumnConfig = [
    {
        title: "Job Title",
        displayValue: "name"
    },
    {
        title: "Actions",
        component: TableActions,
        editLink: "/job-titles/edit",
        handleDelete: deleteJobTitle
    }
]

const JobTitles = () => {
    const [jobTitles, setJobTitles] = useState([]);
    const { addToast } = useToasts();

    const fetchJobTitles = async () => {
        try {
            setJobTitles(await getJobTitles());
        } catch (e) {
            addToast(
                "Failed to fetch job titles",
                {
                    appearance: 'error'
                }
            )
        }
    }

    useEffect(() => {
        fetchJobTitles();
    }, [])

    return (
        <div className={styles.container}>

            <Table
                data={jobTitles}
                columnConfig={jobTitleColumnConfig}
            />
            
        </div>
    );
};

export default JobTitles;