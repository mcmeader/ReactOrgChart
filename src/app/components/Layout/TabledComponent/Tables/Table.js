import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './Table.module.css'

const Table = (props) => {
    const deleteRow = async (row) => {
        await props.deleteHandler(row.id)
    }

    const generateTestId = (key, col) => {
        let headers = props.headers[col]
        let column = headers != null ? props.headers[col].toLowerCase().replace(' ', '-') : key
        return `table-row-${key + 1}-column-${column}`
    }

    const displayRow = (row, key) => {
        let displayFields = props.getFields(row)
        return (
            <tr className={styles.row} key={row.id + key}>
                {displayFields.map((field, col) => {
                    return (
                        <td className={styles.data} key={col + row.id} data-testid={generateTestId(key, col)}>
                            {(field === null || field === '') ? '-' : field}
                        </td>
                    )
                })}
                <td className={styles.data} data-testid={generateTestId(key, displayFields.length)}>
                    <Link to={{ pathname: '/editfield', state: { componentType: props.componentName, formFieldData: props.data[key].id } }} >
                        <div className={styles.editButton} key={`row-${key}-edit`} data-testid={`row-${key + 1}-edit-link`}>Edit</div>
                    </Link>
                    <button className={styles.deleteButton} key={`row-${key}-delete`} data-testid={`row-${key + 1}-delete-button`}
                        onClick={() => deleteRow(row)}>Delete</button>
                </td>
            </tr>
        )
    }

    return (
        <table className={styles.container}>
            <thead className={styles.header}>
                <tr className={styles.row}>
                    {props.headers.map((header, key) => {
                        return (
                            <th className={styles.header} data-testid={`table-header-${header.toLowerCase().replace(' ', '-')}`} key={header + key}>
                                {header}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {props.data != null ? props.data.map((row, key) =>
                    row.isActive != false ? displayRow(row, key) : null) : null}
            </tbody>
        </table>
    )
};

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.object),
    getFields: PropTypes.func,
    deleteHandler: PropTypes.func,
    fetchData: PropTypes.func,
    componentName: PropTypes.string
}

export default Table;