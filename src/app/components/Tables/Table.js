import React from 'react';
import PropTypes from 'prop-types'

import styles from './Table.module.css'
import TextButton from '../Buttons/TextButton/TextButton';
import { deleteEmployee } from '../../services/EmployeeService';

const employeeTable = (row, key) => {
    return (
        <tr className={styles.row} key={row.id + key}>
            <td id={row.id}>{row.firstName}</td>
            <td id={row.id}>{row.lastName}</td>
            <td id={row.id}>{row.middleInitial === null ? "-" : row.middleInitial}</td>
            <td id={key}><button onClick={() => deleteEmployee(row.id)}>Delete</button></td>
        </tr>
    )
}

const nonEmployeeTable = (row, key) => {
    return (
        <tr className={styles.row} key={row.id + key}>
            <td className={styles.data} id={row.id}>{row.name}</td>
            <td id={key}><button onClick={() => deleteEmployee(row.id)}>Delete</button></td>
        </tr>
    )
}

const Table = (props) => {
    return (
        <table className={styles.container}>
            <thead className={styles.header}>
                <tr>
                    {props.headers != null ?
                        props.headers.map((header, key) => { return (<th key={key}>{header}</th>) }) : <th key="error" > Error Loading Data</th>}
                </tr>
            </thead>
            <tbody className={styles.body}>
                {props.data != null ? props.data.map((row, key) => {
                    return (
                        row.isActive === true ?
                            (Object.keys(row).includes("firstName") ?
                                employeeTable(row, key) : nonEmployeeTable(row, key))
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
}

export default Table;