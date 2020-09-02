import React, { useState, useLayoutEffect } from 'react';

import styles from './JobTitles.module.css';
import Table from '../../../Tables/Table'
import { jobTitleTableHeaders } from '../../../../constants/JobTitleTableHeaders';
import { getJobTitles } from '../../../../services/JobTitleService';

const JobTitles = (props) => {
    useLayoutEffect(() => { fetchJobTitles() }, [])

    const [jobTitles, setJobTitles] = useState(null)

    const fetchJobTitles = async () => {
        setJobTitles(await getJobTitles())
    }
    return (
        <div className={styles.container}>
            <Table headers={jobTitleTableHeaders} data={jobTitles} />
        </div>
    );
};

export default JobTitles