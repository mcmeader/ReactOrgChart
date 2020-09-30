import React, { useState } from 'react';
import PropTypes from 'prop-types'

import styles from './OrgChartNode.module.css'
import OrgChartComponent from '../OrgChartComponent/OrgChartComponent';

const OrgChartNode = (props) => {
    const [managedEmployees, setManagedEmployees] = useState([])

    let toggleExpanded = async (employeeExpanded) => {
        console.log(employeeExpanded)
        if (!employeeExpanded) {
            setManagedEmployees(await props.getManagedEmployees(props.employee.id))
        } else {
            setManagedEmployees([])
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.component}>
                {props.employee != undefined ?
                    <OrgChartComponent
                        employee={props.employee}
                        buttonHandler={toggleExpanded}
                    />
                    : null}
            </div>
            <div className={styles.children}>
                {managedEmployees.map((employee, key) =>
                    <OrgChartNode
                        key={key}
                        employee={employee}
                        getManagedEmployees={props.getManagedEmployees} />
                )}
            </div>
        </div>
    )
}

OrgChartNode.propTypes = {
    employee: PropTypes.object,
    getManagedEmployees: PropTypes.func,
}

export default OrgChartNode