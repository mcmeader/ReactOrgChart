import React, { useEffect, useState } from 'react';

import styles from './OrgChart.module.css'
import { getData } from '../ImportHandler'
import OrgChartNode from './OrgChartNode/OrgChartNode';

const OrgChart = () => {
    let { getByManagerIdService } = getData("employee")

    let [orgChart, setOrgChart] = useState({})

    let getInitialManager = async () => setOrgChart(await getByManagerIdService(0))

    useEffect(() => {
        getInitialManager()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Nexient Org Chart
            </div>
            {/* <div className={styles.divider} /> */}
            <OrgChartNode
                employee={orgChart[0]}
                getManagedEmployees={getByManagerIdService}
            />
        </div>
    );
};

export default OrgChart