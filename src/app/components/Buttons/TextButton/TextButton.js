import React from 'react';
import PropTypes from 'prop-types'

import styles from './TextButton.module.css'
import { Link } from 'react-router-dom';

const TextButton = (props) => {
    let routeMainValue = (props.mainValue != undefined && props.mainValue != null)
        ? props.mainValue.toLowerCase().trim().replaceAll(' ', '') : ""
    return (
        <Link to={routeMainValue}>
            <div className={styles.container}>
                {props.mainValue}
            </div>
        </Link>
    );
};

TextButton.propTypes = {
    mainValue: PropTypes.string,
}

export default TextButton;