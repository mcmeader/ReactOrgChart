import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import styles from './TabledComponent.module.css';
import Table from '../../Tables/Table'
import { getData } from '../ImportHandler';

const TabledComponent = (props) => {
    let { headerValues, getService, editService, deleteService } = getData(props.componentType)

    const [data, setData] = useState(null)

    const fetchData = async () => {
        setData(await getService())
    }

    const deleteData = async (id) => {
        await deleteService(id)
        setData(await getService())
    }

    useEffect(() => {
        fetchData()
    }, [props.componentType])

    return (
        <div className={styles.container}>
            <Table
                headers={headerValues}
                data={data}
                editHandler={editService}
                deleteHandler={deleteService}
                fetchHandler={deleteData}
                componentName={props.componentType} />
        </div>
    );
};

TabledComponent.propTypes = {
    componentType: PropTypes.string
}

export default TabledComponent