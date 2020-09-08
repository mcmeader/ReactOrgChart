import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types'

import styles from './TabledComponent.module.css';
import Table from '../../../Tables/Table'

const TabledComponent = (props) => {
    useLayoutEffect(() => {
        fetchData()
    }, [props.fetchData])

    const [data, setData] = useState(null)

    const fetchData = async () => {
        setData(await props.fetchData())
    }

    return (
        <div className={styles.container}>
            <Table headers={props.headerValues} data={data} />
        </div>
    );
};

TabledComponent.propTypes = {
    headerValues: PropTypes.arrayOf(String),
    fetchData: PropTypes.func
}

export default TabledComponent