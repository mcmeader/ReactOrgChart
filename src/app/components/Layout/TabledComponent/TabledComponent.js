import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import Table from './Tables/Table'
import { getData } from '../ImportHandler';

const TabledComponent = (props) => {
    let headerValues = getData(props.componentType).headerValues

    const [data, setData] = useState(null)

    const fetchData = async () => {
        let getService = getData(props.componentType).getService
        setData(await getService())
    }

    const deleteData = async (id) => {
        let deleteService = getData(props.componentType).deleteService
        await deleteService(id)
        setTimeout(fetchData(), 1000)
    }

    const getFields = (row) => {
        return props.componentType === 'employee' ? [row.firstName, row.lastName, row.middleInitial] : [row.name]
    }

    useEffect(() => {
        fetchData()
    }, [props.componentType])

    return (
        <Table
            headers={headerValues}
            data={data}
            deleteHandler={deleteData}
            fetchData={fetchData}
            getFields={getFields}
            componentName={props.componentType} />
    );
};

TabledComponent.propTypes = {
    componentType: PropTypes.string
}

export default TabledComponent