import React from 'react';
import PropTypes from 'prop-types';

import styles from './Sidebar.module.css';
import NestedButton from '../../Buttons/NestedButton/NestedButton'
import TextButton from '../../Buttons/TextButton/TextButton'

const Sidebar = (props) => {
    return (
        <div className={styles.container}>
            {props.tableContent.map((value, key) =>
                value.subValue === null ? <TextButton key={key} mainValue={value.mainValue} />
                    : <NestedButton key={key} mainValue={value.mainValue} subValue={value.subValue} />)}
        </div>
    );
};

Sidebar.propTypes = {
    tableContent: PropTypes.arrayOf(Object),
}

export default Sidebar;