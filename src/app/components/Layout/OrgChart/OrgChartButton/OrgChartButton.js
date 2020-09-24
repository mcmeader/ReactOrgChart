import React from 'react';
import PropTypes from 'prop-types'

import styles from './OrgChartButton.module.css'

const OrgChartButton = (props) => {
    let buttonAction = props.isExpanded ? 'hide' : 'show'

    return (
        <div className={styles.container} data-testid={`${props.employeeId}-${buttonAction}-employees-button`}>
            { props.buttonText != null ? <div onClick={() => props.toggleExpanded()}>{props.buttonText}</div> : null}
        </div>
    );
};

OrgChartButton.propTypes = {
    buttonText: PropTypes.string,
    isExpanded: PropTypes.bool,
    toggleExpanded: PropTypes.func,
    employeeId: PropTypes.number
}

export default OrgChartButton