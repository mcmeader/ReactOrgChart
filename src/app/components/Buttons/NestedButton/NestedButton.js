import { useHistory, Link, Redirect } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types'

import styles from './NestedButton.module.css'

const NestedButton = (props) => {
    let routeMainValue = (props.mainValue != undefined && props.mainValue != null) ? props.mainValue.toLowerCase().trim().replaceAll(' ', '') : ""
    let routeSubValue = (props.subValue != undefined && props.subValue != null) ? props.subValue.toLowerCase().trim().replaceAll(' ', '') : ""

    let testIdMainValue = (props.mainValue != undefined && props.mainValue != null) ? props.mainValue.toLowerCase().trim().replaceAll(' ', '-') : ""
    let testIdSubValue = (props.subValue != undefined && props.subValue != null) ? props.subValue.toLowerCase().trim().replaceAll(' ', '-') : ""

    routeMainValue = (routeMainValue === 'jobtitles') ? 'job-titles' : routeMainValue
    return (
        <div className={styles.container}>
            <Link to={routeMainValue}>
                <div data-testid={`${testIdMainValue}-link`} className={styles.mainValue}>
                    {props.mainValue}
                </div>
            </Link>
            <Link to={routeSubValue}>
                <div data-testid={`${testIdSubValue}-link`} className={styles.subValue}>
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