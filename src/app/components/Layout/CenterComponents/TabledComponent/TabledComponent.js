import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import styles from './TabledComponent.module.css';
import Table from '../../../Tables/Table'

const TabledComponent = (props) => {
    useEffect(() => {
        fetchData()
    }, [props.componentName])

    const [data, setData] = useState(null)

    const fetchData = async () => {
        setData(await props.fetchData())
    }

    return (
        <div className={styles.container}>
            <Table
                headers={props.headerValues}
                data={data}
                deleteHandler={props.deleteHandler}
                fetchHandler={fetchData} />
        </div>
    );
};

TabledComponent.propTypes = {
    headerValues: PropTypes.arrayOf(String),
    fetchData: PropTypes.func,
    deleteHandler: PropTypes.func,
    componentName: PropTypes.string
}

export default TabledComponent