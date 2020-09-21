import React from 'react';
import PropTypes from 'prop-types'

import styles from './OrgChartManagedEmployees.module.css'
import OrgChartComponent from '../OrgChartComponent/OrgChartComponent';

const OrgChartManagedEmployees = (props) => {
    let isVisible = props.groupedData.isVisible

    return (
        <div className={styles.container}>
            {props.groupedData.data.map((component, key) =>
                <OrgChartComponent
                    key={key}
                    employeeName={component.firstName + (component.middleInitial != null ? " " + component.middleInitial + " " : " ") + component.lastName}
                    employeeTitle={component.jobTitle != null ? component.jobTitle.name : ""}
                    employeeId={component.id}
                    displayComponent={isVisible}
                    growTreeService={props.growTreeService}
                    pruneTreeService={props.pruneTreeService} />
            )}
        </div>
    );
};

OrgChartManagedEmployees.propTypes = {
    groupedData: PropTypes.shape({ data: PropTypes.arrayOf(PropTypes.object), isVisible: PropTypes.bool }),
    growTreeService: PropTypes.func,
    pruneTreeService: PropTypes.func,
}

export default OrgChartManagedEmployees