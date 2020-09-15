import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './Table.module.css'

const Table = (props) => {
    const employeeFields = (row) => [row.firstName, row.lastName, row.middleInitial]
    const nonEmployeeFields = (row) => [row.name]

    const deleteRow = async (row) => {
        await props.fetchHandler(row.id)
    }

    const generateTestId = (key, col) => {
        let headers = props.headers[col]
        let column = headers != null ? props.headers[col].toLowerCase().replace(' ', '-') : key
        return `table-row-${key + 1}-column-${column}`
    }

    const displayRow = (row, key, isEmployee) => {
        let fields = isEmployee ? employeeFields : nonEmployeeFields
        return (
            <tr className={styles.row} key={row.id + key}>
                {fields(row).map((field, col) => {
                    return (
                        <td key={field + row.id} data-testid={generateTestId(key, col)}>
                            {field}
                        </td>
                    )
                })}
                <td data-testid={generateTestId(key, fields(row).length)} className={styles.actions}>
                    <div>
                        <Link to={{ pathname: '/editfield', state: { componentType: props.componentName, formFieldData: props.data[key].id } }} >
                            <div className={styles.edit} key={`row-${key}-edit`} data-testid={`row-${key + 1}-edit-link`}>Edit</div>
                        </Link>
                        <button key={`row-${key}-delete`} data-testid={`row-${key + 1}-delete-button`}
                            onClick={() => deleteRow(row)}>Delete</button>
                    </div>
                </td>
            </tr>
        )
    }

    return (
        <table className={styles.container}>
            <thead className={styles.header}>
                <tr>
                    {props.headers != null ?
                        props.headers.map((header, key) => { return (<th data-testid={`table-header-${header.toLowerCase().replace(' ', '-')}`} key={key}>{header}</th>) }) : <th key="error" > Error Loading Data</th>}
                </tr>
            </thead>
            <tbody className={styles.body}>
                {props.data != null ? props.data.map((row, key) => {
                    return (
                        row.isActive === true ?
                            (Object.keys(row).includes("firstName") ?
                                displayRow(row, key, true) : displayRow(row, key, false))
                            : null
                    )
                }) : null}
            </tbody>
        </table>
    )
};

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.object),
    editHandler: PropTypes.func,
    deleteHandler: PropTypes.func,
    fetchHandler: PropTypes.func,
    componentName: PropTypes.string
}

export default Table;