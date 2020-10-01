import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Sidebar.module.css';
import NestedButton from './Buttons/NestedButton'
import { useLocation } from 'react-router-dom';

const Sidebar = (props) => {
    let currentUrl = useLocation().pathname.slice(1, useLocation().pathname.length)

    let trimString = (value) => {
        return (value != undefined && value != null) ? value.toLowerCase().trim().replaceAll(' ', '') : ""
    }

    let generateTestId = (value) => {
        return (value != undefined && value != null) ? value.toLowerCase().trim().replaceAll(' ', '-') : ""

    }

    let convertMainValue = (value) => {
        let routeMainValue = trimString(value)
        routeMainValue = (routeMainValue === 'jobtitles') ? 'job-titles' : routeMainValue
        routeMainValue = (routeMainValue === 'orgchart') ? '' : routeMainValue
        return routeMainValue
    }

    return (
        <div className={styles.container}>
            {props.tableContent.map((value, key) =>
                <NestedButton
                    key={key}
                    mainValue={{ value: value.mainValue, route: convertMainValue(value.mainValue) }}
                    subValue={{ value: value.subValue, route: trimString(value.subValue) }}
                    testId={{ mainValue: generateTestId(value.mainValue), subValue: generateTestId(value.subValue) }}
                    currentUrl={currentUrl} />)}
        </div>
    );
};

Sidebar.propTypes = {
    tableContent: PropTypes.arrayOf(Object),
}

export default Sidebar;