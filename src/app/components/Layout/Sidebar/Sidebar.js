import React from 'react';
import PropTypes from 'prop-types';

import styles from './Sidebar.module.css';
import NestedButton from '../../Buttons/NestedButton/NestedButton'
import { useLocation } from 'react-router-dom';

const Sidebar = (props) => {
    let currentUrl = useLocation().pathname.slice(1, useLocation().pathname.length)

    return (
        <div className={styles.container}>
            {props.tableContent.map((value, key) =>
                <NestedButton
                    key={key}
                    mainValue={value.mainValue}
                    subValue={value.subValue}
                    currentUrl={currentUrl} />)}
        </div>
    );
};

Sidebar.propTypes = {
    tableContent: PropTypes.arrayOf(Object),
}

export default Sidebar;