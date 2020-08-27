import React from 'react';
import TableHead from "./TableHead";
import TableBody from "./TableBody";

import styles from './Table.module.css';

const Table = ({ data, columnConfig }) => {
    return (
        <table className={styles.table}>
            <TableHead columnConfig={columnConfig} />
            <TableBody data={data} columnConfig={columnConfig} />
        </table>
    );
};

export default Table;