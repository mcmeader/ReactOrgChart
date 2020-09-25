import React, { useEffect, useState } from 'react';

import styles from './OrgChart.module.css'
import OrgChartLayer from './OrgChartLayer/OrgChartLayer'
import { getLayerOfEmployee, getInitialManager, getManagedEmployees, removeAllUnusedEmployees } from './OrgChartFunctions'
import { getData } from '../ImportHandler'

const OrgChart = () => {
    let { getByManagerIdService } = getData("employee")

    const [orgChart, setOrgChart] = useState([[[{ firstName: 'Nexient', lastName: 'Org Chart', middleInitial: null, jobTitle: { name: null } }]]])

    const growTreeService = async (employeeId) => {
        let newOrgChart = [...orgChart]
        let layerIndex = getLayerOfEmployee(orgChart, employeeId)
        let newEmployees = await getByManagerIdService(employeeId)
        newEmployees = [].concat(...newEmployees)
        if (newEmployees.length > 0) {
            if ((layerIndex == orgChart.length - 1)) {
                newOrgChart = [...newOrgChart, [newEmployees]]
            } else {
                newOrgChart[layerIndex + 1] = [...newOrgChart[layerIndex + 1], newEmployees]
            }
        }
        setOrgChart(newOrgChart)
    }

    const pruneTreeService = async (employeeId) => {
        let managedEmployees = await getManagedEmployees(employeeId)
        managedEmployees = [].concat(...managedEmployees)
        let newOrgChart = orgChart.map(layer =>
            layer.map(array => array.filter(data =>
                !managedEmployees.some(employee =>
                    employee.id == data.id)
            )
            )
        )
        removeAllUnusedEmployees(newOrgChart)
        setOrgChart(newOrgChart)
    }

    useEffect(() => {
        getInitialManager(orgChart, setOrgChart)
    }, [])

    return (
        <div className={styles.container}>
            {orgChart.map((layer, key) =>
                <OrgChartLayer
                    key={key}
                    layerData={layer}
                    growTreeService={growTreeService}
                    pruneTreeService={pruneTreeService}
                />)}
        </div>
    );
};

export default OrgChart