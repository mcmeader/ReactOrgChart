import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import styles from './TabledComponent.module.css';
import Table from '../../../Tables/Table'
import { getData } from '../../ImportHandler';

const TabledComponent = (props) => {
    let { headerValues, getService, editService, deleteService } = getData(props.componentType)

    useEffect(() => {
        fetchData()
    }, [props.componentName])

    const [data, setData] = useState(null)

    const fetchData = async () => {
        console.log("called fetch data")
        setData(await getService())
        console.log(data)
    }
    return (
        <div className={styles.container}>
            <Table
                headers={headerValues}
                data={data}
                editHandler={editService}
                deleteHandler={deleteService}
                fetchHandler={fetchData()}
                componentName={props.componentType} />
        </div>
    );
};

TabledComponent.propTypes = {
    componentType: PropTypes.string
}

export default TabledComponent