import React from 'react';

import styles from './Table.module.css';

const TableHead = ({ columnConfig }) => {
    return (
        <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
                {columnConfig.map((column, index) => (
                    <th data-testid={`table-header-${column.title.toLowerCase().replace(/\s/g, '-')}`} className={styles.tableHeader} key={index}>{column.title}</th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;