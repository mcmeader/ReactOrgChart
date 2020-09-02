import React from 'react';
import PropTypes from 'prop-types'

import styles from './NestedButton.module.css'

const NestedButton = (props) => {
    return (
        <div className={styles.container} >
            {props.mainValue}
            <div className={styles.subContainer} >
                <div className={styles.spacer} />
                {props.subValue}
            </div>
        </div>
    );
};

NestedButton.propTypes = {
    mainValue: PropTypes.string,
    subValue: PropTypes.string
}

export default NestedButton;