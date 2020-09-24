import React from 'react';
import PropTypes from 'prop-types'

import styles from './OrgChartLayer.module.css'
import OrgChartManagedEmployees from '../OrgChartManagedEmployees/OrgChartManagedEmployees';

const OrgChartLayer = (props) => {
    console.log(props.layerData)
    return (
        <div className={styles.container}>
            {props.layerData.map((group, key) =>
                <OrgChartManagedEmployees
                    key={key}
                    groupedData={group}
                    growTreeService={props.growTreeService}
                    pruneTreeService={props.pruneTreeService}
                />
            )}
        </div>
    );
};

OrgChartLayer.propTypes = {
    layerData: PropTypes.any,
    componentGroupToDisplay: PropTypes.any,
    growTreeService: PropTypes.func,
    pruneTreeService: PropTypes.func,
}

export default OrgChartLayer
