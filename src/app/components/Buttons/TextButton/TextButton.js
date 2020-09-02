import React from 'react';
import PropTypes from 'prop-types'

import styles from './TextButton.module.css'

const TextButton = (props) => {
    return (
        <div className={styles.container} onClick={() => { props.state = props.mainValue }}>
            {props.mainValue}
        </div>
    );
};

TextButton.propTypes = {
    mainValue: PropTypes.string
}

export default TextButton;