import { useHistory, Link } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types'

import styles from './NestedButton.module.css'

const NestedButton = (props) => {
    let routeMainValue = (props.mainValue != undefined && props.mainValue != null) ? props.mainValue.toLowerCase().trim().replaceAll(' ', '') : ""
    let routeSubValue = (props.subValue != undefined && props.subValue != null) ? props.subValue.toLowerCase().trim().replaceAll(' ', '') : ""

    return (
        <div className={styles.container}>
            <Link to={routeMainValue}>
                <div className={styles.mainValue}>
                    {props.mainValue}
                </div>
            </Link>
            <Link to={routeSubValue}>
                <div className={styles.subValue}>
                    <div className={styles.spacer} />
                    {props.subValue}
                </div>
            </Link>
        </div>
    );
};

NestedButton.propTypes = {
    mainValue: PropTypes.string,
    subValue: PropTypes.string,
    clickHandler: PropTypes.func
}

export default NestedButton;