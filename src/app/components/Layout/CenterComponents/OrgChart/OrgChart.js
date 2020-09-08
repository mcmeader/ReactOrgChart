import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types'

import styles from './OrgChart.module.css';
import Table from '../../../Tables/Table'
import { getEmployees } from '../../../../services/EmployeeService';

const OrgChart = (props) => {
    useLayoutEffect(() => {
        fetchData()
    }, [])

    const [data, setData] = useState(null)

    const fetchData = async () => {
        setData(await getEmployees())
    }
    return (
        <div className={styles.container}>
            <Table headers={props.headerValues} data={data} />
        </div>
    );
};

OrgChart.propTypes = {
}

export default OrgChart