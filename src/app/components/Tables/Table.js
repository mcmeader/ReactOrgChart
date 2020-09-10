import React, { useState } from 'react';
import PropTypes from 'prop-types'

import styles from './Table.module.css'

const Table = (props) => {
    const employeeFields = (row) => [row.firstName, row.lastName, row.middleInitial]
    const nonEmployeeFields = (row) => [row.name]
    const [editCell, setEditCell] = useState(null)

    const editRow = (row, key, isEmployee) => {
        let fields = isEmployee ? employeeFields : nonEmployeeFields
        return (
            <tr className={styles.row} key={row.id + key}>
                {fields(row).map((field, col) => {
                    return (
                        <td data-testid={`table-row-${key + 1}-column-${props.headers[col].toLowerCase().replace(' ', '-')}`} id={row.id}>
                            <input type="text" value={field} />
                        </td>
                    )
                })}
                <td data-testid={`table-row-${key + 1}-column-${props.headers[fields(row).length].toLowerCase().replace(' ', '-')}`} className={styles.actions} id={key}>
                    <div data-testid={`row-${key + 1}-edit-link`} onClick={() => setEditCell(key)}>Edit</div>
                    <button data-testid={`row-${key + 1}-delete-button`}
                        onClick={() => {
                            props.deleteHandler(row.id)
                            props.fetchHandler()
                        }}>Delete</button>
                </td>
            </tr>
        )
    }

    const displayRow = (row, key, isEmployee) => {
        let fields = isEmployee ? employeeFields : nonEmployeeFields
        return (
            <tr className={styles.row} key={row.id + key}>
                {fields(row).map((field, col) => {
                    return (
                        <td data-testid={`table-row-${key + 1}-column-${props.headers[col].toLowerCase().replace(' ', '-')}`} id={row.id}>
                            {field}
                        </td>
                    )
                })}
                <td data-testid={`table-row-${key + 1}-column-${props.headers[fields(row).length].toLowerCase().replace(' ', '-')}`} className={styles.actions} id={key}>
                    <div data-testid={`row-${key + 1}-edit-link`} onClick={() => setEditCell(key)}>Edit</div>
                    <button data-testid={`row-${key + 1}-delete-button`}
                        onClick={() => {
                            props.deleteHandler(row.id)
                            props.fetchHandler()
                        }}>Delete</button>
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
                                ((editCell === key) ? editRow(row, key, true) : displayRow(row, key, true)) :
                                ((editCell === key) ? editRow(row, key, false) : displayRow(row, key, false)))
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
    deleteHandler: PropTypes.func,
    fetchHandler: PropTypes.func
}

export default Table;