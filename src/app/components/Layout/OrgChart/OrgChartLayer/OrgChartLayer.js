import React from 'react';
import PropTypes from 'prop-types'

import OrgChartComponent from '../OrgChartComponent/OrgChartComponent';
import styles from './OrgChartLayer.module.css'

const OrgChartLayer = (props) => {
    return (
        <div className={styles.container}>
            {props.layerData.map((layer, key) =>
                <OrgChartComponent
                    key={key}
                    employeeName={layer.firstName + (layer.middleInitial != null ? " " + layer.middleInitial + " " : " ") + layer.lastName}
                    employeeTitle={layer.jobTitle.name}
                    employeeId={layer.id}
                    growTreeService={props.growTreeService}
                    pruneTreeService={props.pruneTreeService} />
            )}
        </div>
    );
};

OrgChartLayer.propTypes = {
    layerData: PropTypes.arrayOf(PropTypes.object),
    growTreeService: PropTypes.func,
    pruneTreeService: PropTypes.func,
}

export default OrgChartLayer