import { Link } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types'

import styles from './NestedButton.module.css'

const NestedButton = (props) => {
    return (
        <div className={styles.container}>
            <Link className={styles.mainValueLink} to={props.mainValue.route}>
                <div data-testid={`${props.testId.mainValue}-link`} className={styles.mainValue}>
                    {props.mainValue.value}
                </div>
            </Link>
            {(((props.currentUrl === props.mainValue.route) || (props.currentUrl === props.subValue.route)) && props.subValue.value != null) ?
                <Link className={styles.subValueLink} to={props.subValue.route}>
                    <div data-testid={`${props.testId.subValue}-link`} className={styles.subValue}>
                        {props.subValue.value}
                    </div>
                </Link>
                : ""}
        </div>
    );
};

NestedButton.propTypes = {
    mainValue: PropTypes.object,
    subValue: PropTypes.object,
    testId: PropTypes.object,
    currentUrl: PropTypes.string,
}

export default NestedButton;