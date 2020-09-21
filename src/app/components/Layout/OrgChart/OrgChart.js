import React, { useEffect, useState } from 'react';

import styles from './OrgChart.module.css'
import OrgChartLayer from './OrgChartLayer/OrgChartLayer'
import { getData } from '../ImportHandler'

import { buildInitialOrgChart } from './OrgChartStartupFunctions';

const OrgChart = () => {
    const [orgChart, setOrgChart] = useState([[{ data: [{ firstName: 'Nexient', lastName: 'Org Chart', middleInitial: null, jobTitle: { name: null } }], isVisible: true }]])

    const growTreeService = (employeeId) => {
        let { getByManagerIdService } = getData("employee")
        getByManagerIdService(employeeId)
        let managedEmployees = [...orgChart]
        let newOrgChart = managedEmployees.map(layer =>
            layer.map(managedEmployees => {
                if (managedEmployees.data[0].manager != null) {
                    if (managedEmployees.data[0].manager.id == employeeId) {
                        managedEmployees.isVisible = true
                    }
                }
                return managedEmployees
            }))
        setOrgChart(newOrgChart)
    }

    const pruneTreeService = (employeeId) => {
        let employeeIdsToClose = [employeeId]
        let managedEmployees = [...orgChart]
        let newOrgChart = managedEmployees.map(layer =>
            layer.map(managedEmployees => {
                if (managedEmployees.data[0].manager != null) {
                    employeeIdsToClose.forEach(id => {
                        if (managedEmployees.data[0].manager.id == id) {
                            managedEmployees.isVisible = false
                            employeeIdsToClose = [...employeeIdsToClose, managedEmployees.data[0].id]
                        }
                    })
                }
                return managedEmployees
            }))
        setOrgChart(newOrgChart)
    }


    useEffect(() => {
        buildInitialOrgChart(orgChart, setOrgChart)
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