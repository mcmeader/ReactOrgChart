import React from 'react';
import PropTypes from 'prop-types'

import styles from './OrgChartManagedEmployees.module.css'
import OrgChartComponent from '../OrgChartComponent/OrgChartComponent';

const OrgChartManagedEmployees = (props) => {
    return (
        <div className={styles.container}>
            {props.groupedData.map((component, key) =>
                <OrgChartComponent
                    key={key}
                    employeeName={component.firstName + (component.middleInitial != null ? " " + component.middleInitial + " " : " ") + component.lastName}
                    employeeTitle={component.jobTitle != null ? component.jobTitle.name : ""}
                    employeeId={component.id}
                    growTreeService={props.growTreeService}
                    pruneTreeService={props.pruneTreeService} />
            )}
        </div>
    );
};

OrgChartManagedEmployees.propTypes = {
    groupedData: PropTypes.arrayOf(PropTypes.object),
    growTreeService: PropTypes.func,
    pruneTreeService: PropTypes.func,
}

export default OrgChartManagedEmployees