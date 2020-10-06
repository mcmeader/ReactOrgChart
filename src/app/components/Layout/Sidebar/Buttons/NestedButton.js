import { Link } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types'

import styles from './NestedButton.module.css'

const NestedButton = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.mainValueContainer}>
                <Link className={styles.mainValue} to={props.mainValue.route}>
                    <div data-testid={`${props.testId.mainValue}-link`}>
                        {props.mainValue.value}
                    </div>
                </Link>
            </div>
            <div className={styles.subValueContainer}>
                {(((props.currentUrl === props.mainValue.route) || (props.currentUrl === props.subValue.route)) && props.subValue.value != null) ?
                    <Link className={styles.subValue} to={props.subValue.route}>
                        <div className={styles.subValueText} data-testid={`${props.testId.subValue}-link`}>
                            {props.subValue.value}
                        </div>
                    </Link>
                    : ""}
            </div>
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