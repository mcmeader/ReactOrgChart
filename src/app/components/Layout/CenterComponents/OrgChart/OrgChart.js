import React, { useEffect, useState } from 'react';

import styles from './OrgChart.module.css'
import OrgChartLayer from '../../../OrgChart/OrgChartLayer/OrgChartLayer'
import { getData } from '../../ImportHandler';

const OrgChart = () => {
    let { getByManagerIdService } = getData("employee")

    const [orgChartLayers, setOrgChartLayers] = useState([[{ firstName: 'Nexient', lastName: 'Org Chart', middleInitial: null, jobTitle: { name: null } }]])

    const getInitialManager = async (id) => {
        setOrgChartLayers([...orgChartLayers, await getByManagerIdService(id)])
    }

    const getManagedEmployees = async (id) => {
        setOrgChartLayers([...orgChartLayers, await getByManagerIdService(id)])
    }

    const getEmployees = async (id) => await getByManagerIdService(id)

    const removeLayer = async (id) => {
        let employees = await getByManagerIdService(id)

        let managedEmployees = employees.map(employee => {
            console.log(employee.isManager)
            return employee.employees ? getEmployees(employee.id) : null
        })

        console.log(managedEmployees)
    }

    useEffect(() => {
        getInitialManager(0)
    }, [])

    return (
        <div className={styles.container}>
            {orgChartLayers.map((layer, key) =>
                <OrgChartLayer
                    key={key}
                    layerData={layer}
                    branchLevel={key}
                    growTreeService={getManagedEmployees}
                    pruneTreeService={removeLayer}
                />)}
        </div>
    );
};

export default OrgChart