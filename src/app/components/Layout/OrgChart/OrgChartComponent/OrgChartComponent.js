import React, { useState } from 'react';
import PropTypes from 'prop-types'

import styles from './OrgChartComponent.module.css'
import OrgChartButton from '../OrgChartButton/OrgChartButton'

const OrgChartComponent = (props) => {
    const [employeeExpanded, setEmployeeExpanded] = useState(false)
    let buttonText = employeeExpanded ? 'Hide Employees' : 'Show Employees'

    let toggleExpanded = () => {
        props.buttonHandler(employeeExpanded)
        setEmployeeExpanded(!employeeExpanded)
    }

    return (
        <div className={styles.container}>
            <div className={styles.component}>
                <div data-testid={`${props.employee.id}-display-name`}>
                    {`${props.employee.firstName} ${props.employee.lastName}`}
                </div>
                <div data-testid={`${props.employee.id}-job-title`}>
                    {props.employee.jobTitle.name}
                </div>
                <div className={styles.isActive} style={{ color: props.employee.isActive ? "green" : "red" }}>
                    {props.employee.isActive ? "ACTIVE" : "INACTIVE"}
                </div>
                <OrgChartButton
                    buttonText={buttonText}
                    employeeId={props.employee.id}
                    isExpanded={employeeExpanded}
                    toggleExpanded={toggleExpanded}
                />
            </div>
        </div>
    )
}

OrgChartComponent.propTypes = {
    employee: PropTypes.object,
    buttonHandler: PropTypes.func,
}

export default OrgChartComponent