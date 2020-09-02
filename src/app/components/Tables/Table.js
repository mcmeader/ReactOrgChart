import React from 'react';
import PropTypes from 'prop-types'

import styles from './Table.module.css'

const Table = (props) => {
    return (
        <table className={styles.table}>
            <thead className={styles.header}>
                <tr>
                    {props.data != null ?
                        props.headers.map((header, key) => { return (<th key={key}>{header}</th>) }) : <th key="error" > Error Loading Data</th>}
                </tr>
            </thead>
            <tbody className={styles.body}>
                {props.data != null ? props.data.map((row, key) => {
                    return (
                        <tr key={row.id + key}>
                            <td id={row.id}>{row.name}</td>
                            <td id={key}>{row.id}</td>
                        </tr>
                    )
                }) : null}
            </tbody>
        </table >
    )
};

Table.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.object)
}

export default Table;