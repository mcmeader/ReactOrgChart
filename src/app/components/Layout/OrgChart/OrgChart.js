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
        let checkIndex = [].concat(...orgChart[layerIndex])
        let employeeIndex = checkIndex.findIndex(employee => employee.id == employeeId)

        let newEmployees = await getByManagerIdService(employeeId)
        newEmployees = [].concat(...newEmployees)
        if (newEmployees.length > 0) {
            if ((layerIndex == orgChart.length - 1)) {
                let allLastLevelEmployeesSize = [].concat(...orgChart[layerIndex]).length
                let newLayer = new Array(allLastLevelEmployeesSize).fill([{ firstName: null, lastName: null, jobTitle: { name: null } }])
                if (newEmployees.length > allLastLevelEmployeesSize) {
                    newOrgChart = [...newOrgChart, [newEmployees]]
                } else {
                    newLayer[employeeIndex] = newEmployees
                    newOrgChart = [...newOrgChart, newLayer]
                }
            } else {
                newOrgChart[layerIndex + 1][employeeIndex] = newEmployees
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

        let shouldCleanUp = newOrgChart[newOrgChart.length - 1].some(group => {
            console.log(group)
            return (group.some(data => {
                console.log(data)
                return (data.name != null)
            }))
        })

        console.log(shouldCleanUp)
        if (!shouldCleanUp) {
            removeAllUnusedEmployees(newOrgChart)
        }
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