import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import styles from './OrgChartComponent.module.css'
import OrgChartButton from '../OrgChartButton/OrgChartButton'

const OrgChartComponent = (props) => {
    const [employeeExpanded, setEmployeeExpanded] = useState(false)

    const toggleExpanded = () => {
        employeeExpanded ? props.pruneTreeService(props.employeeId) :
            props.growTreeService(props.employeeId)
        setEmployeeExpanded(!employeeExpanded)
    }

    let buttonText = props.employeeName != 'Nexient Org Chart' ?
        (employeeExpanded ? 'Hide Employees' : 'Show Employees') : null

    useEffect(() => {
        setEmployeeExpanded(false)
    }, [props.displayComponent])

    return (
        <div className={styles.container}>
            <div>
                <div data-testid={`${props.employeeId}-display-name`}>
                    {props.employeeName}
                </div>
                <div data-testid={`${props.employeeId}-job-title`}>
                    {props.employeeTitle}
                </div>
                <OrgChartButton
                    buttonText={buttonText}
                    employeeId={props.employeeId}
                    isExpanded={employeeExpanded}
                    toggleExpanded={toggleExpanded} />
            </div>
        </div>
    );
};

OrgChartComponent.propTypes = {
    employeeName: PropTypes.string,
    employeeTitle: PropTypes.string,
    displayComponent: PropTypes.bool,
    employeeId: PropTypes.number,
    growTreeService: PropTypes.func,
    pruneTreeService: PropTypes.func
}

export default OrgChartComponent